import { FirebaseCollection } from '@pipeline/common';
import firebase from 'firebase/app';
import 'firebase/database';

export default async function saveReview(gameId: string, review: boolean) {
  return firebase.app(gameId).database().ref(`${FirebaseCollection.Games}/${gameId}`).update({ review });
}
