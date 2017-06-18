import React from 'react';
import { createStore } from 'redux'

import './App.css'
import AppReducer from './AppReducer';
import * as actions from './AppActions';
import Grid from './Canvas';
import ColorMenu from './ColorMenu';
import MessageBox from './MessageBox';

const url = 'ws://localhost:8080';

try {
  var socket = new WebSocket(url)
  socket.onopen = function(e) {
    console.log("Websocket: Connected");
    socket.send("New connection has been made")
  }
  socket.onmessage = function(e) {
    const data = JSON.parse(e.data);
      console.log("Websocket data received, printing....")
      console.log(JSON.stringify(e.data))
  }
} catch(exception) {
  console.log("Websocket: Unable to connect!")
}

let App = props => {
  if(socket == null) {
    return <MessageBox message="No response from server!" warning="True" />
  }
  return (
    <div>
      <Grid/>
      <ColorMenu/>
    </div>
  )
}

export const store = createStore(AppReducer);

export default App
