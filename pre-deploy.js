const fs = require("fs-extra");

const packageJsonPath = "./packages/functions/package.json";
const packageJson = require(packageJsonPath);

(async () => {
  await fs.remove(`./packages/functions/_packages_copy`);
  await fs.copy(`./packages/common`, `./packages/functions/_packages_copy/common`);

  packageJson.dependencies["@pipeline/common"] = "file:./_packages_copy/common";

  await fs.writeFile(packageJsonPath, JSON.stringify(packageJson, null, 2));
})();
