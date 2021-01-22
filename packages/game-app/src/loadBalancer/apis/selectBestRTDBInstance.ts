import axios from 'axios';
import CONFIG from '@pipeline/app-config';

export default async function selectBestRTDBInstance(gameId: string, token: string): Promise<string> {
  const res = await axios.get(`${CONFIG.REACT_APP_BASE_URL}/selectBestRTDBInstance?gameId=${gameId}`, {
    headers: {
      'Authorization:': `Bearer ${token}`,
    },
  });
  return res.data.bestRTDBInstanceId;
}
