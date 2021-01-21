import axios from 'axios';

export default async function selectBestRTDBInstance(gameId: string): Promise<string> {
  const res = await axios.get(`url?gameId=${gameId}`);
  return res.data.bestRTDBInstanceId;
}
