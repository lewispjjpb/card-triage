import logo from './logo.svg';
import './App.css';
import React from 'react';
import axios from 'axios';

class App extends React.Component  {
  constructor(props) {
    super(props);
    this.state = {}
  }

  componentDidMount() {
    this.getCards();
  }

  getCards() {
    axios.get('http://localhost:8000/cards')
      .then(results => console.log(results))
      .catch(err => console.log(err))
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">Card triage</header>
      </div>
    )
  };
}

export default App;
