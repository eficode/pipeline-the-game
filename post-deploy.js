
const packageJsonPathApp = "./packages/game-app/package.json";
const packageJsonPathFunctions = "./packages/functions/package.json";
const packageJsonFunctions = require(packageJsonPathFunctions);
const packageJsonApp = require(packageJsonPathApp);
const fs = require("fs-extra");

(async () => {
  await fs.remove(`./packages/functions/_packages_copy`);

  packageJsonFunctions.dependencies["@pipeline/common"] = packageJsonApp.dependencies["@pipeline/common"];

  await fs.writeFile(packageJsonPathFunctions, JSON.stringify(packageJsonFunctions, null, 2));
})();
