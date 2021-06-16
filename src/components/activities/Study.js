import React, {useState, useEffect} from 'react';
import {shuffleArray} from '../../utils/shuffle';
import FlashCard from '../../components/cards/FlashCard';

const Study = ({ children }) => {
    const [cards, setCards] = useState()



    useEffect(() => {
        const deck = shuffleArray(children);
        setCards(deck);
    }, [])



    const showNext = () => {
        let deck = cards;

        const currentCard = deck[0]

        deck.push(currentCard);

        deck.shift();

        console.log(deck);


        setCards([...deck])
    }

    return (<div>{cards && cards.length > 0 && <FlashCard child={cards[0]} showNext={showNext} />}</div>)

}


export default Study;