const fs = require("fs-extra");
const path = require("path");


(async () => {
    const root = path.resolve(__dirname, '..');
    const functionFolder = path.join(root, `packages/functions`);
    const functionsPackageJsonPath = path.join(functionFolder, "package.json");
    const packageJson = require(functionsPackageJsonPath);

    await fs.remove(path.join(functionFolder, `_packages_copy`));

    await fs.copy(path.join(root, `packages/common`), path.join(functionFolder, `_packages_copy/common`));

    packageJson.dependencies["@pipeline/common"] = "file:./_packages_copy/common";

    await fs.writeFile(functionsPackageJsonPath, JSON.stringify(packageJson, null, 2));
})();

