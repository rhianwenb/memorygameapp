import { useState, useEffect, useRef } from 'react';
import DeckLayout from '../components/DeckLayout.jsx';
import './App.css';


function App() {

  const [flipCount, setFlipCount] = useState(0);
  const [deck, setDeck] = useState([]);
  const [showCards, setShowCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]); 
  const [pairsRemaining, setPairsRemaining] = useState(10);
  const timeout = useRef(null);


  useEffect(() => {
      getDeck();
  }, []);

  async function getDeck() {
      try {
          let response = await fetch("./deck-one.json")
              if (response.ok) {
              let data = await response.json()
              data = data.slice(0,20)
              let shuffleDeck = data.sort(() => Math.random() - 0.5)
              setDeck(shuffleDeck);
              // console.log(shuffleDeck)
              } else {
                  console.log(`server error: ${response.status} ${response.statusText}`)
              } 
            }
            catch(e) {
                  console.log(`error: ${e.message}`)
            }
  };


  // when two cards have been flipped pass to function to check whether they match 
  useEffect(() => {
    if (showCards.length === 2) {
      checkPair(showCards)
      // setTimeout(checkPair, 1000);
    }
  }, [showCards]);


  // two cards flipped, find those ids in deck to get card object
  const checkPair = (pair) => {
    let first = pair[0];
    let second = pair[1];
    let checkFirst = deck.find((card) => card.id === first);
    let checkSecond = deck.find((card) => card.id === second);

  // check descriptions of each card are the same, set as matched and reset to cards not being shown
    if (checkFirst.description === checkSecond.description) {
      setMatchedCards([...matchedCards, first, second]);
      setPairsRemaining((count) => count-1);
      setShowCards([]);
      return;
    } 
  // if no match after timeout reset to cards not being shown 
    timeout.current = setTimeout(() => { setShowCards([]) }, 1000);
  };


  // on click flip the card with this id, add to array to reading for checking
  function flipCard(id) {             
    if (showCards.length < 2) {
      // console.log(id)
      setShowCards([...showCards, id]);
      // console.log(showCards)
      setFlipCount((count) => count+1);
    } else {
      clearTimeout(timeout.current);
      setShowCards([id]);
    };
  };

  // console.log(showCards, matchedCards)

  const shuffleDeck = () => {
    getDeck();
    setShowCards([]);
    setMatchedCards([]);
    setFlipCount(0);
    setPairsRemaining(10);
  };




  return (
    <>
    <div className="app">

      <div className="title">
        <h1>Card Match Memory Game</h1>  
      </div>
      
      <div>

        <DeckLayout allCards={deck} 
          flipCard={(f) => flipCard(f)} 
          moves={flipCount}
          score={pairsRemaining}
          openCards={showCards} 
          matched={matchedCards} 
          resetGame={shuffleDeck}
          />
          
      </div>

      <div className="signature">
        <p> Code by Rhianwen </p>
      </div>
        
    </div>

    </>
  )
};

export default App



