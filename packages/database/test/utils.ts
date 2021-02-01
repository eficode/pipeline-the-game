import * as fs from "fs";
import * as firebase from "@firebase/rules-unit-testing";
import fb from "firebase";
import {DEFAULT_BOARD_DIMENSIONS, RTDBPaths} from "@pipeline/common";

const rules = fs.readFileSync("database.rules.json", "utf8");
const DATABASE = 'database';

let adminDatabase: fb.database.Database;

/**
 * Create a test instance of firebase adding initial data
 * @param projectId
 */
export async function reinitializeDatabase(projectId: string) {
  try {
    const adminApp = firebase.initializeAdminApp({ databaseName: DATABASE });
    adminDatabase = adminApp.database();
    await adminDatabase.ref().set(null);
    await firebase.loadDatabaseRules({databaseName: DATABASE, rules});
  } catch (e) {
    console.error(e);
  }
}

type Auth = Parameters<typeof firebase.initializeTestApp>[0]['auth'];

/**
 * Creates a new client FirebaseApp with authentication and returns the Database instance.
 */
export function getAuthedDatabase(projectId: string, auth: Auth) {
  return firebase.initializeTestApp({ projectId, databaseName: DATABASE, auth }).database();
}

export function getAdminDatabase() {
  return adminDatabase;
}

export async function createConnection(gameId: string, userId: string) {
  const connectionRef = adminDatabase.ref(`/${RTDBPaths.Connections}/${gameId}/${userId}`).push();
  await connectionRef.set({updatedAt: fb.database.ServerValue.TIMESTAMP});
}

export async function createGame(gameId: string) {
  await adminDatabase.ref(`/${RTDBPaths.Games}/${gameId}`).set({
    scenarioTitle: 'Title',
    scenarioContent: 'Content',
    scenarioCardId: null,
    facilitator: {
      id: 'randomId'
    },
    createdAt: 535435345,
    deckId: '7p5qqvE8kCV9WWysVc2n',
    review: false,
    boardDimensions: DEFAULT_BOARD_DIMENSIONS
  });
}
