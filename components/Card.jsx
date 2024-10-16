import React from 'react';
import { useState } from 'react';
import "../styles/Card.css"



export default function Card(props) {

    const card = props.card;

    // console.log(props.matched)



  return (

    <div>
        
        <div className="single-card">

          <img src={props.openCards.includes(card.id) || props.matched.includes(card.id) ? card.frontImageLink : card.backImageLink} 
          onClick={() => props.flipCard(card.id)} 
          className={props.matched.includes(card.id) ? "matched" : "not-matched" }
          key={card.id} />
          
        </div>

    </div>
  )
};
