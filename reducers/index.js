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
      return {
        ...state,
        decks: {
          ...state.decks,
          [action.deckId]: {
            ...state.decks[action.deckId],
            cards: [...state.decks[action.deckId].cards, action.card]
          }
        }
      }
    default :
      return state
  }
}

export default entries 