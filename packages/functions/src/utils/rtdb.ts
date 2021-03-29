import * as admin from "firebase-admin";

export const PROJECT_ID = JSON.parse(process.env.FIREBASE_CONFIG!).projectId;

/**
 * Returns the database management object given the url.
 *
 * @param url the database complete url
 */
export function getDatabase( url: string): admin.database.Database {
  const app = admin.apps.find(a => a?.name === url);

  if (app) {
    return app.database();
  } else {
    return admin.initializeApp({
      databaseURL: url,
    }, url).database();
  }

}
