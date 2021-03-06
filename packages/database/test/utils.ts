import * as fs from "fs";
import * as firebase from "@firebase/rules-unit-testing";
import {DEFAULT_BOARD_DIMENSIONS, RTDBPaths} from "@pipeline/common";


const rules = fs.readFileSync("database.rules.json", "utf8");
export const DATABASE = 'database';

type Database = ReturnType<typeof firebase.database>;

/**
 * Create a test instance of firebase adding initial data
 * @param projectId
 * @param adminDatabase
 */
export async function reinitializeDatabase(projectId: string, adminDatabase: Database) {
  try {
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

export async function createConnection(gameId: string, userId: string, adminDatabase: Database) {
  const connectionRef = adminDatabase.ref(`/${RTDBPaths.Connections}/${gameId}/${userId}`).push();
  await connectionRef.set({updatedAt: firebase.database.ServerValue.TIMESTAMP});
}

export async function createGame(gameId: string, adminDatabase: Database) {
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
