import rtdbInstancesUrl from "../rtdbInstances";
import * as functions from "firebase-functions";

/**
 * Exports a function with a trigger on all rtdbInstances defined.
 *
 * the functions will be exported using the functionName and the suffix `[dbId]`
 *
 * @param functionName the name of the function to export
 * @param functionBuilder receive a database instance and returns a function instance
 * @param exportObj the exports object to be filled with the functions to export
 */
export default function exportFunctionsOnAllRTDBInstances<T>(
  functionName: string,
  functionBuilder: (build: functions.database.InstanceBuilder, rtdbId:string, rtdbUrl:string) => functions.CloudFunction<T>,
  exportObj: any,
) {
  for (const db of rtdbInstancesUrl) {
    exportObj[`${functionName}_${db.id.replace('-', '_')}`] = functionBuilder(
      functions.region('europe-west1').database.instance(db.name),
      db.id,
      db.url
    );
  }

}

/**
 *
 * Re-export all the elements inside object inside exportsObj
 *
 * @param exportsObj the export object to fill
 * @param object the object containing elements to re-export
 */
export function exportEverythingFrom(exportsObj: any, object: any) {
  for (const key in object) {
    exportsObj[key] = object[key];
  }
}
