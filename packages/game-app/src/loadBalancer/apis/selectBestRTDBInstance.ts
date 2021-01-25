import axios from 'axios';
import CONFIG from '@pipeline/app-config';
import firebase from 'firebase';

export default async function selectBestRTDBInstance(gameId: string): Promise<string> {
  const token = await firebase.auth().currentUser?.getIdToken();
  const res = await axios.get(`${CONFIG.REACT_APP_FUNCTIONS_BASE_URL}selectBestRTDBInstance?gameId=${gameId}`, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
  return res.data.bestRTDBInstanceName;
}
