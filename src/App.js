import React from 'react';
import { createStore } from 'redux'
import { connect } from 'react-redux';

import './App.css';
import AppReducer from './AppReducer';
import * as actions from './AppActions';
import Canvas from './Canvas';
import ColorMenu from './ColorMenu';
import ColorMakerMenu from './ColorMakerMenu';
import MessageBox from './MessageBox';
import LoadingScreen from './LoadingScreen';

export const store = createStore(AppReducer);

var socket = null;
const url = 'ws://localhost:8080/canvas';

if(socket == null) {
  try {
    socket = new WebSocket(url)
  } catch(exception) {
    console.log("Websocket: Unable to connect!")
  }
}

socket.onmessage = function(e) {
  const data = JSON.parse(e.data);
  switch (data[0].responseType) {

    case "authSuccessful":
      window.localStorage.setItem("userID", data[0].uuid)
      actions.setUserID(data[0].uuid)
      actions.setUserMaxTiles(data[0].maxTiles)
      actions.setUserTiles(data[0].remainingTiles)
      actions.setLevel(data[0].level)
      actions.setUserRequiredExp(data[0].tilesToNextLevel)
      actions.setUserExp(data[0].levelProgress)
      socket.send(JSON.stringify({"requestType": "getColors", "userID": store.getState().get("userID").toString()}))
      break;

    case "colorList":
      actions.setColors(data)
      socket.send(JSON.stringify({"requestType": "getCanvas", "userID": store.getState().get("userID").toString()}))
      break;

    case "fullCanvas":
      actions.drawCanvas(data)
      actions.loadingScreenVisible(false)
      break;

    case "tileUpdate":
      actions.setPixel(data)
      break;

    case "userCount":
      actions.setConnectedUsers(data[0].count)
      break;

    case "incrementTileCount":
      actions.addUserTiles(data[0].amount)
      break;

    case "levelUp":
      actions.setLevel(data[0].level)
      actions.setUserMaxTiles(data[0].maxTiles)
      actions.setUserTiles(data[0].remainingTiles)
      actions.setUserRequiredExp(data[0].tilesToNextLevel)
      actions.setUserExp(data[0].levelProgress)
      break;

    case "error":
      if(data[0].errorMessage === "User not found! Get a new UUID with initialAuth") {
        socket.send(JSON.stringify({"requestType": "initialAuth"}))
      }
      console.log(JSON.stringify(data))
      break;

    case "reAuthSuccessful":
      socket.send(JSON.stringify({"requestType": "getColors", "userID": store.getState().get("userID").toString()}))
      actions.setUserMaxTiles(data[0].maxTiles)
      actions.setUserTiles(data[0].remainingTiles)
      actions.setLevel(data[0].level)
      actions.setUserRequiredExp(data[0].tilesToNextLevel)
      actions.setUserExp(data[0].levelProgress)
      break;

    default:
      console.log("socket onMessage default case!")
      console.log(JSON.stringify(data))
  }
}

// Authentication logic
socket.onopen = function(e) {
  if(window.localStorage.getItem('userID') !== null) {
    actions.setUserID(window.localStorage.getItem('userID'))
    socket.send(JSON.stringify({"requestType": "auth", "userID": store.getState().get("userID").toString()}))
  } else {
    socket.send(JSON.stringify({"requestType": "initialAuth"}))
  }
}

let App = props => {
  // TODO: Show messageBox telling user about levelUp and what level
  //<MessageBox visile={props.showLevelScreen}
  //            message={"Level up! You are now level " + props.userLevel + "!"} />
  return (
    <div>
      <Canvas pixelSize={5} rows={props.rows} columns={props.columns}
              updatePixel={props.updatePixel} activeColor={props.activeColor}
              canvas={props.canvas} canvasDraw={props.canvasDraw}
              remainingTiles={props.remainingTiles}
              userExp={props.userExp} userExpLimit={props.userExpLimit}/>

      <ColorMenu expCollected={props.userExp} expToNext={props.userExpLimit}
              colors={props.userColors} activeColor={props.activeColor}
              remainingTiles={props.remainingTiles}
              connectedUsers={props.connectedUsers}
              userTiles={props.userTiles}
              userLevel={props.userLevel} />
      <ColorMakerMenu visible={props.visible}/>
      <LoadingScreen visible={props.loadingVisible}/>
    </div>
  )
}

App = connect(state => ({
  visible: state.get('showColorPicker'),
  loadingVisible: state.get('showLoadingScreen'),
  updatePixel: state.get('updatePixel'),
  activeColor: state.get('activeColor'),
  userColors: state.get('colors'),
  rows: state.get('rows'),
  columns: state.get('columns'),
  canvas: state.get('canvas'),
  canvasDraw: state.get('canvasDraw'),
  userExp: state.get('userExp'),
  userExpLimit: state.get('userExpLimit'),
  remainingTiles: state.get('remainingTiles'),
  connectedUsers: state.get('connectedUsers'),
  userTiles: state.get('userTiles'),
  userLevel: state.get('level'),
  showLevelScreen: state.get('showNewLevelScreen'),
  }),
  { },
)(App);

export const sendTile = (x, y, colorID) => {
  socket.send(JSON.stringify({"requestType": "postTile", "userID":  store.getState().get("userID").toString(),
                              "X": x, "Y": y, "colorID": colorID.toString()}))
}

export const getColor = (id) => {
  var colors = store.getState().get('colors')
  if(colors.length == null) return "#000000";

  for (var i = 0; i < colors.length; i++) {
    if(colors[i].ID === id) {
        var hex = rgbToHex(colors[i].R, colors[i].G, colors[i].B)
        return hex;
    }
  }
  return "#000000";
}

export function rgbToHex(r, g, b) {
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}

export function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}

export default App
