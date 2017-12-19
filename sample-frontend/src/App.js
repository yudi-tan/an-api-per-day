import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data: []
    }
  }

  componentDidMount() {
    axios.get('http://localhost:3000/posts').then((response) => {
      var data = response.data.data.map(d => <p key={d.title}> Title - {d.title} <br/> Content - {d.content} </p>);
      this.setState({data});
    })
  }


  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Sample Frontend</h1>
        </header>
        <div className="App-intro">
          Data:
          {this.state.data.length > 0 && this.state.data}
        </div>
      </div>
    );
  }
}

export default App;
