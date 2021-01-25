import * as admin from "firebase-admin";

admin.initializeApp();

if (!process.env.FUNCTION_NAME || process.env.FUNCTION_NAME === 'onOnlineGameStatusUpdate') {
  exports.onOnlineGameStatusUpdate = require('./load-balancing/onOnlineGameStatusUpdate').onOnlineGameStatusUpdate;
}

if (!process.env.FUNCTION_NAME || process.env.FUNCTION_NAME === 'selectBestRTDBInstance') {
  exports.selectBestRTDBInstance = require('./load-balancing/selectBestRTDBInstance').selectBestRTDBInstance;
}

