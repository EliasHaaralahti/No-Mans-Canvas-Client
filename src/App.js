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

const url = 'ws://localhost:8080/canvas';
export var socket = null;

export const store = createStore(AppReducer);

let App = props => {
  try {
    socket = new WebSocket(url)
    socket.onmessage = function(e) {
      const data = JSON.parse(e.data);
      switch (data[0].responseType) {
        case "authSuccessful":
          // console.log(JSON.stringify(data))
          actions.setUserID(data[0].uuid)
          break;
        case "colorList":
          // console.log(JSON.stringify(data))
          actions.setColors(data)
          break;
        case "fullCanvas":
          // console.log(JSON.stringify(data))
          actions.drawCanvas(data)
          break;
        case "tileUpdate":
          // console.log(JSON.stringify(data))
          actions.setPixel(data)
          break;
        default:
          console.log("socket onMessage default case!")
      }
    }
    socket.onopen = function(e) {
      socket.send(JSON.stringify({"requestType": "initialAuth"}))
      socket.send(JSON.stringify({"requestType": "getColors"}))
      socket.send(JSON.stringify({"requestType": "getCanvas"}))
    }
  } catch(exception) {
    console.log("Websocket: Unable to connect!")
  }
  if(socket == null) {
    return <MessageBox message="No response from server!" warning="True" />
  }

  // TODO: Pass canvas rows and columns as props and use them
  return (
    <div>
      <Canvas pixelSize={20} />
      <ColorMenu expCollected={13} expToNext={80} />
      <ColorMakerMenu visible={props.visible}/>
    </div>
  )
}

App = connect(state => ({
  visible: state.get('showColorPicker'), }),
  { },
)(App);


export default App
