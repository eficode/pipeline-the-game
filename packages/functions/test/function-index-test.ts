import * as admin from "firebase-admin";
admin.initializeApp();

import * as functions from "firebase-functions";
import {handler} from "../src/load-balancing/onOnlineGameStatusUpdate";
import {selectBestRTDBInstance} from "../src/load-balancing/selectBestRTDBInstance";
import {RTDBPaths} from "@pipeline/common";
import rtdbInstances from "../src/rtdbInstances";


const onOnlineGameStatusUpdate = functions.database.instance(rtdbInstances[0].name)
  .ref(`/${RTDBPaths.Connections}/{gameId}/{userId}`)
  .onUpdate((change, context) => handler(change, context, rtdbInstances[0].id))

export {
  onOnlineGameStatusUpdate,
  selectBestRTDBInstance,
}


