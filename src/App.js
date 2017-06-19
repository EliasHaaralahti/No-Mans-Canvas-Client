import React from 'react';
import { createStore } from 'redux'

import './App.css'
import AppReducer from './AppReducer';
// import * as actions from './AppActions';
import Canvas from './Canvas';
import ColorMenu from './ColorMenu';
import ColorMakerMenu from './ColorMakerMenu';
import MessageBox from './MessageBox';

const url = 'ws://localhost:8080/canvas';
export var socket = null;

export const store = createStore(AppReducer);

class App extends React.Component {
  componentWillMount() {
    try {
      socket = new WebSocket(url)
      socket.onmessage = function(e) {
        const data = JSON.parse(e.data);
          console.log(JSON.stringify(data))
      }
      socket.onopen = function(e) {
        socket.send(JSON.stringify({"requestType": "initialAuth"}))
      }
    } catch(exception) {
      console.log("Websocket: Unable to connect!")
    }
  }
  componentWillUnmount() {
    if(socket != null){
      socket.close();
    }
  }
  render() {
    if(socket == null) {
      return <MessageBox message="No response from server!" warning="True" />
    }

    return (
      <div>
        <Canvas pixelSize={20}/>
        <ColorMenu expCollected={13} expToNext={80} />
        <ColorMakerMenu visible={this.props.colorPickerVisible}/>
      </div>
    )
  }
}

// TODO: Connect app with store (react-redux package already installed)

export default App
