import * as admin from "firebase-admin";

export const PROJECT_ID = JSON.parse(process.env.FIREBASE_CONFIG!).projectId;


export function getDatabase(url: string) {
  return admin.app().database(url);
}
