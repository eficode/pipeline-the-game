import * as firebase from "@firebase/rules-unit-testing";
import {
  createConnection,
  createGame, DATABASE,
  getAuthedDatabase,
  reinitializeDatabase
} from "./utils";
import {DEFAULT_BOARD_DIMENSIONS, RTDBPaths} from "@pipeline/common";

const PROJECT_ID = "database-emulator-example-" + Math.floor(Math.random() * 1000);

const COVERAGE_URL = `http://${process.env.FIREBASE_DATABASE_EMULATOR_HOST}/emulator/v1/projects/${PROJECT_ID}:ruleCoverage.html`;

const GAME_ID = 'randomGameId';
const CARD_ID = 'randomCardId';

type Database = ReturnType<typeof firebase.database>;
let adminDatabase: Database;
let adminApp: ReturnType<typeof firebase.initializeAdminApp>;

before(async () => {
  adminApp = firebase.initializeAdminApp({databaseName: DATABASE, projectId: PROJECT_ID});
  adminDatabase = adminApp.database();
});

beforeEach(async () => {
  await reinitializeDatabase(PROJECT_ID, adminDatabase);
});

after(async () => {
  try {
    await Promise.all(firebase.apps().map((app) => app.delete()));
    await adminApp.delete();
  } catch (e) {
    console.error(e);
  }
  console.log(`View database rule coverage information at ${COVERAGE_URL}\n`);
});

