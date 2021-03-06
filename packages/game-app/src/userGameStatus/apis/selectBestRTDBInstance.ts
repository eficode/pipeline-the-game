import firebase from 'firebase/app';
import 'firebase/functions';

export default async function selectBestRTDBInstance(gameId?: string): Promise<string> {
  const functions = firebase.app().functions('europe-west1');
  const selectBestRTDBInstance = functions.httpsCallable('selectBestRTDBInstance');
  const res = await selectBestRTDBInstance({ gameId });
  return res.data.bestRTDBInstanceName;
}
