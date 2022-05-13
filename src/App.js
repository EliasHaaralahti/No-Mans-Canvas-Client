import React from 'react';
import { createStore } from 'redux'
import { connect } from 'react-redux';

import './App.css';
import AppReducer from './AppReducer';
import * as actions from './AppActions';
import Canvas from './Components/CanvasComponent/Canvas';
import BottomBar from './Components/BottomBarComponent/BottomBar';
import NicknameMenu from './Components/NicknameMenuComponent/NicknameMenu';
import MessageBox from './Components/MessageBoxComponent/MessageBox';
import KickDialog from './Components/KickDialogComponent/KickDialog';
import LoadingScreen from './Components/LoadingScreenComponent/LoadingScreen';
import CreditsMenu from './Components/CreditsMenuComponent/CreditsMenu';
import AdminMenu from './Components/AdminMenuComponent/AdminMenu'

export const store = createStore(AppReducer);

const url = 'ws://localhost:3001/ws';

var g_socket = null;
var g_disconnected = false;

var message_handler = function (e) {
	if (e.data instanceof ArrayBuffer) {
		binary_handler(e);
	} else {
		text_handler(e);
	}
}

var binary_handler = function (e) {
	const data = e.data;
	// For now, the *only* binary message in this protocol is the
	// full canvas, zlib compressed.
	let array = new Uint8Array(e.data);
	actions.drawCanvasBin(array);
    actions.loadingScreenVisible(false)
    actions.setMessageBoxVisibility(false)
}

var text_handler = function (e) {
  const data = JSON.parse(e.data);
  switch (data.rt) {

    case "nameSetSuccess":
      console.log("Name was set successfully")
      actions.setMessageBoxText("Nickname was set successfully!")
      actions.setMessageBoxVisibility(true)
      break;
    case "disconnecting":
      console.log("Server sent SHUTDOWN")
      // Change state message box text to default warning message
      actions.setMessageBoxText("The server restarted, reconnecting...")
      // Change state message box visiblity
      // NOTE: Later this could be implemented with only state text
      actions.setMessageBoxVisibility(true)
      break;

    case "announcement":
      // Change state message box text
      actions.setMessageBoxText(data.message)
      // Change state message box visiblity
      // NOTE: Later this could be implemented with only state text
      actions.setMessageBoxVisibility(true)
      break;

    case "authSuccessful":
      window.localStorage.setItem("userID", data.uuid)
      actions.setUserID(data.uuid)
      actions.setUserMaxTiles(data.maxTiles)
      actions.setUserTiles(data.remainingTiles)
      actions.setLevel(data.level)
      actions.setUserRequiredExp(data.tilesToNextLevel)
      actions.setUserExp(data.levelProgress)
      g_socket.send(JSON.stringify({ "requestType": "getColors", "userID": store.getState().get("userID").toString() }))
      break;

    case "colorList":
      actions.setColors(data.colors)
      // The response to this request is handled in binary_handler above.
      g_socket.send(JSON.stringify({ "requestType": "getCanvas", "userID": store.getState().get("userID").toString() }))
      break;

    case "tu": // tileUpdate
      actions.setPixel(data)
      break;

    case "userCount":
      actions.setConnectedUsers(data.count)
      break;

    case "itc": //incrementTileCount
      actions.addUserTiles(data.a)
      break;

    case "levelUp":
      actions.setLevel(data.level)
      actions.setUserMaxTiles(data.maxTiles)
      actions.setUserTiles(data.remainingTiles)
      actions.setUserRequiredExp(data.tilesToNextLevel)
      actions.setUserExp(data.levelProgress)
      break;

    case "error":
      if (data.msg === "Invalid userID") {
        g_socket.send(JSON.stringify({ "requestType": "initialAuth" }))
      }
      console.log(JSON.stringify(data))
      break;

    case "reAuthSuccessful":
      g_socket.send(JSON.stringify({ "requestType": "getColors", "userID": store.getState().get("userID").toString() }))
      actions.setUserMaxTiles(data.maxTiles)
      actions.setUserTiles(data.remainingTiles)
      actions.setLevel(data.level)
      actions.setUserRequiredExp(data.tilesToNextLevel)
      actions.setUserExp(data.levelProgress)
      actions.setShowBanBtn(data.showBanBtn)
      actions.setShowCleanupBtn(data.showCleanupBtn)
      break;
    case "ban_click_success":
      actions.toggleBanMode()
      break;
    case "kicked":
      g_disconnected = true;
      g_socket.close()
      actions.setKickDialogText(data.message)
      actions.setKickDialogButtonText(data.btn_text)
      actions.setKickDialogVisibility(true)
      break;

    default:
      console.log("Unknown response received:")
      console.log(JSON.stringify(data))
  }
  return false;
}

function keyboard_input_handler(key, props) {
  switch (key) {
    case "ArrowLeft":
      actions.setActiveColor(props.activeColor, -1)
      break

    case "ArrowRight":    
      actions.setActiveColor(props.activeColor, 1)
      break
  }
}


