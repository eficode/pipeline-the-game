import * as admin from 'firebase-admin';

export async function getFirebaseUserByEmail(adminInstance: admin.app.App, {email}: { email: string }): Promise<admin.auth.UserRecord> {
  return adminInstance.auth().getUserByEmail(email.toLocaleLowerCase());
}

export async function getFirestoreDocument<T>(adminInstance: admin.app.App, {path}: { path: string }): Promise<T> {

  const doc = await adminInstance.firestore().doc(path).get();

  return doc.data() as T;
}
