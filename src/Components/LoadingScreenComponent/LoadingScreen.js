import React from 'react';
import './LoadingScreen.css';

class LoadingScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (!this.props.visible) return null;

    return (
      <div className="overlay">
        <div className="loadingScreen">
          The canvas is loading, please wait...
        </div>
      </div>
    )
  }
}

export default LoadingScreen;
