import * as admin from 'firebase-admin';

import fs from 'fs';
import readline from 'readline';
import {WhereFilterOp, Query} from '@google-cloud/firestore';
import {CardEntity, CardType, DEFAULT_BOARD_DIMENSIONS, FirebaseCollection} from "@pipeline/common";
import {Game} from "../../../firestore/models/Game";

export async function getFirebaseUserByEmail(adminInstance: admin.app.App, {email}: { email: string }): Promise<admin.auth.UserRecord> {
  return adminInstance.auth().getUserByEmail(email.toLocaleLowerCase());
}

export async function getFirestoreDocument<T>(adminInstance: admin.app.App, {path}: { path: string }): Promise<T> {

  const doc = await adminInstance.firestore().doc(path).get();

  return doc.data() as T;
}

async function searchLinkInLogs(stringToSearch: string, email: string) {
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
 * Retrieves verification email link from emulator logs
 */
export async function getEmailVerificationLink(adminInstance: admin.app.App, {email}: { email: string }) {

  const stringToSearch = `To verify the email address ${email}, follow this link:`;

  return searchLinkInLogs(stringToSearch, email);
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
    firstName: 'John',
    lastName: 'Doe',
    email: email || randomEmail,
    role: 'endUser',
    devOpsMaturity: 'veryImmature',
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
  })

  return user;
}


/**
 * Generic firestore query on a specific collection.
 *
 * If data are passed you can also specify a where clause that will be applied on the
 * collection query.
 */
export async function queryFirestore(adminInstance: admin.app.App, {
  collection,
  data
}: { collection: string; data?: { field: string; condition: WhereFilterOp; value: any; } }) {

  let query: Query = adminInstance.firestore().collection(collection);
  if (data) {
    query = query.where(data.field, data.condition, data.value);
  }
  return query.get().then(res => res.docs.map(d => ({id: d.id, ...d.data()})));
}

const DEFAULT_DECK_ID = '7p5qqvE8kCV9WWysVc2n';

/**
 * Initialize a random new game into firestore
 */
export async function initializeGame(adminInstance: admin.app.App, {
  facilitatorId
}: { facilitatorId?: string; }) {

  const scenarioCardsDocs = await adminInstance.firestore().collection(FirebaseCollection.Cards)
    .where('deckId', '==', DEFAULT_DECK_ID)
    .where('type', '==', CardType.Scenario)
    .get();

  const scenarioCards = scenarioCardsDocs.docs.map(d => ({id: d.id, ...d.data()}));

  const scenario = scenarioCards[Math.floor(Math.random() * scenarioCards.length)] as CardEntity;

  const newGame: Game = {
    scenarioContent: scenario.content,
    scenarioTitle: scenario.title,
    scenarioCardId: scenario.id,
    facilitator: {
      id: facilitatorId!,
    },
    review: false,
    boardDimensions: DEFAULT_BOARD_DIMENSIONS,
    rtdbInstance: null,
    cards: null,
    deckId: DEFAULT_DECK_ID,
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
  }

  const gameRef = await adminInstance.firestore().collection(FirebaseCollection.Games)
    .add(newGame)

  const savedGameData = await gameRef.get();

  return {
    id: savedGameData.id,
    ...savedGameData.data()
  };
}

/**
 * Retrieves the link to reset the password in the logs
 */
export async function getRestPasswordLink(adminInstance: admin.app.App, {email}: { email: string }) {

  const stringToSearch = `To reset the password for ${email}, follow this link:`;

  return searchLinkInLogs(stringToSearch, email);
}
