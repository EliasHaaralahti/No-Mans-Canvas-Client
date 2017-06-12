import React from 'react';
import './App.css'

class Example extends React.Component{
  render(){
    return(
      <div>
        <p>No Mans Canvas Client!</p>
      </div>
    )
  }
}

class App extends React.Component{
  render(){
    return(
      <div>
        <Example />
      </div>
    )
  }
}

export default App
