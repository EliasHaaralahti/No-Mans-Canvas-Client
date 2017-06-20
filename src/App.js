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
  console.log("message received from websocket")
  const data = JSON.parse(e.data);
  switch (data[0].responseType) {
    case "authSuccessful":
      // console.log(JSON.stringify(data))
      actions.setUserID(data[0].uuid)
      window.localStorage.setItem("userID", data[0].uuid)
      break;
    case "colorList":
      // console.log(JSON.stringify(data))
      actions.setColors(data)
      break;
    case "fullCanvas":
      console.log("full canvas retrieved!")
      actions.drawCanvas(data)
      break;
    case "tileUpdate":
      console.log("tileUpdate")
      actions.setPixel(data)
      break;
    case "error":
      console.log(JSON.stringify(data))
      break;
    default:
      console.log("socket onMessage default case!")
  }
}
// TODO: USE PROPER USER ID WHEN BACKEND READY
socket.onopen = function(e) {
  // TODO: When backend readyhange numbers to null and !==
  if(window.localStorage.getItem('userID') === "2145") {
    console.log("localStorage ID found!")
    actions.setUserID(window.localStorage.getItem('userID'))
    // TODO: auth backend
  } else {
    console.log("Requesting new ID!")
    socket.send(JSON.stringify({"requestType": "initialAuth"}))
  }
  socket.send(JSON.stringify({"requestType": "getColors"}))
  socket.send(JSON.stringify({"requestType": "getCanvas", "userID": "1"}))
}

let App = props => {
  if(socket == null) {
    return <MessageBox message="No response from server!" warning="True" />
  }
  // TODO: Is prop socket used?
  return (
    <div>
      <Canvas pixelSize={5} rows={props.rows} columns={props.columns}
              updatePixel={props.updatePixel} activeColor={props.activeColor}
              canvas={props.canvas} canvasDraw={props.canvasDraw}
              socket={socket}/>

      <ColorMenu expCollected={13} expToNext={80} colors={props.colors} />
      <ColorMakerMenu visible={props.visible}/>
    </div>
  )
}

App = connect(state => ({
  visible: state.get('showColorPicker'),
  updatePixel: state.get('updatePixel'),
  activeColor: state.get('activeColor'),
  userColors: state.get('colors'),
  rows: state.get('rows'),
  columns: state.get('columns'),
  canvas: state.get('canvas'),
  canvasDraw: state.get('canvasDraw')
  }),
  { },
)(App);

export const sendTile = (x, y, colorID) => {
  socket.send(JSON.stringify({"requestType": "postTile", "userID": "1",
                              "X": x, "Y": y, "colorID": colorID}))
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

// NOTE: Copied from stackoverflow, not teste
function rgbToHex(r, g, b) {
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}

/*
// NOTE: Copied from stackoverflow, not tested
function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}
*/

export default App
