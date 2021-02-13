import * as admin from "firebase-admin";
import {exportEverythingFrom} from "./utils/exportFunctionsOnAllRTDBInstances";

admin.initializeApp();

const functionName = process.env.FUNCTION_NAME;

if (!functionName || functionName.startsWith('onConnectionCreate')) {
  exportEverythingFrom(exports, require('./load-balancing/onConnectionCreate'))
}

if (!functionName || functionName.startsWith('onConnectionDelete')) {
  exportEverythingFrom(exports, require('./load-balancing/onConnectionDelete'))
}

if (!functionName || functionName.startsWith('onConnectionUpdate')) {
  exportEverythingFrom(exports, require('./load-balancing/onConnectionUpdate'))
}

if (!process.env.FUNCTION_NAME || process.env.FUNCTION_NAME === 'selectBestRTDBInstance') {
  exports.selectBestRTDBInstance = require('./load-balancing/selectBestRTDBInstance').selectBestRTDBInstance;
}

if (!process.env.FUNCTION_NAME || process.env.FUNCTION_NAME === 'scheduledMoveGamesJob') {
  exports.scheduledMoveGamesJob = require('./load-balancing/scheduledMoveGame').scheduledMoveGamesJob;
}

