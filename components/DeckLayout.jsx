import React from 'react';
import { useState, useEffect } from 'react';
import Card from '../components/Card.jsx';
import "../styles/DeckLayout.css"



// displaying the backs of the cards


export default function DeckLayout(props) {

    const deck = props.allCards; 


  return (
    <div className="game-page">

        <div className="game-controls">
            <button onClick={props.resetGame}> Shuffle Deck </button> 
            <button> Moves: {props.moves} </button>
            <button> Pairs Remaining: {props.score} </button>
        </div> 

        <div className="full-deck"> 
            {deck.map((card, index) => 
                <Card card={card} 
                flipCard={props.flipCard}
                openCards={props.openCards}
                matched={props.matched} 
                isFlipped={props.isFlipped}
                key={index}
                />
            )}
        </div>

        {props.score === 0 && (<div className="modal">
            <div className="modal-text">
                <h3> You did it!</h3>             
            </div>
            <div className="modal-button">
                <button onClick={props.resetGame}> Play Again </button>
            </div>
        </div>) }

    </div>
  )
};
