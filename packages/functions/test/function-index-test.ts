import * as functions from "firebase-functions";
import {handler as updateHandler} from "../src/load-balancing/onConnectionUpdate";
import {handler as createHandler} from "../src/load-balancing/onConnectionCreate";
import {handler as deleteHandler} from "../src/load-balancing/onConnectionDelete";
import {selectBestRTDBInstance} from "../src/load-balancing/selectBestRTDBInstance";
import {RTDBPaths} from "@pipeline/common";
import rtdbInstances from "../src/rtdbInstances";
import {moveGamesJob} from "../src/load-balancing/scheduledMoveGame";


const onConnectionsUpdate = functions.database.instance(rtdbInstances[0].name)
  .ref(`/${RTDBPaths.Connections}/{gameId}/{userId}`)
  .onUpdate((change, context) => updateHandler(change, context, rtdbInstances[0].id))

const onConnectionsCreate = functions.database.instance(rtdbInstances[0].name)
  .ref(`/${RTDBPaths.Connections}/{gameId}/{userId}`)
  .onCreate((data, context) => createHandler(data, context, rtdbInstances[0].id))

const onConnectionsDelete = functions.database.instance(rtdbInstances[0].name)
  .ref(`/${RTDBPaths.Connections}/{gameId}/{userId}`)
  .onDelete((data, context) => deleteHandler(data, context, rtdbInstances[0].id, rtdbInstances[0].url))

const scheduledMoveGame = moveGamesJob

export {
  onConnectionsUpdate,
  onConnectionsCreate,
  onConnectionsDelete,
  selectBestRTDBInstance,
  scheduledMoveGame,
}


