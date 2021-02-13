
# Functions package
Cloud Functions package together with related tests.

The functions on the real time database must be deployed on all instances.
In the pre-deploy script the instances are listed, and a file containing 
the array is generated, it is used to deploy a replica of the function 
in all the instances available.


## :telephone_receiver: Callable functions

### selectBestRTDBInstance 

This function must be invoked before starting playing for the first time or after a 
given amount of inactivity. It selects the best rtdb instance to assign to the provided 
game, and it returns the selected instance name, in which the game is copied
for the users to play in real time

#### params 
* gameId

#### returns
* bestRTDBInstanceName

## :hammer_and_pick: Triggers on Real Time Database

### onConnectionCreate

Update the number of connections active on the given rtdb and resets 
the last lastPlayerDisconnectedAt to null

#### trigger
On create of a document under `/connections/{gameId}/{userId}`.

### onConnectionDelete

The user completely disconnected, the connections of the rtdb are updated.
If there is any card locked by the user, they are unlocked.
If the user was the last remained the lastPlayerDisconnectedAt is updated

#### trigger
On delete of a document under `/connections/{gameId}/{userId}`.


### onConnectionUpdate

Update the number of connections active on the given rtdb based on the difference
of the number of connections before and after the update.

#### trigger
On update of a document under `/connections/{gameId}/{userId}`.

## :timer_clock: Scheduled jobs

### scheduledMoveGamesJob

If there are games stale for more than one day (lastPlayerDisconnectedAt < now - 24h) they are moved
back to Firestore unlocking all cards and standardizing zIndex. The movedAt is updated, and 
the rtdbInstance is reset to null.

#### Timer
every 60 minutes



