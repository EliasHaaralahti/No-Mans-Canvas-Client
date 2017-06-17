import React from 'react';

class Pixel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            color: "#ffffff",
        }
    }

    render() {
        return <div style={{
            display: "inline-block",
            background: this.state.color,
            height: this.props.size,
            width: this.props.size,
        }} onClick={()=> this.setState({color: "#ffff00"})}/>;
    }
}

let Row = (props) => {
    return (
      <div style={{
          height: props.height,
          width: props.width
      }}>{
          Array(props.count).fill().map((_, i) => {
              return <Pixel size={props.height}
                            key={i} />;
          })
        }
      </div>
  )
}

class Grid extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // -3 due to padding, not optimal solution
            x: Math.floor(window.innerWidth / 12) - 3,
            y: Math.floor(window.innerHeight / 12) - 3
        }
    }

    render() {
      return (
        // also props here?
        <div style={{
            display: "inline-block",
            height: window.innerHeight,
            width: window.innerWidth
        }}>{
            Array(this.state.y).fill().map((_, i) => {
                // TODO: Use props?
                return <Row height={12} //This also defines pixel size
                            width={window.innerWidth}
                            count={this.state.x}
                            key={i} />;
            })
          }
        </div>
      )
    }
}

export default Grid;
