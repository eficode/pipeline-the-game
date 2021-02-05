import * as admin from "firebase-admin";

export const PROJECT_ID = JSON.parse(process.env.FIREBASE_CONFIG!).projectId;


export function getDatabase( url: string) {
  const app = admin.apps.find(a => a?.name === url);

  if (app) {
    return app.database();
  } else {
    return admin.initializeApp({
      databaseURL: url,
    }, url).database();
  }

}
