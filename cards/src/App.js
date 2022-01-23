import './App.css';
import React from 'react';
import axios from 'axios';
import Card from './card.js'

class App extends React.Component  {
  constructor(props) {
    super(props);
    this.state = {
      PENDING: [],
      REJECTED: [],
      DONE: [],
    }
  }

  componentDidMount() {
    this.getCards();
  }

  getCards() {
    axios.get('http://localhost:8000/cards')
      .then(results => {
        console.log(results.data);
        let update = {
          PENDING: [],
          REJECTED: [],
          DONE: [],
        }
        for (let i = 0; i < results.data.length; i++) {
          let status = results.data[i].status;
          update[status].push(results.data[i])
        }
        this.setState({PENDING: update.PENDING})
        this.setState({REJECTED: update.REJECTED})
        this.setState({DONE: update.DONE})
        })
      .catch(err => console.log(err))
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">Card triage</header>
        <div className="Cards">
          <h5>Pending: {this.state.PENDING.map(card => <Card data={card}/>)}</h5>
          <h5>Rejected: {this.state.REJECTED.map(card => <Card data={card}/>)}</h5>
          <h5>Done: {this.state.DONE.map(card => <Card data={card}/>)}</h5>

        </div>

      </div>
    )
  };
}

export default App;