describe("Cards write", () => {

  it("should not allow card write if not authenticated but game exists and with a valid payload", async () => {
    await adminDatabase.ref(`/${RTDBPaths.Games}/${GAME_ID}`).set({
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
    const db = getAuthedDatabase(PROJECT_ID, undefined);
    await firebase.assertFails(db.ref(`/${RTDBPaths.Cards}/${GAME_ID}/${CARD_ID}`).update({
      estimation: 'any string'
    }));
  });

  it("should not allow card write if authenticated but game not exists and with a valid payload", async () => {
    const userUID = 'id1';
    const email = 'test@email.com';
    const db = getAuthedDatabase(PROJECT_ID, {uid: userUID, email, email_verified: true});
    await firebase.assertFails(db.ref(`/${RTDBPaths.Cards}/${GAME_ID}/${CARD_ID}`).update({
      estimation: 'any string'
    }));
  });

  it("should not allow estimation card write if authenticated, game exists, connected but card not placed", async () => {
    const userUID = 'id1';
    const email = 'test@email.com';
    await createGame(GAME_ID, adminDatabase);
    await createConnection(GAME_ID, userUID, adminDatabase);
    const db = getAuthedDatabase(PROJECT_ID, {uid: userUID, email, email_verified: true});
    await firebase.assertFails(db.ref(`/${RTDBPaths.Cards}/${GAME_ID}/${CARD_ID}`).update({
      estimation: 'any string'
    }));
  });

  it("should allow estimation card update if authenticated, game exists, connected and card placed", async () => {
    const userUID = 'id1';
    const email = 'test@email.com';
    await createGame(GAME_ID, adminDatabase);
    await createConnection(GAME_ID, userUID, adminDatabase);
    await adminDatabase.ref(`/${RTDBPaths.Cards}/${GAME_ID}/${CARD_ID}`).set({
      position: {
        x: 0,
        y: 0
      },
      parent: 'board'
    });
    const db = getAuthedDatabase(PROJECT_ID, {uid: userUID, email, email_verified: true});
    await firebase.assertSucceeds(db.ref(`/${RTDBPaths.Cards}/${GAME_ID}/${CARD_ID}`).update({
      estimation: 'any string'
    }));
  });

  it("should not allow estimation card update if authenticated, game exists, connected and with a valid payload but in panel", async () => {
    const userUID = 'id1';
    const email = 'test@email.com';
    await createGame(GAME_ID, adminDatabase);
    await createConnection(GAME_ID, userUID, adminDatabase);
    await adminDatabase.ref(`/${RTDBPaths.Cards}/${GAME_ID}/${CARD_ID}`).set({
      parent: 'panel'
    });
    const db = getAuthedDatabase(PROJECT_ID, {uid: userUID, email, email_verified: true});
    await firebase.assertFails(db.ref(`/${RTDBPaths.Cards}/${GAME_ID}/${CARD_ID}`).update({
      estimation: 'any string'
    }));
  });

  it("should not allow card write if authenticated, game exists, connected and with an invalid parent", async () => {
    const userUID = 'id1';
    const email = 'test@email.com';
    await createGame(GAME_ID, adminDatabase);
    await createConnection(GAME_ID, userUID, adminDatabase);
    const db = getAuthedDatabase(PROJECT_ID, {uid: userUID, email, email_verified: true});
    await firebase.assertFails(db.ref(`/${RTDBPaths.Cards}/${GAME_ID}/${CARD_ID}`).update({
      parent: 'any string'
    }));
  });

  it("should not allow card write if authenticated, game exists, connected and with parent == board without specifying card position", async () => {
    const userUID = 'id1';
    const email = 'test@email.com';
    await createGame(GAME_ID, adminDatabase);
    await createConnection(GAME_ID, userUID, adminDatabase);
    const db = getAuthedDatabase(PROJECT_ID, {uid: userUID, email, email_verified: true});
    await firebase.assertFails(db.ref(`/${RTDBPaths.Cards}/${GAME_ID}/${CARD_ID}`).update({
      parent: 'board'
    }));
  });

  it("should not allow card write if authenticated, game exists, connected and with parent == board and specifying valid card position but without lockedBy", async () => {
    const userUID = 'id1';
    const email = 'test@email.com';
    await createGame(GAME_ID, adminDatabase);
    await createConnection(GAME_ID, userUID, adminDatabase);
    const db = getAuthedDatabase(PROJECT_ID, {uid: userUID, email, email_verified: true});
    await firebase.assertFails(db.ref(`/${RTDBPaths.Cards}/${GAME_ID}/${CARD_ID}`).update({
      parent: 'board',
      position: {
        x: 0,
        y: 0
      }
    }));
  });

  it("should not allow card write if authenticated, game exists, connected and with parent == board, specifying valid card position but with uncorrect lockedBy", async () => {
    const userUID = 'id1';
    const email = 'test@email.com';
    await createGame(GAME_ID, adminDatabase);
    await createConnection(GAME_ID, userUID, adminDatabase);
    const db = getAuthedDatabase(PROJECT_ID, {uid: userUID, email, email_verified: true});
    await firebase.assertFails(db.ref(`/${RTDBPaths.Cards}/${GAME_ID}/${CARD_ID}`).update({
      parent: 'board',
      position: {
        x: 0,
        y: 0
      },
      lockedBy: 'someIdLocking'
    }));
  });

  it("should allow card write if authenticated, game exists, connected and with parent == board and specifying valid card position and with correct lockedBy and zIndex", async () => {
    const userUID = 'id1';
    const email = 'test@email.com';
    await createGame(GAME_ID, adminDatabase);
    await createConnection(GAME_ID, userUID, adminDatabase);
    const db = getAuthedDatabase(PROJECT_ID, {uid: userUID, email, email_verified: true});
    await firebase.assertSucceeds(db.ref(`/${RTDBPaths.Cards}/${GAME_ID}/${CARD_ID}`).update({
      parent: 'board',
      position: {
        x: 0,
        y: 0
      },
      lockedBy: userUID,
      zIndex: 0,
    }));
  });

  it("should allow card write if authenticated, game exists, connected and with parent == board and specifying valid card position, with correct lockedBy and valid zIndex", async () => {
    const userUID = 'id1';
    const email = 'test@email.com';
    await createGame(GAME_ID, adminDatabase);
    await createConnection(GAME_ID, userUID, adminDatabase);
    const db = getAuthedDatabase(PROJECT_ID, {uid: userUID, email, email_verified: true});
    await firebase.assertSucceeds(db.ref(`/${RTDBPaths.Cards}/${GAME_ID}/${CARD_ID}`).update({
      parent: 'board',
      position: {
        x: 0,
        y: 0
      },
      lockedBy: userUID,
      zIndex: 50
    }));
  });

  it("should not allow card write if authenticated, game exists, connected and with parent == board but specifying invalid card position", async () => {
    const userUID = 'id1';
    const email = 'test@email.com';
    await createGame(GAME_ID, adminDatabase);
    await createConnection(GAME_ID, userUID, adminDatabase);
    const db = getAuthedDatabase(PROJECT_ID, {uid: userUID, email, email_verified: true});
    await firebase.assertFails(db.ref(`/${RTDBPaths.Cards}/${GAME_ID}/${CARD_ID}`).update({
      parent: 'board',
      position: {
        x: DEFAULT_BOARD_DIMENSIONS.x + 1,
        y: DEFAULT_BOARD_DIMENSIONS.y + 1,
      }
    }));
  });

  it("should not allow card write if authenticated, game exists, connected and with parent == panel and specifying valid card position", async () => {
    const userUID = 'id1';
    const email = 'test@email.com';
    await createGame(GAME_ID, adminDatabase);
    await createConnection(GAME_ID, userUID, adminDatabase);
    const db = getAuthedDatabase(PROJECT_ID, {uid: userUID, email, email_verified: true});
    await firebase.assertFails(db.ref(`/${RTDBPaths.Cards}/${GAME_ID}/${CARD_ID}`).update({
      parent: 'panel',
      position: {
        x: 0,
        y: 0,
      }
    }));
  });

  it("should not allow card write if authenticated, game exists, connected and with parent == panel and specifying valid card zIndex", async () => {
    const userUID = 'id1';
    const email = 'test@email.com';
    await createGame(GAME_ID, adminDatabase);
    await createConnection(GAME_ID, userUID, adminDatabase);
    const db = getAuthedDatabase(PROJECT_ID, {uid: userUID, email, email_verified: true});
    await firebase.assertFails(db.ref(`/${RTDBPaths.Cards}/${GAME_ID}/${CARD_ID}`).update({
      parent: 'panel',
      zIndex: 0
    }));
  });

  it("should not allow card write if authenticated, game exists, connected and with parent == panel and specifying valid card position and zIndex", async () => {
    const userUID = 'id1';
    const email = 'test@email.com';
    await createGame(GAME_ID, adminDatabase);
    await createConnection(GAME_ID, userUID, adminDatabase);
    const db = getAuthedDatabase(PROJECT_ID, {uid: userUID, email, email_verified: true});
    await firebase.assertFails(db.ref(`/${RTDBPaths.Cards}/${GAME_ID}/${CARD_ID}`).update({
      parent: 'panel',
      position: {
        x: 0,
        y: 0,
      },
      zIndex: 0
    }));
  });

  it("should allow card write if authenticated, game exists, connected and with parent == panel and specifying null card position and valid lockedBy", async () => {
    const userUID = 'id1';
    const email = 'test@email.com';
    await createGame(GAME_ID, adminDatabase);
    await createConnection(GAME_ID, userUID, adminDatabase);
    const db = getAuthedDatabase(PROJECT_ID, {uid: userUID, email, email_verified: true});
    await firebase.assertSucceeds(db.ref(`/${RTDBPaths.Cards}/${GAME_ID}/${CARD_ID}`).update({
      parent: 'panel',
      position: null,
      lockedBy: userUID
    }));
  });

  it("should not allow card write if authenticated, game exists, connected and with parent == panel and specifying null card position but locked by someone else", async () => {
    const userUID = 'id1';
    const email = 'test@email.com';
    await createGame(GAME_ID, adminDatabase);
    await createConnection(GAME_ID, userUID, adminDatabase);
    const db = getAuthedDatabase(PROJECT_ID, {uid: userUID, email, email_verified: true});
    await firebase.assertFails(db.ref(`/${RTDBPaths.Cards}/${GAME_ID}/${CARD_ID}`).update({
      parent: 'panel',
      position: null,
      lockedBy: 'someoneElseId'
    }));
  });

  it("should not allow card write if authenticated, game exists, connected but estimation is a number", async () => {
    const userUID = 'id1';
    const email = 'test@email.com';
    await createGame(GAME_ID, adminDatabase);
    await createConnection(GAME_ID, userUID, adminDatabase);
    const db = getAuthedDatabase(PROJECT_ID, {uid: userUID, email, email_verified: true});
    await firebase.assertFails(db.ref(`/${RTDBPaths.Cards}/${GAME_ID}/${CARD_ID}`).update({
      estimation: 24
    }));
  });

  it("should allow card write if authenticated, game exists, connected and lockedBy me", async () => {
    const userUID = 'id1';
    const email = 'test@email.com';
    await createGame(GAME_ID, adminDatabase);
    await createConnection(GAME_ID, userUID, adminDatabase);
    const db = getAuthedDatabase(PROJECT_ID, {uid: userUID, email, email_verified: true});
    await firebase.assertSucceeds(db.ref(`/${RTDBPaths.Cards}/${GAME_ID}/${CARD_ID}`).update({
      lockedBy: userUID
    }));
  });

  it("should not allow card write if authenticated, game exists, connected and try to lock with someone else id", async () => {
    const userUID = 'id1';
    const email = 'test@email.com';
    await createGame(GAME_ID, adminDatabase);
    await createConnection(GAME_ID, userUID, adminDatabase);
    const db = getAuthedDatabase(PROJECT_ID, {uid: userUID, email, email_verified: true});
    await firebase.assertFails(db.ref(`/${RTDBPaths.Cards}/${GAME_ID}/${CARD_ID}`).update({
      lockedBy: 'someoneElseId'
    }));
  });

  it("should not allow lockedBy overwrite if authenticated, game exists, connected and lockedBy by someone else", async () => {
    const userUID = 'id1';
    const email = 'test@email.com';
    await createGame(GAME_ID, adminDatabase);
    await createConnection(GAME_ID, userUID, adminDatabase);
    await adminDatabase.ref(`/${RTDBPaths.Cards}/${GAME_ID}/${CARD_ID}`).update({
      lockedBy: 'someoneElseId'
    });
    const db = getAuthedDatabase(PROJECT_ID, {uid: userUID, email, email_verified: true});
    await firebase.assertFails(db.ref(`/${RTDBPaths.Cards}/${GAME_ID}/${CARD_ID}`).update({
      lockedBy: userUID
    }));
  });

  it("should not allow position card write overwrite if authenticated, game exists, connected and lockedBy by someone else", async () => {
    const userUID = 'id1';
    const email = 'test@email.com';
    await createGame(GAME_ID, adminDatabase);
    await createConnection(GAME_ID, userUID, adminDatabase);
    await adminDatabase.ref(`/${RTDBPaths.Cards}/${GAME_ID}/${CARD_ID}`).update({
      lockedBy: 'someoneElseId'
    });
    const db = getAuthedDatabase(PROJECT_ID, {uid: userUID, email, email_verified: true});
    await firebase.assertFails(db.ref(`/${RTDBPaths.Cards}/${GAME_ID}/${CARD_ID}`).update({
      position: {
        x: 0,
        y: 0,
      }
    }));
  });

  it("should not allow parent card write overwrite if authenticated, game exists, connected and lockedBy by someone else", async () => {
    const userUID = 'id1';
    const email = 'test@email.com';
    await createGame(GAME_ID, adminDatabase);
    await createConnection(GAME_ID, userUID, adminDatabase);
    await adminDatabase.ref(`/${RTDBPaths.Cards}/${GAME_ID}/${CARD_ID}`).update({
      lockedBy: 'someoneElseId'
    });
    const db = getAuthedDatabase(PROJECT_ID, {uid: userUID, email, email_verified: true});
    await firebase.assertFails(db.ref(`/${RTDBPaths.Cards}/${GAME_ID}/${CARD_ID}`).update({
      parent: 'board'
    }));
  });

  it("should not allow estimation card write write if authenticated, game exists, connected and lockedBy by someone else", async () => {
    const userUID = 'id1';
    const email = 'test@email.com';
    await createGame(GAME_ID, adminDatabase);
    await createConnection(GAME_ID, userUID, adminDatabase);
    await adminDatabase.ref(`/${RTDBPaths.Cards}/${GAME_ID}/${CARD_ID}`).update({
      lockedBy: 'someoneElseId'
    });
    const db = getAuthedDatabase(PROJECT_ID, {uid: userUID, email, email_verified: true});
    await firebase.assertFails(db.ref(`/${RTDBPaths.Cards}/${GAME_ID}/${CARD_ID}`).update({
      estimation: '2h'
    }));
  });

  it("should not update card position if authenticated, game exists, connected and the card was not locked by me", async () => {
    const userUID = 'id1';
    const email = 'test@email.com';
    await createGame(GAME_ID, adminDatabase);
    await createConnection(GAME_ID, userUID, adminDatabase);
    const db = getAuthedDatabase(PROJECT_ID, {uid: userUID, email, email_verified: true});
    await firebase.assertFails(db.ref(`/${RTDBPaths.Cards}/${GAME_ID}/${CARD_ID}`).update({
      position: {
        x: 0,
        y: 0
      },
      parent: 'board'
    }));
  });

  it("should update card position if authenticated, game exists, connected and the card was locked by me and valid zIndex", async () => {
    const userUID = 'id1';
    const email = 'test@email.com';
    await createGame(GAME_ID, adminDatabase);
    await createConnection(GAME_ID, userUID, adminDatabase);
    await adminDatabase.ref(`/${RTDBPaths.Cards}/${GAME_ID}/${CARD_ID}`).set({
      lockedBy: userUID
    });
    const db = getAuthedDatabase(PROJECT_ID, {uid: userUID, email, email_verified: true});
    await firebase.assertSucceeds(db.ref(`/${RTDBPaths.Cards}/${GAME_ID}/${CARD_ID}`).update({
      position: {
        x: 0,
        y: 0
      },
      parent: 'board',
      zIndex: 0,
    }));
  });

  it("should update card position and zIndex if authenticated, game exists, connected and the card was locked by me", async () => {
    const userUID = 'id1';
    const email = 'test@email.com';
    await createGame(GAME_ID, adminDatabase);
    await createConnection(GAME_ID, userUID, adminDatabase);
    await adminDatabase.ref(`/${RTDBPaths.Cards}/${GAME_ID}/${CARD_ID}`).set({
      lockedBy: userUID
    });
    const db = getAuthedDatabase(PROJECT_ID, {uid: userUID, email, email_verified: true});
    await firebase.assertSucceeds(db.ref(`/${RTDBPaths.Cards}/${GAME_ID}/${CARD_ID}`).update({
      position: {
        x: 0,
        y: 0
      },
      parent: 'board',
      zIndex: 0
    }));
  });

  it("should not update card position if authenticated, game exists, connected and the card was locked by me but wrong zIndex", async () => {
    const userUID = 'id1';
    const email = 'test@email.com';
    await createGame(GAME_ID, adminDatabase);
    await createConnection(GAME_ID, userUID, adminDatabase);
    await adminDatabase.ref(`/${RTDBPaths.Cards}/${GAME_ID}/${CARD_ID}`).set({
      lockedBy: userUID
    });
    const db = getAuthedDatabase(PROJECT_ID, {uid: userUID, email, email_verified: true});
    await firebase.assertFails(db.ref(`/${RTDBPaths.Cards}/${GAME_ID}/${CARD_ID}`).update({
      position: {
        x: 0,
        y: 0
      },
      parent: 'board',
      zIndex: -1001
    }));
  });

  it("should not update card parent if authenticated, game exists, connected and the card was locked by me but parent is panel and I'm not clearing the old estimation", async () => {
    const userUID = 'id1';
    const email = 'test@email.com';
    await createGame(GAME_ID, adminDatabase);
    await createConnection(GAME_ID, userUID, adminDatabase);
    await adminDatabase.ref(`/${RTDBPaths.Cards}/${GAME_ID}/${CARD_ID}`).set({
      lockedBy: userUID,
      position: {
        x: 0,
        y: 0
      },
      parent: 'board',
      zIndex: 0,
      estimation: 'something'
    });
    const db = getAuthedDatabase(PROJECT_ID, {uid: userUID, email, email_verified: true});
    await firebase.assertFails(db.ref(`/${RTDBPaths.Cards}/${GAME_ID}/${CARD_ID}`).update({
      parent: 'panel',
      zIndex: null,
      lockedBy: null,
      position: null,
    }));
  });

});
