/**
 * Firebase functions don't support monorepo because of their build process.
 *
 * Without this pre-deploy script the build of the functions will fail because of the
 * @pipeline/common package not available in the public registry.
 *
 * This script workarounds this problem copying the package common into the source of the function
 * and changing the reference inside the package.json.
 *
 * See https://stackoverflow.com/questions/61015842/deploying-to-firebase-functions-with-a-monorepo
 * https://github.com/firebase/firebase-tools/issues/653
 *
 * Another thing that firebase does not support right now is the deploy of functions with an
 * rtdb trigger to all the rtdb instances available in the project. You must explicitly export
 * a function for each rtdb instance you want to attach the trigger.
 * This scripts create a list of all the available rtdb instances inside the project and injects it
 * into the functions code, so that all he instances available can be targeted.
 *
 * For more info look at the functions package inside the exportFunctionsOnAllRTDBInstances function.
 */
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
    const locations = ['europe-west1'];
    let instancesList = [];
    for (const location of locations) {
        const listDatabases = firebaseTools.database.instances.list
        const databases = await listDatabases({location, project: process.env.FIREBASE_PROJECT_ID});
        instancesList = [...instancesList, ...databases.map(d => ({
            url: `https://${d.instance}.${location}.firebasedatabase.app`,
            name: d.instance,
            id: d.instance.replace(`${process.env.FIREBASE_PROJECT_ID}-`, ''),
        }))];
    }
    console.log('Found these instances of rtdb on witch functions will be deployed', instancesList);
    const sourceFile = `
    const rtdbInstancesUrl =  ${ JSON.stringify(instancesList, null, 2)};

    export default rtdbInstancesUrl;

    `
    await fs.writeFile(path.join(functionFolder, `src/rtdbInstances.ts`), sourceFile);

}

Promise.all([
    copyPackages(),
    fillRtdbInstancesFile()
])
