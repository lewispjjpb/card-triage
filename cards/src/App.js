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
    };

    this.changeStatus = this.changeStatus.bind(this);
  }

  componentDidMount() {
    this.getCards();
  }

  getCards() {
    axios.get('http://localhost:8000/cards')
      .then(results => {
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

  changeStatus(e) {
    e.preventDefault();
    console.log(e.target.value)
    const record = Number(e.target.value);
    const status = e.target.name;
    let newStatus;
    if (status === 'PENDING' || status === 'REJECTED') {
      newStatus = 'DONE'
    }
    if (status === 'DONE') {
      newStatus = 'REJECTED'
    }

    let recordLocChange = this.state[status].filter( item => item.id === record)
    recordLocChange[0].status = newStatus
    console.log(recordLocChange)
    this.setState({
      [status]: this.state[status].filter( item => item.id !== record)
    })

    this.setState({
      [newStatus]: this.state[newStatus].concat(recordLocChange)
    })

  }

  render() {
    return (
      <div className="App">
        <header className="App-header">Card triage</header>
        <div className="Cards">
          <h5>Pending: {this.state.PENDING.map(card => <Card data={card} updateStatus={this.changeStatus} stat={card.status}/>)}</h5>
          <h5>Done: {this.state.DONE.map(card => <Card data={card} updateStatus={this.changeStatus} stat={card.status}/>)}</h5>
          <h5>Rejected: {this.state.REJECTED.map(card => <Card data={card} updateStatus={this.changeStatus} stat={card.status}/>)}</h5>

        </div>

      </div>
    )
  };
}

export default App;
