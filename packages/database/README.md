# Real Time Database package
Firebase RealTime Database rules and indexes together with related tests.

Data are moved into real time database at the start of a gaming session
to allow user real time collaboration and listening on changes. 
For more info have a look ad the functions package.

## :file_cabinet: Database "schema" info

### cards
Under the Cards path you will find all the game information of the cards, such as
position in the board, estimation. Information that are static should be taken 
from Firestore.

If a card is not here it meas that it has never been moved from the deck

```
└── {gameId}
    └── {cardId}
        ├── estimation      <- Text content of the estimation field
        ├── lockedBy        <- userId that is dragging the card
        ├── parent          <- Either "board" or "panel"
        ├── position        <- Card position in the board
        │   ├── x           <- Dinstance from board left
        │   └── y           <- Dinstance from board top
        └── zIndex          <- Elevation of the card in the board
```

#### Validation and permissions
* You can read and write a card for a game only if you have an open connection on that game.
* You can change the lockedBy only if it is null and you are setting your own
userId or it is your userId and you are setting to null
* estimation should be a string
* parent must be "board" or "panel"
* position must contain x and y and they must both be numbers greater
tha zero and lower than the board dimension (under games/{gameId})
* zIndex must be a number
  

#### Triggers
No triggers on cards

### connections
This path is modified according to the online offline status of a user in a game.
Every user can have more tha one device or browser tab simultaneously connected
to a game, and should be considered online until a connection exists on that game.

```
└── {gameId}
    └── {userId}
        └── {connectionId}
            └── updatedAt
```

#### Validation and permissions
* You can write on /{gameId}/{userId}/{connectionId} if the game exists
and the userId is you userId
* updatedAt must be the server time

#### Triggers
* onConnectionCreate
* onConnectionDelete
* onConnectionUpdate

### games
Games path is populated by the selectBestRTDBInstance the fist time a suer join
a game, and the game is not into an rtdb.

```
└── {gameId}
    ├── boardDimentions             <- The dimentions of the board, where you can place the cards
    │   ├── x                       <- Board width
    │   └── y                       <- Board height
    ├── createdAt                   <- Timestamp of creation
    ├── deckId                      <- The deck id associated with the game
    ├── facilitator                 <- Facilitator information (the user that created the game)
    │   └── id                      <- Facilitator id
    ├── name                        <- Game name
    ├── review                      <- If the review was triggered or not
    ├── scenarioCardId              <- The scenario card choosed at game creation, null if handwritten scenario
    ├── scenarioContent             <- The scenario content
    └── scenarioTitle               <- The scenario title
```
#### Validation and permissions
Only the facilitator can modify the game object.
The only editable field is the review that can be set to true
to trigger review mode

#### Triggers
No triggers on cards
