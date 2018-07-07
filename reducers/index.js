import { RECEIVE_DECK_DATA, ADD_DECK, ADD_CARD_TO_DECK } from '../actions'

const initialState = {
  decks: []
}

function entries (state = initialState, action) {
  // console.log('Action decks', action.decks)
  switch (action.type) {
    case RECEIVE_DECK_DATA :
      return {
        ...state,
        decks: action.decks,
      }
    case ADD_DECK :
      return {
        ...state,
        // decks: [...state.decks, action.deck],
        // decks: [...state, action.deck]
        decks: {
          ...state.decks,
          [action.deck.name]: action.deck
        }
        
      }
    case ADD_CARD_TO_DECK :

      // console.log(...state)
      const decks = state.decks
      return {
        ...state,
        decks: Object.keys(state.decks).map(obj => {
          if (decks[obj].name === action.deckId) {
            const newObj = decks[obj];
            newObj.cards = [...newObj.cards, action.card];
            return newObj;
          }
          return decks[obj];
        })


        // [action.deckId]: {
        //   ...action.deckId,
        //   questions: [...state[action.deckId].questions.concat([action.cardTitle, action.cardAnswer])]
        // }
      }
    default :
      return state
  }
}

export default entries 