import React, {useState, useEffect} from 'react';
import {shuffleArray} from '../../utils/shuffle';
import FlashCard from '../../components/cards/FlashCard';

import {Button, Dropdown, ButtonGroup} from 'react-bootstrap'

const Study = ({ flashCards }) => {
    const [cards, setCards] = useState();
    const [limit, setLimit] = useState(10);
    const [shuffle, toggleShuffle] = useState(false);

    console.log(flashCards);

    const createDeck = () => {
        let currentLimit = limit;
        let fullDeck = shuffleArray(flashCards);
        let sessionDeck = []

        if(currentLimit === "all") {
            return setCards(fullDeck)
        }

        console.log(currentLimit);

        if(currentLimit > flashCards.length){
            currentLimit = flashCards.length
        }

        console.log(currentLimit)

        for(let i = 0; i < currentLimit; i++){
            sessionDeck.push(fullDeck[i])
        }

        console.log({sessionDeck});
        setCards(sessionDeck);
    }

    useEffect(() => {
        createDeck()
    }, [shuffle, toggleShuffle, limit, setLimit])


    const beginShuffle = () => {
        toggleShuffle(!shuffle)
    }


    const showNext = (option) => {
        let deck = cards;
  


        const currentCard = deck[0]


        if(option==="bad"){
            deck.push(currentCard);  
        } 

        deck.shift();

        setCards([...deck])
    }


    const showPrevious = () => {
        let deck = cards;
        const lastCard = deck[deck.length-1]
        deck.pop();
        deck.unshift(lastCard);
        setCards([...deck])

    }



    const limitOptions = [5,10,25,50, 100, "all"]

    console.log(cards)

    const OptionsDropDown = () => {
        return (
        
            <Dropdown as={ButtonGroup}>
               
              <Button variant="light">{limit}</Button>

            <Dropdown.Toggle split variant="light" id="dropdown-split-basic" />
                <Dropdown.Menu>
                    {limitOptions.map((item,index) => <Dropdown.Item key={index} onClick={() => setLimit(item)}>{item}</Dropdown.Item>)}
                </Dropdown.Menu>
            </Dropdown>)
    }

    return (<div><OptionsDropDown/><Button variant="light" onClick={beginShuffle} className="m-2"><i class="fas fa-random"></i></Button>{cards && cards.length > 0 && <FlashCard flashCard={cards[0]} showPrevious={showPrevious} showNext={showNext} />}{cards &&  <>{cards.length}</>}</div>)

}


export default Study;