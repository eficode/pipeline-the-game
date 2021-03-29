/**
 * Deploy security rules to all the instances of the database dynamically
 */
const admin = require('firebase-admin');
const rules = require("./load-rules-to-rtdb-instances");
const app = admin.initializeApp();

Promise.all([rules.loadRules(app)]).then(() => console.info("Rules loaded correctly"));
