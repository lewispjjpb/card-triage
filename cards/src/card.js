import React from 'react';


function Card(props) {
  return (
    <div id={props.data.id} className="OneCard">
      <div>{props.data.arrhythmias}</div>
      <div>{props.data.created_date}</div>
      <div>{props.data.id}</div>
      <div>{props.data.patient_name}</div>
      <div>{props.data.status}</div>
    </div>
  )
}



export default Card;