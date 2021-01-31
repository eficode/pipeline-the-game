const fs = require("fs-extra");
const path = require("path");
const firebaseTools = require('firebase-tools');

const root = path.resolve(__dirname, '..');
const functionFolder = path.join(root, `packages/functions`);

async function copyPackages() {

    const functionsPackageJsonPath = path.join(functionFolder, "package.json");
    const packageJson = require(functionsPackageJsonPath);

    await fs.remove(path.join(functionFolder, `_packages_copy`));

    await fs.copy(path.join(root, `packages/common`), path.join(functionFolder, `_packages_copy/common`));

    packageJson.dependencies["@pipeline/common"] = "file:./_packages_copy/common";

    await fs.writeFile(functionsPackageJsonPath, JSON.stringify(packageJson, null, 2));
}

async function fillRtdbInstancesFile() {
    const listDatabases = firebaseTools.database.instances.list
    const databases = await listDatabases();
    const instanceList = databases.map(d => ({
        url: `https://${d.instance}.firebasedatabase.app`,
        name: d.instance,
        id: d.instance.replace(`${process.env.FIREBASE_PROJECT_ID}-`, ''),
    }));
    console.log('Found these instances of rtdb on witch functions will be deployed', instanceList);
    const sourceFile = `
    const rtdbInstancesUrl =  ${ JSON.stringify(instanceList, null, 2)};

    export default rtdbInstancesUrl;

    `
    await fs.writeFile(path.join(functionFolder, `src/rtdbInstances.ts`), sourceFile);

}

Promise.all([
    copyPackages(),
    fillRtdbInstancesFile()
])
