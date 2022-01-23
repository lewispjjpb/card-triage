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
      filterPatient: '',
      patientIsFiltered: false,
      specificCondition: '',
      conditionIsFiltered: false,
      allArrhythmias: [],
    };

    this.changeStatus = this.changeStatus.bind(this);
    this.filterNames = this.filterNames.bind(this);
    this.filterConditions = this.filterConditions.bind(this);
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
          let conditions = [];
          for (let j = 0; j < results.data[i].arrhythmias.length; j++) {
            conditions.push(results.data[i].arrhythmias[j])
          }
          update[status].push(results.data[i])
        }
        this.setState({PENDING: update.PENDING})
        this.setState({REJECTED: update.REJECTED})
        this.setState({DONE: update.DONE})
        let allCards = this.state.PENDING.concat(this.state.DONE, this.state.REJECTED)
        let allSymptoms = new Set();
        for (let i = 0; i < allCards.length; i++) {
          let thisCard = allCards[i];
          for (let j = 0; j < thisCard.arrhythmias.length; j++) {
            allSymptoms.add(thisCard.arrhythmias[j])
          }
        }
        allSymptoms = Array.from(allSymptoms)
        this.setState({'allArrhythmias': allSymptoms})
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
      newStatus = 'DONE';
    }
    if (status === 'DONE') {
      newStatus = 'REJECTED';
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

  filterNames(e) {
    e.preventDefault();
    this.setState({filterPatient: e.target.value});
    this.setState({patientIsFiltered: true});
  }

  filterConditions(e) {
    e.preventDefault();
    this.setState({specificCondition: e.target.value});
    this.setState({conditionIsFiltered: true})
  }


  render() {
    let allCards = this.state.PENDING.concat(this.state.DONE, this.state.REJECTED)
    // let allSymptoms = new Set();
    // for (let i = 0; i < allCards.length; i++) {
    //   let thisCard = allCards[i];
    //   for (let j = 0; j < thisCard.arrhythmias.length; j++) {
    //     allSymptoms.add(thisCard.arrhythmias[j])
    //   }
    // }
    // this.setState({allArrhythmias: allSymptoms})
    return (
      <div className="App">
        <header className="App-header">Card triage</header>
        <div className="Filters">
          <div>
            Select patient:
            <select value={this.state.filterPatient} onChange={this.filterNames}>
              {allCards.map(card => <option value={card.patient_name}>{card.patient_name}</option>)}
            </select>
          </div>
          <button onClick={() => this.setState({patientIsFiltered: false})}>Clear patient filter</button>
          <div>
            Select arrhythmias:
            <select value={this.state.specificCondition} onChange={this.filterConditions}>
              {this.state.allArrhythmias.map(card => <option value={card}>{card}</option>)}
            </select>
          </div>
          <button onClick={() => this.setState({conditionIsFiltered: false})}>Clear condition filter</button>
        </div>
        <div className="Cards">
          <h5>
            Pending: {this.state.PENDING.map(card => {
              if (!this.state.patientIsFiltered && !this.state.conditionIsFiltered) {
                return <Card data={card} updateStatus={this.changeStatus} stat={card.status}/>
              } else if (!this.state.conditionIsFiltered && this.state.patientIsFiltered) {
                if (card.patient_name === this.state.filterPatient) {
                 return <Card data={card} updateStatus={this.changeStatus} stat={card.status}/>
                }
              } else if (this.state.conditionIsFiltered && !this.state.patientIsFiltered) {
                if (card.arrhythmias.indexOf(this.state.specificCondition) !== -1) {
                  return <Card data={card} updateStatus={this.changeStatus} stat={card.status}/>
                 }
              } else {
                if (card.arrhythmias.indexOf(this.state.specificCondition) !== -1 && card.patient_name === this.state.filterPatient) {
                  return <Card data={card} updateStatus={this.changeStatus} stat={card.status}/>
                }
              }
            })}
          </h5>
          <h5>
            Done: {this.state.DONE.map(card => {
              if (!this.state.patientIsFiltered && !this.state.conditionIsFiltered) {
                return <Card data={card} updateStatus={this.changeStatus} stat={card.status}/>
              } else if (!this.state.conditionIsFiltered && this.state.patientIsFiltered) {
                if (card.patient_name === this.state.filterPatient) {
                 return <Card data={card} updateStatus={this.changeStatus} stat={card.status}/>
                }
              } else if (this.state.conditionIsFiltered && !this.state.patientIsFiltered) {
                if (card.arrhythmias.indexOf(this.state.specificCondition) !== -1) {
                  return <Card data={card} updateStatus={this.changeStatus} stat={card.status}/>
                 }
              } else {
                if (card.arrhythmias.indexOf(this.state.specificCondition) !== -1 && card.patient_name === this.state.filterPatient) {
                  return <Card data={card} updateStatus={this.changeStatus} stat={card.status}/>
                }
              }
            })}
          </h5>
          <h5>
            Rejected: {this.state.REJECTED.map(card => {
              if (!this.state.patientIsFiltered && !this.state.conditionIsFiltered) {
                return <Card data={card} updateStatus={this.changeStatus} stat={card.status}/>
              } else if (!this.state.conditionIsFiltered && this.state.patientIsFiltered) {
                if (card.patient_name === this.state.filterPatient) {
                 return <Card data={card} updateStatus={this.changeStatus} stat={card.status}/>
                }
              } else if (this.state.conditionIsFiltered && !this.state.patientIsFiltered) {
                if (card.arrhythmias.indexOf(this.state.specificCondition) !== -1) {
                  return <Card data={card} updateStatus={this.changeStatus} stat={card.status}/>
                 }
              } else {
                if (card.arrhythmias.indexOf(this.state.specificCondition) !== -1 && card.patient_name === this.state.filterPatient) {
                  return <Card data={card} updateStatus={this.changeStatus} stat={card.status}/>
                }
              }
            })}
          </h5>

        </div>

      </div>
    )
  };
}

export default App;
