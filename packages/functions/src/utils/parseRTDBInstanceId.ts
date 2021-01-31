import {PROJECT_ID} from "./rtdb";
import * as functions from "firebase-functions";

const logger = functions.logger;

/**
 * Returns the instance id from the complete db url
 *
 * @param instanceUrl
 */
export default function parseRTDBInstanceId(instanceUrl: string) {
  let completeName;
  if (instanceUrl.includes('localhost')) {
    completeName = instanceUrl.split('ns=')[1];
  } else {
    completeName = instanceUrl.replace('https://', '').split('.')[0];
  }
  logger.info(
    `[parseRTDBInstanceId] instanceUrl ${instanceUrl} 
    completeName ${completeName} id ${completeName.replace(`${PROJECT_ID}-`, '')}`
  );
  return completeName.replace(`${PROJECT_ID}-`, '');
}
