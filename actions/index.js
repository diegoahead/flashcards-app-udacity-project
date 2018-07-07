export const RECEIVE_DECK_DATA = 'RECEIVE_DECK_DATA'
export const ADD_DECK = 'ADD_DECK'
export const ADD_CARD_TO_DECK = 'ADD_CARD_TO_DECK'

export function receiveDecksData (decks) {
    return {
      type: RECEIVE_DECK_DATA,
      decks,
    }
}

export function addDeck (deck) {
  return {
    type: ADD_DECK,
    deck,
  }
} 

export function addCard (deckId, card) {
  return {
    type: ADD_CARD_TO_DECK,
    deckId,
    card,
  }
} 