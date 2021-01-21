export const PROJECT_ID = JSON.parse(process.env.FIREBASE_CONFIG!).projectId;

export const getRTDBInstanceName = (num: number) => {
  return `${PROJECT_ID}-${num}-rtdb`
};
