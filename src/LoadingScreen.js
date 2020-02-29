import React from 'react';
import './styles/loadingscreen/LoadingScreen.css';

class LoadingScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (!this.props.visible) return null;

    return (
      <div className="overlay">
        <style>
          @import url('https://fonts.googleapis.com/css?family=Open+Sans');
        </style>
        <div className="loadingScreen">
          The canvas is loading, please wait...
        </div>
      </div>
    )
  }
}

export default LoadingScreen;
