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
import { rgbToHex } from './utils';
import struct from '@aksel/structjs';

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

const req = {
  INITIAL_AUTH: 0,
  AUTH: 1,
  GET_CANVAS: 2,
  GET_TILE_INFO: 3,
  POST_TILE: 4,
  GET_COLORS: 5,
  SET_USERNAME: 6,
};

const bin = {
	RES_AUTH_SUCCESS: 0,
	RES_CANVAS: 1,
	RES_TILE_INFO: 2,
	RES_TILE_UPDATE: 3,
	RES_COLOR_LIST: 4,
	RES_USERNAME_SET_SUCCESS: 5,
	RES_TILE_INCREMENT: 6,
	RES_LEVEL_UP: 7,
	RES_USER_COUNT: 8,
	ERR_INVALID_UUID: 128,
};

var binary_handler = function (e) {
	const data = new Uint8Array(e.data);
	switch (data[0]) {
		case bin.RES_AUTH_SUCCESS:
			console.log('RES_AUTH_SUCCESS');
			return;
		case bin.RES_CANVAS:
			actions.drawCanvasBin(data.slice(1));
			actions.loadingScreenVisible(false);
			actions.setMessageBoxVisibility(false);
			return;
		case bin.RES_TILE_INFO:
			console.log('RES_TILE_INFO');
			return;
		case bin.RES_TILE_UPDATE:
		{
			let s = struct('BBxxI');
			let [_, c, i] = s.unpack(e.data);
			const thing = {
				c: c,
				i: i,
			};
			actions.setPixel(thing);
			return;
		}
		case bin.RES_COLOR_LIST:
		{
			// (data_bytes - header_length) / sizeof(struct color)
			const color_amount = (e.data.byteLength - 1) / 4;
			var colors = [];
			for (let i = 0; i < color_amount; ++i) {
				let str = struct('BBBB');
				let view = e.data.slice((i * 4) + 1, (i * 4) + 5);
				let [r, g, b, id] = str.unpack(view);
				colors[i] = { 'R': r, 'G': g, 'B': b, 'ID': id };
			}
			actions.setColors(colors);
			sendGetCanvas();
			return;
		}
			return;
		case bin.RES_USERNAME_SET_SUCCESS:
			console.log('USERNAME_SET_SUCCESS');
			return;
		case bin.RES_TILE_INCREMENT:
		{
			let i = struct('BB');
			let [_, c] = i.unpack(e.data);
			actions.addUserTiles(c);
			return;
		}
		case bin.RES_LEVEL_UP:
			console.log('RES_LEVEL_UP');
			return;
		case bin.RES_USER_COUNT:
		{
			let i = struct('BxH');
			let [_, c] = i.unpack(e.data);
			actions.setConnectedUsers(c);
			return;
		}
		case bin.ERR_INVALID_UUID:
			console.log('ERR_INVALID_UUID');
			return;
		default:
			console.log("Received unknown binary message with id " + data[0]);
			return;
	}
}

var text_handler = function (e) {
  const data = JSON.parse(e.data);
  var uuid = store.getState().get("userID").toString();
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
      g_socket.send(struct('B37s').pack(req.GET_COLORS, uuid));
      break;

    case "userCount":
      actions.setConnectedUsers(data.count)
      break;

    case "levelUp":
      actions.setLevel(data.level)
      actions.setUserMaxTiles(data.maxTiles)
      actions.setUserTiles(data.remainingTiles)
      actions.setUserRequiredExp(data.tilesToNextLevel)
      actions.setUserExp(data.levelProgress)
      break;

    case "ti":
      const date = new Date(data.pt * 1000);
      let placer_info = data.un + ' on ' + date.toISOString();
      actions.setPlacerInfo(placer_info);
      break;

    case "error":
      if (data.msg === "Invalid userID") {
        g_socket.send(JSON.stringify({ "requestType": "initialAuth" }))
      }
      console.log(JSON.stringify(data))
      actions.setMessageBoxText(data.msg);
      actions.setMessageBoxVisibility(true);
      break;

    case "reAuthSuccessful":
      g_socket.send(struct('B37s').pack(req.GET_COLORS, uuid));
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
        adminBrushEnabled={props.adminBrushEnabled}
        placerInfo={props.placerInfo}

      <BottomBar 
        visible={props.showBottomBar}
        expCollected={props.userExp} 
        expToNext={props.userExpLimit}
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
  placerInfo: state.get('placerInfo'),
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
  adminBrushEnabled: state.get('adminBrushEnabled'),
  showBottomBar: state.get('showBottomBar'),
}),
  {},
)(App);

export const sendNick = (nick) => {
  console.log("sending nick " + nick)
  g_socket.send(JSON.stringify({ "requestType": "setUsername", "userID": store.getState().get("userID").toString(), "name": nick }))
}

export const sendTile = (x, y, colorID) => {
  let uuid = store.getState().get("userID").toString();
  g_socket.send(struct('B37sHHH').pack(req.POST_TILE, uuid, x, y, colorID));
}

export const getTileInfo = (x, y) => {
  g_socket.send(JSON.stringify({ "requestType": "gti", "userID": store.getState().get("userID").toString(), "X": x, "Y": y }));
}

export const sendGetCanvas = () => {
  let uuid = store.getState().get("userID").toString();
  g_socket.send(struct('B37s').pack(req.GET_CANVAS, uuid));
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

export default App
