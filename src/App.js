import React from 'react';
import './App.css'
import Grid from './Canvas';
import ColorMenu from './ColorMenu';
import MessageBox from './MessageBox';

try {
  var socket = new WebSocket('http://localhost:8000')
  socket.onopen = function(e) {
    console.log("Websocket: Connected");
  }
  socket.onmessage = function(e) {
    const data = JSON.parse(e.data);
      console.log("do something with data...")
  }
} catch(exception) {
  console.log("Websocket: Unable to connect!")
}

let App = props => {
  if(socket == null) {
    // return <MessageBox message="No response from server!" warning="True" />
  }
  return (
    <div>
      <Grid/>
      <ColorMenu/>
    </div>
  )
}

export default App
