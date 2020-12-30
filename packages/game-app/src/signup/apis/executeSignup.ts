import { SignupInfo } from '../types/signupInfo';
import firebase from 'firebase/app';
import { FirebaseCollection } from '@pipeline/common';
import 'firebase/auth';
import 'firebase/firestore';
import { User } from '../../_shared/auth/slice';

export async function executeSignup(signupInfo: SignupInfo): Promise<User> {
  try {
    const credentials = await firebase.auth().createUserWithEmailAndPassword(signupInfo.email, signupInfo.password);
    if (credentials.user) {
      const user = credentials.user;
      await firebase.firestore().doc(`${FirebaseCollection.Users}/${user?.uid}`).set({
        email: signupInfo.email,
        role: signupInfo.role,
        devOpsMaturity: signupInfo.devOpsMaturity,
      });
      return {
        id: user.uid,
        email: user.email!,
      };
    } else {
      throw new Error('user-not-created');
    }
  } catch (e) {
    try {
      const currentUser = firebase.auth().currentUser;
      if (currentUser !== null) {
        await currentUser.delete();
      }
    } catch (e) {}
    throw e;
  }
}
