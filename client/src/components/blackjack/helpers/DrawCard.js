export function DrawCard(playingDeck) {
    const deckNumber = Math.floor(Math.random() * (playingDeck.length))
    const cardNumber = Math.floor(Math.random() * (playingDeck[deckNumber].length))
    const newCard = playingDeck[deckNumber][cardNumber]

    return newCard
}