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
      <div>{props.data.arrhythmias.map(symptom => symptom.concat('. '))}</div>
      <div>{props.data.created_date}</div>
      <div>{props.data.id}</div>
      <div>{props.data.patient_name}</div>
      <div>{props.stat}</div>
      <button
        onClick={props.updateStatus}
        value={[props.data.id]}
        name={props.stat}>
          {options[0]}
      </button>
    </div>
  )
}



export default Card;
