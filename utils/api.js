import { AsyncStorage } from 'react-native'

export function getDecks () {
    // return AsyncStorage.removeItem('@myStore:key')
    return AsyncStorage.getItem('@myStore:key')
    
}

export function saveDeckTitle (deck) {
  return AsyncStorage.mergeItem('@myStore:key', JSON.stringify({
    [deck.name]: deck
  }) )
}

export function saveCard (deckId, card) {

  // console.log('New Card: ', deckId, card)

  return AsyncStorage.getItem('@myStore:key')
        .then((value) => {
          Object.keys(JSON.parse(value)).map((e)=>{
            if(JSON.parse(value)[e].name === deckId) {
            // console.log(JSON.parse(value)[e])

            // transform it back to an object
            data = JSON.parse(value)[e];
            console.log( data );

            // Decrement
            data.cards.push(card)
            console.log( data );

            //save the value to AsyncStorage again
            AsyncStorage.mergeItem( '@myStore:key', JSON.stringify({
              [deckId]: data
            }) );


            }
          })
        })


  // return AsyncStorage.mergeItem('@myStore:key', JSON.stringify({
  //   cards: [card]
  // }))
}