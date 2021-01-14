import * as admin from 'firebase-admin';

import fs from 'fs';
import readline from 'readline';
import {WhereFilterOp, Query} from '@google-cloud/firestore';

export async function getFirebaseUserByEmail(adminInstance: admin.app.App, {email}: { email: string }): Promise<admin.auth.UserRecord> {
  return adminInstance.auth().getUserByEmail(email.toLocaleLowerCase());
}

export async function getFirestoreDocument<T>(adminInstance: admin.app.App, {path}: { path: string }): Promise<T> {

  const doc = await adminInstance.firestore().doc(path).get();

  return doc.data() as T;
}

/**
 * Retrieves verification email link from emulator logs
 */
export async function getEmailVerificationLink(adminInstance: admin.app.App, {email}: { email: string }) {

  const stringToSearch = `To verify the email address ${email}, follow this link:`;

  const rl = readline.createInterface({
    input: fs.createReadStream('../../firebase-debug.log'),
    crlfDelay: Infinity
  });

  let link = ''

  for await (const line of rl) {
    if (line.indexOf(stringToSearch) !== -1) {
      const index = line.indexOf(stringToSearch);
      link = line.substr(index).replace(stringToSearch, '').trim().split(' ')[0];
    }
  }

  if (link) {
    return link
  } else {
    throw new Error(`email verification link for ${email} not found`);
  }

}

/**
 * Create a user both in auth and firestore and return the user object
 */
export async function initializeUser(adminInstance: admin.app.App, {
  email,
  password,
  emailVerified
}: { email?: string; password?: string; emailVerified?: boolean; }) {
  const randomEmail = `testEmail${Math.floor(Math.random() * 10000)}@email.com`.toLocaleLowerCase();

  const user = await adminInstance.auth().createUser({
    email: email || randomEmail,
    emailVerified: !!emailVerified,
    password: password || 'Aa1sfesfsf'
  });

  await adminInstance.firestore().doc(`users/${user.uid}`).set({
    email: email || randomEmail,
    role: 'endUser',
    devOpsMaturity: 'veryImmature'
  })

  return user;
}


export async function queryFirestore(adminInstance: admin.app.App, {
  collection,
  data
}: { collection: string; data?: { field: string; condition: WhereFilterOp; value: any; } }) {

  let query: Query = admin.firestore().collection(collection);
  if (data) {
    query = query.where(data.field, data.condition, data.value);
  }
  return query.get().then(res => res.docs.map(d => ({id: d.id, ...d.data()})));
}
