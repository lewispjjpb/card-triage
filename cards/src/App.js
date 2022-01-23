import './App.css';
import React from 'react';
import axios from 'axios';

class App extends React.Component  {
  constructor(props) {
    super(props);
    this.state = {
      cards: [],
    }
  }

  componentDidMount() {
    this.getCards();
  }

  getCards() {
    axios.get('http://localhost:8000/cards')
      .then(results => {
        console.log(results.data);
        this.setState({cards: results.data})
        })
      .catch(err => console.log(err))
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">Card triage</header>
        <div className="Card"></div>
      </div>
    )
  };
}

export default App;
