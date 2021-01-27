import {RTDBGame as InnerRTDBGame} from '@pipeline/common';
import {FirebaseFieldValue, FirebaseTimestamp} from "./FirebaseTypes";


export type RTDBGame = InnerRTDBGame<FirebaseTimestamp, FirebaseFieldValue>;
