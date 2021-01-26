import * as admin from "firebase-admin";
admin.initializeApp();

import { onOnlineGameStatusUpdate } from "../src/load-balancing/onOnlineGameStatusUpdate";
import { selectBestRTDBInstance } from "../src/load-balancing/selectBestRTDBInstance";


export {
  onOnlineGameStatusUpdate,
  selectBestRTDBInstance,
}


