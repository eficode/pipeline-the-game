const rules = require("./load-rules-to-rtdb-instances");

Promise.all([rules.loadRules()]).then(() => console.info("Rules loaded correctly"));
