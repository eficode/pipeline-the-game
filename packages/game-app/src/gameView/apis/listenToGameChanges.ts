import { FirebaseCollection } from '@pipeline/common';
import firebase from 'firebase/app';
import 'firebase/database';
import { RTDBGame } from '@pipeline/models';

export default function listenToGameChanges(gameId: string, onData: (game: RTDBGame) => void) {
  const changeSubscription = firebase
    .app(gameId)
    .database()
    .ref(`${FirebaseCollection.Games}/${gameId}`)
    .on('value', snapshot => {
      onData(snapshot.val());
    });

  return () => {
    firebase.app(gameId).database().ref(`${FirebaseCollection.Games}/${gameId}`).off('value', changeSubscription);
  };
}