function set_up_socket() {
	var ws = new WebSocket(url);
	ws.binaryType = "arraybuffer";
	// Authentication logic
	ws.onopen = function (e) {
	  if (window.localStorage.getItem('userID') !== null) {
		actions.setUserID(window.localStorage.getItem('userID'))
		ws.send(JSON.stringify({ "requestType": "auth", "userID": store.getState().get("userID").toString() }))
	  } else {
		ws.send(JSON.stringify({ "requestType": "initialAuth" }))
	  }
	};

	ws.onmessage = message_handler;
	
	ws.onclose = function(e) {
        if (g_disconnected) {
          console.log("Disconnected, waiting for user to click reconnect");
        } else {
          console.log("Lost socket. Attempting to reestablish after 2s.");
          setTimeout(function() {
            set_up_socket();
          }, 2000);
        }
	}
	ws.onerror = function(err) {
		console.log('Socket error: ', err.message, 'closing socket.');
		ws.close();
	}
	g_socket = ws;
}

set_up_socket();

let App = props => {
  return (
    <div tabIndex="0" onKeyDown={(e) => keyboard_input_handler(e.key, props)}>
      <Canvas pixelSize={5} rows={props.rows} columns={props.columns}
        updatePixel={props.updatePixel} activeColor={props.activeColor}
        canvas={props.canvas} canvasDraw={props.canvasDraw}
        remainingTiles={props.remainingTiles}
        userExp={props.userExp} userExpLimit={props.userExpLimit}
		banModeEnabled={props.banModeEnabled}
		adminBrushEnabled={props.adminBrushEnabled} />

      <BottomBar expCollected={props.userExp} expToNext={props.userExpLimit}
        colors={props.userColors} activeColor={props.activeColor}
        remainingTiles={props.remainingTiles}
        connectedUsers={props.connectedUsers}
        userTiles={props.userTiles}
        userLevel={props.userLevel}
        creditsVisible={props.showCreditsMenu}
        adminMenuVisible={props.showAdminMenu}
        showBanBtn={props.showBanBtn}
        banModeEnabled={props.banModeEnabled}
      />
      <NicknameMenu visible={props.visible} />
      <LoadingScreen visible={props.loadingVisible} />
      <MessageBox visible={props.showMessageBox} message={props.messageBoxText} />
      <CreditsMenu visible={props.showCreditsMenu} />
      <KickDialog visible={props.showKickDialog} message={props.kickDialogText} btn_text={props.kickDialogButtonText}/>
      <AdminMenu 
        visible={props.showAdminMenu} 
        showBanBtn={props.showBanBtn} 
        banModeEnabled={props.banModeEnabled}
        showCleanupBtn={props.showCleanupBtn}
        adminBrushEnabled={props.adminBrushEnabled}
      />
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
  showMessageBox: state.get('showMessageBox'),
  showCreditsMenu: state.get('showCreditsMenu'),
  showAdminMenu: state.get('showAdminMenu'),
  messageBoxText: state.get('messageBoxText'),
  showKickDialog: state.get('showKickDialog'),
  kickDialogText: state.get('kickDialogText'),
  kickDialogButtonText: state.get('kickDialogButtonText'),
  showCleanupBtn: state.get('showCleanupBtn'),
  showBanBtn: state.get('showBanBtn'),
  banModeEnabled: state.get('banModeEnabled'),
  adminBrushEnabled: state.get('adminBrushEnabled')
}),
  {},
)(App);

export const sendNick = (nick) => {
  console.log("sending nick " + nick)
  g_socket.send(JSON.stringify({ "requestType": "setUsername", "userID": store.getState().get("userID").toString(), "name": nick }))
}

export const sendTile = (x, y, colorID) => {
  g_socket.send(JSON.stringify({
    "requestType": "postTile", "userID": store.getState().get("userID").toString(),
    "X": x, "Y": y, "colorID": colorID
  }))
}

export const sendBan = (x, y) => {
  g_socket.send(JSON.stringify({
    "requestType": "admin_cmd", "userID": store.getState().get("userID").toString(),
	"X": x, "Y": y,
	"cmd": {
      "action": "banclick",
	  "coords": [x, y]
	}
  }))
}

export const sendBrushClick = (x, y, colorID) => {
  g_socket.send(JSON.stringify({
    "requestType": "admin_cmd", "userID": store.getState().get("userID").toString(),
	"cmd": {
      "action": "brush",
      "coords": [x, y],
      "colorID": colorID
	}
  }))
}

export const resumeConnection = () => {
  g_disconnected = false;
  set_up_socket()
}

export const getColor = (id) => {
  var colors = store.getState().get('colors')
  if (colors.length == null) return "#000000";

  for (var i = 0; i < colors.length; i++) {
    if (colors[i].ID === id) {
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
