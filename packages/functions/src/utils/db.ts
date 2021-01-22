import * as admin from 'firebase-admin';
import {Transaction} from '@google-cloud/firestore';

const wait = (ms: number) => { return new Promise(resolve => setTimeout(resolve, ms))};

function getRandomArbitrary(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

const runTransactionWithRetryHelper = async (db: admin.firestore.Firestore, updateFunction: (transaction: Transaction) => Promise<any>, retry = 0, maxRetries = 20, maxWaitMs = 3000): Promise<any> => {
  let retryCount = retry;
  try {
    await db.runTransaction(updateFunction);
    return null
  } catch (e) {
    console.log(e);
    if (e.code === 10) {
      console.log(`Transaction abort error! Running it again: #${retry} retries.`);
      if (retry < maxRetries) {
        await wait(getRandomArbitrary(0, maxWaitMs));
        return runTransactionWithRetryHelper(db, updateFunction, ++retryCount)
      } else {
        return null;
      }
    } else {
      return null;
    }
  }
};

export const runTransactionWithRetry = async (db: admin.firestore.Firestore, updateFunction: (transaction: Transaction) => Promise<any>, maxRetries = 20, maxWaitMs = 3000) => {
  await runTransactionWithRetryHelper(db, updateFunction, 0, maxRetries, maxWaitMs);
};