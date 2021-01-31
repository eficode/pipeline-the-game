import { getFunctions, httpsCallable } from 'firebase/functions';
import { getApp } from 'firebase/app';

export default async function selectBestRTDBInstance(gameId?: string): Promise<string> {
  const functions = getFunctions(getApp() as any, 'europe-west1');
  const selectBestRTDBInstance = httpsCallable(functions, 'selectBestRTDBInstance');
  const res = await selectBestRTDBInstance({ gameId });
  return res.data.bestRTDBInstanceName;
}
