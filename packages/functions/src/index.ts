import * as admin from "firebase-admin";
import {exportEverythingFrom} from "./utils/exportFunctionsOnAllRTDBInstances";

admin.initializeApp();

const functionName = process.env.FUNCTION_NAME;

if (!functionName || functionName.startsWith('onOnlineGameStatusCreate')) {
  exportEverythingFrom(exports, require('./load-balancing/onOnlineGameStatusCreate'))
}

if (!functionName || functionName.startsWith('onOnlineGameStatusDelete')) {
  exportEverythingFrom(exports, require('./load-balancing/onOnlineGameStatusDelete'))
}

if (!functionName || functionName.startsWith('onOnlineGameStatusUpdate')) {
  exportEverythingFrom(exports, require('./load-balancing/onOnlineGameStatusUpdate'))
}

if (!process.env.FUNCTION_NAME || process.env.FUNCTION_NAME === 'selectBestRTDBInstance') {
  exports.selectBestRTDBInstance = require('./load-balancing/selectBestRTDBInstance').selectBestRTDBInstance;
}

