import * as admin from 'firebase-admin';

import fs from 'fs';
import readline from 'readline';

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
