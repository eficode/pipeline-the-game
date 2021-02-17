import * as functions from "firebase-functions";
import {handler} from "../src/load-balancing/onConnectionUpdate";
import {selectBestRTDBInstance} from "../src/load-balancing/selectBestRTDBInstance";
import {RTDBPaths} from "@pipeline/common";
import rtdbInstances from "../src/rtdbInstances";


const onConnectionsUpdate = functions.database.instance(rtdbInstances[0].name)
  .ref(`/${RTDBPaths.Connections}/{gameId}/{userId}`)
  .onUpdate((change, context) => handler(change, context, rtdbInstances[0].id))

export {
  onConnectionsUpdate,
  selectBestRTDBInstance,
}


