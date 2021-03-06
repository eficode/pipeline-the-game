import { SignupInfo } from '../types/signupInfo';
import firebase from 'firebase/app';
import { FirebaseCollection } from '@pipeline/common';
import 'firebase/auth';
import 'firebase/firestore';
import { AuthUser } from '@pipeline/auth';

export async function executeSignup(signupInfo: SignupInfo): Promise<AuthUser> {
  const credentials = await firebase.auth().createUserWithEmailAndPassword(signupInfo.email, signupInfo.password);
  if (credentials.user) {
    const user = credentials.user;
    try {
      await firebase.firestore().doc(`${FirebaseCollection.Users}/${user?.uid}`).set({
        firstName: signupInfo.firstName,
        lastName: signupInfo.lastName,
        email: signupInfo.email,
        role: signupInfo.role,
        devOpsMaturity: signupInfo.devOpsMaturity,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      });

      const emailVerified = user.emailVerified;
      if (!emailVerified) {
        if (signupInfo.desiredUrl) {
          // it has to be a full URL otherwise firebase will not send the continueUrl parameter in the verification link
          const redirectUrl = window.location.origin + signupInfo.desiredUrl;
          user.sendEmailVerification({ url: redirectUrl });
        } else {
          user.sendEmailVerification();
        }
      }
      return {
        id: user.uid,
        email: user.email!,
        emailVerified,
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
