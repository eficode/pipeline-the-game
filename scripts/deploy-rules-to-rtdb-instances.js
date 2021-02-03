const loadRules = require("./load-rules-to-rtdb-instances");

Promise.all([loadRules()]).then(() => console.info("Rules loaded correctly"));
