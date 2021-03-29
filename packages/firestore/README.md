
# Firestore package 
Firebase Firestore rules and indexes together with related tests.


## :file_cabinet: Database "schema" info

### cards
Collection containing all the cards documents.

```
└── {cardId}
    ├── content         <- Text content of the card
    ├── deckId          <- Reference to the deck the card belongs to
    ├── number          <- Ordinal number of card in the deck
    ├── subtitle        <- The subtitle appearing in the card
    ├── tags            <- List of tags appearing on the header
    ├── title           <- The title appearing in the card content
    └── type            <- The card type (scenario, step, rule..)
```

#### Validation and permissions
Cards can be read by any authenticated user.
No user con write on cards collection up to now. You can change the in the fixture json data and run the script to load 
them or directly from the firebase ui.

#### Triggers
No triggers on cards

### decks
At this stage there is only one deck available the "default-v1". It is linked by default to all the created games.
```
└── {deckId}
    └── name            <- A game identifier
```

#### Validation and permissions
As for the cards, decks can be read by authenticated user but update only using firebase console or admin sdk.

#### Triggers
No triggers on decks

### dynamicData
fixture data used by the application that are here to be changed dynamically without redeploying the app.

```
├── devOpsMaturities            <- Roles to select on singup
│   ├── labels                  <- Internationalized labels of the roles as a map
│   │   └── {maturity}          <- maturity key
│   │       └── {lang}          <- Label of the maturity for the lang (the key in the map)
│   └── maturities              <- List of maturities keys
└── gameRoles                   <- Roles to select on singup
    ├── labels                  <- Internationalized labels of the roles as a map
    │   └── {role}              <- role
    │       └── {lang}          <- Label of the role for the lang (the key in the map)
    └── roles                   <- List of roles keys
```

dynamicData should be internationalized, so if you add a maturity, or a role, add also the corresponding element
inside the labels object, so the front end will be able to show it properly

#### Validation and permissions
The dynamic data are used inside the signup page, so they can be read by anyone (also by non-authenticated users).
No user can write on this collection

#### Triggers
No triggers on dynamicData

### games
The game is the core data of the application. Firestore is used for long-lived game saving. In case of activity the 
game is moved to a real time database instance to provide the best experience and performance in collaboration. 
After a given period od inactivity it is moved back to firestore with the updated state of moved cards.

```
└── {gameId}
    ├── boardDimentions             <- The dimentions of the board, where you can place the cards
    │   ├── x                       <- Board width
    │   └── y                       <- Board height
    ├── cards                       <- Game state when coming form the RTDB as state of cards moved cards that are not there are considered never moved (so in the yet in the deck)
    │   └── {cardId}                <- CardId
    │       ├── estimation          <- Estimation if set
    │       ├── lockedBy            <- userId that is holding the card (always null in firestore)
    │       ├── parent              <- 'board' or 'panel'
    │       ├── position            <- Position of the card in the board or null if is in the panel
    │       │   ├── x               <- x position in the board (with respect to left)
    │       │   └── y               <- y position in the board (with respect to top)
    │       └── zIndex              <- index in the z axis of the card (to place cards one over another correclty)
    ├── createdAt                   <- Timestamp of creation
    ├── deckId                      <- The deck id associated with the game
    ├── facilitator                 <- Facilitator information (the user that created the game)
    │   └── id                      <- Facilitator id
    ├── lastPlayerDisconnectedAt    <- Last time a player was online (null if there are players online right now)
    ├── movedAt                     <- Last time this game was copied from the real time database to firestore
    ├── name                        <- Game name
    ├── review                      <- If the review was triggered or not
    ├── rtdbInstance                <- The rtdbInstance in wich the game is saved for collaboration, null if not in rtdb
    ├── scenarioCardId              <- The scenario card choosed at game creation, null if handwritten scenario
    ├── scenarioContent             <- The scenario content
    └── scenarioTitle               <- The scenario title
```

#### Validation and permissions
Every user authenticated can create a game if these rules are respected:
* scenarioTitle is required and must be less than 100 char long
* scenarioContent is required and must be less than 3000 char long
* if scenarioCardId is specified scenarioContent and scenarioTitle must be the title, and the content of the given card
* the deckId specified must be one of an existing deck
* the facilitator info corresponds to the user that creates the game
* createdAt is the serverTimestamp
* cards is null
* rtdbInstance is null
* boardDimensions.x is 3840
* boardDimensions.y is 2160
* name is a string less than 100 chars long

Every authenticated user can access a single game having the id.
It is not possible to list all the games

#### Triggers
No triggers on the games 


### rtdbInstances
Real time database instances are used to shard games improving scalability. When a user joins a game if it is not assigned
to any rtdb instance he must call an api to retrieve the best rtdb instance for the game. Then the data of the game are 
copied inside the instance with fewer connections active. 
```
└── {instanceId}
    ├── connectionsCount        <- Number of connections active
    └── region                  <- The region of the instance (used to create the connection url)
```
If you want to increase the scalability adding an instance:
* create a new real time instance in the GCP
* add a new document in this collection specifying id (instance-x) and the region, initializing connectionsCount to zero
* redeploy the functions that will be dynamically added to the newly created instance

#### Validation and permissions
No one can read or write on this collection from the user perspective

#### Triggers
No triggers on the rtdbInstances

### users

This collection contains all the signed-up users info.
```
└── {userId}
    ├── createdAt           <- Creation timestpam
    ├── devOpsMaturity      <- Maturity select at signup
    ├── email               <- User email
    ├── firstName           <- First name
    ├── lastName            <- Last name
    └── role                <- Role selected at signup
```
#### Validation and permissions
A user can access its document but not the others.

A user can create its document if
* email is equal to the email in the jwt
* firstName is a string less than 100 char long 
* lastName is a string less than 100 char long 
* the provided role is contained into the corresponding document in dynamic data
* the provided maturity is contained into the corresponding document in dynamic data
* createdAt is the server timestamp

#### Triggers
No triggers on the users
