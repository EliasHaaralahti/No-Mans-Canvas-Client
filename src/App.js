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

// TODO: save user ID
class App extends React.Component {
  componentWillMount() {
    try {
      socket = new WebSocket(url)
      socket.onmessage = function(e) {
        console.log("MESSAGE RECEIVED")
        const data = JSON.parse(e.data);

        switch (data[0].responseType) {
          case "authSuccessful":
            console.log(JSON.stringify(data))
            break;
          case "colorList":
            console.log(JSON.stringify(data))
            break;
          case "fullCanvas":
            console.log(JSON.stringify(data))
            break;
          default:
            console.log("socket onmessage default case!")
        }
      }
      socket.onopen = function(e) {
        socket.send(JSON.stringify({"requestType": "initialAuth"}))
        socket.send(JSON.stringify({"requestType": "getColors"}))
        // socket.send(JSON.stringify({"requestType": "getCanvas"}))
        socket.send(JSON.stringify({"requestType": "postTile",
                                    "userID": "1",
                                    "X": "50",
                                    "Y": "50",
                                    "colorID": "1"}))
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
        <ColorMenu/>
        <ColorMakerMenu visible={this.props.colorPickerVisible}/>
      </div>
    )
  }
}

// TODO: Connect app with store (react-redux package already installed)

export default App
