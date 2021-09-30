# **_The Huse Royale_**

The Huse Royale is a web application that allows the player to play a selection of Casino Games. The user will have 5,000 chips upon successful
registration. The user will be able to use these chips to play the casino games included.
              
## **Deployed Application**
Please visit http://huse-royale.herokuapp.com to enjoy the deployed version of this application
                                                                            
## **Functionality**
                                                                            
* A user is able to login/register/logout
* A user is able to edit their profile (avatar, email, username) in their profile page. 
  (The button in the navbar saying "Hello, XXXXX")
* A user is able to deposit chips into their bank in The Bank tab
* A user is able to withdraw chips from their bank in The Bank tab
* A user is able to leave comments on games
  * Each game will have their own comments the users have left
  * In order to leave/see the comments, the user must select the COMMENTS button on the corresponding game
* A user will be able to update/delete their comment(s) in the user's profile page
              
## **Gameplay**
              
### **Black Jack**
  * The goal of black jack is to get as close to 21 as possible without going over while also beating the dealer in points.
  * When the game starts, the player will be asked to enter a bet. The minimum bet is $5 and the max is $1000
  * The player will receive two cards once the bet is locked in.The points for the cards are determined by the number. 
    * Ex. 4 of Spades is worth 4 points while a 6 of Spades is worth 6. Jacks, Queens and Kings are worth 10 
      while an Ace is worth either 1 or 11. An ace is worth 11 if the player's total will not break 21. 
      Or 1 if the players score will break 21 with 11 points.
  * If a player is able to get 21 (Black Jack) on their first hand (Ace + 10/Jack/Queen/King), then the player will recieve 
  a 1.5:1 payout.
  * If the dealer gets 21 (Black Jack) on their first hand then the player loses and the game is over.
  * If both the dealer AND the player get a Black Jack, it's a push and the game will end without the player losing or 
  gains any chips
  * If neither the dealer or player get a Black Jack, then the player is able to either HIT or HOLD
    * HIT adds another card to the player's hand. If the card brings the player's total score over 21, the player busts and 
    loses his bet
    * HOLD will stop the player from receiving cards. Whatever the player's current score is, is the score the dealer 
    will have to beat make the player lose his bet.
  * After the player holds, it becomes the dealers turn.
  * The dealer will always hit if it's score is LESS than 16. If the dealer's score is OVER 16, the dealer will 
  always hold.
  * If the PLAYER has more points at the end of the dealer's turn, the player will win and get a 1:1 payout.
  * If the DEALER has more the points, then the player will lose it's bet.
  * If the DEALER and PLAYER have the same points, then the outcome is a PUSH and the player will not lose or 
  gain any chips.
                 
### **Roulette**
  * Upon starting the game, the user will be asked to enter a bet and a LUCKY NUMBER
    * The LUCKY NUMBER must be between 0 and 40.
  * Once the player's bet and lucky number are locked in, the player will then spin the will
  * If the wheel lands on the player's LUCKY NUMBER, the user will recieve a 50:1 payout

## **Credits**
Card assets were obtained from: **https://github.com/hayeah/playing-cards-assets**                            
Roulette wheel was obtained from: **https://github.com/effectussoftware/react-custom-roulette**
