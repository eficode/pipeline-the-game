import * as admin from "firebase-admin";

export const PROJECT_ID = JSON.parse(process.env.FIREBASE_CONFIG!).projectId;


export function getAppForDB(dbId: string, url: string) {
  const app = admin.apps.find(a => a?.name === dbId);

  if (app) {
    return app;
  } else {
    return admin.initializeApp({
      databaseURL: url,
    }, dbId);
  }

}
