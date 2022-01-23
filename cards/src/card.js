import React from 'react';

function Card(props) {

  let options = null;
  if (props.stat === 'PENDING' || props.stat === 'REJECTED') {
    options = ['Mark complete']
  }
  if (props.stat === 'DONE') {
    options = ['Reject item']
  }
  return (
    <div id={props.data.id} className="OneCard">
      <div><em>Patient name: </em>{props.data.patient_name}</div>
      <div><em>Conditions present: </em>{props.data.arrhythmias.map(symptom => symptom.concat('. '))}</div>
      <div><em>Date recorded: </em>{new Date(props.data.created_date).toString()}</div>

      <button
        className="green-button"
        onClick={props.updateStatus}
        value={[props.data.id]}
        name={props.stat}>
          {options[0]}
      </button>
    </div>
  )
}

export default Card;
