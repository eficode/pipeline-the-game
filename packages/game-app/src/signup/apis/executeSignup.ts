import { SignupInfo } from '../types/signupInfo';
import firebase from 'firebase/app';
import { FirebaseCollections } from '@pipeline/common';
import 'firebase/auth';
import 'firebase/firestore';
import { User } from '../../_shared/auth/slice';

export async function executeSignup(signupInfo: SignupInfo): Promise<User> {
  const credentials = await firebase.auth().createUserWithEmailAndPassword(signupInfo.email, signupInfo.password);
  if (credentials.user) {
    const user = credentials.user;
    try {
      await firebase.firestore().doc(`${FirebaseCollections.Users}/${user?.uid}`).set({
        email: signupInfo.email,
        role: signupInfo.role,
        devOpsMaturity: signupInfo.devOpsMaturity,
      });
      return {
        id: user.uid,
        email: user.email!,
      };
    } catch (e) {
      const currentUser = firebase.auth().currentUser;
      if (currentUser !== null) {
        await currentUser.delete();
      }
      throw e;
    }
  } else {
    // eslint-disable-next-line no-throw-literal
    throw { code: 'user-not-created' };
  }
}
