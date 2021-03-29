/**
 * Reverts the copy/past of the common package code done in the pre-deploy script
 */
const fs = require("fs-extra");
const path = require("path");

(async () => {
  const root = path.resolve(__dirname, '..');
  const functionFolder = path.join(root, `packages/functions`);
  const functionsPackageJsonPath = path.join(functionFolder, "package.json");
  const appPackageJsonPath = path.join(root, "packages/game-app/package.json");

  const packageJsonFunctions = require(functionsPackageJsonPath);
  const packageJsonApp = require(appPackageJsonPath);

  await fs.remove(path.join(functionFolder,`_packages_copy`));

  packageJsonFunctions.dependencies["@pipeline/common"] = packageJsonApp.dependencies["@pipeline/common"];

  await fs.writeFile(functionsPackageJsonPath, JSON.stringify(packageJsonFunctions, null, 2));
})();
