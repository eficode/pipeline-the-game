import {Status as InnerStatus} from '@pipeline/common';
import {FirebaseFieldValue, FirebaseTimestamp} from "./FirebaseTypes";


export type Status = InnerStatus<FirebaseTimestamp, FirebaseFieldValue>;
