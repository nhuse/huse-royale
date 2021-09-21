    export function CardValues(hand) {
    
        let points = 0
        hand.forEach((card) => {
            switch(card) {
                case 'Two of Spades': case 'Two of Clubs': case 'Two of Hearts': case 'Two of Diamonds':
                    points += 2
                    break;
                case 'Three of Spades': case 'Three of Clubs': case 'Three of Hearts': case 'Three of Diamonds':
                    points += 3
                    break;
                case 'Four of Spades': case 'Four of Clubs': case 'Four of Hearts': case 'Four of Diamonds':
                    points += 4
                    break;
                case 'Five of Spades': case 'Five of Clubs': case 'Five of Hearts': case 'Five of Diamonds':
                    points += 5
                    break;
                case 'Six of Spades': case 'Six of Clubs': case 'Six of Hearts': case 'Six of Diamonds':
                    points += 6
                    break;
                case 'Seven of Spades': case 'Seven of Clubs': case 'Seven of Hearts': case 'Seven of Diamonds':
                    points += 7
                    break;
                case 'Eight of Spades': case 'Eight of Clubs': case 'Eight of Hearts': case 'Eight of Diamonds':
                    points += 8
                    break;
                case 'Nine of Spades': case 'Nine of Clubs': case 'Nine of Hearts': case 'Nine of Diamonds':
                    points += 9
                    break;
                case 'Ten of Spades': case 'Ten of Clubs': case 'Ten of Hearts': case 'Ten of Diamonds': case 'Jack of Spades': case 'Jack of Clubs': case 'Jack of Hearts': case 'Jack of Diamonds': case 
                    'Queen of Spades': case 'Queen of Clubs': case 'Queen of Hearts': case 'Queen of Diamonds': case 'King of Spades': case 'King of Clubs': case 'King of Hearts': case 'King of Diamonds':
                    points += 10
                    break;
                case 'Ace of Spades': case 'Ace of Clubs': case 'Ace of Hearts': case 'Ace of Diamonds':
                    if((points+11) > 21) {
                        points += 1
                        break;
                    }else {
                        points += 11
                        break;
                    }
            }
        })
        return points
    }
