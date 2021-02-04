import { CardState, FirebaseCollection } from '@pipeline/common';
import firebase from 'firebase/app';
import 'firebase/database';

export default function listenToCardsChanges(
  gameId: string,
  onData: (cardState: { state: CardState; cardId: string }) => void,
) {
  const changeSubscription = firebase
    .app(gameId)
    .database()
    .ref(`${FirebaseCollection.Cards}/${gameId}`)
    .on('child_changed', snapshot => {
      onData({ state: snapshot.val(), cardId: snapshot.key! });
    });

  const addSubscription = firebase
    .app(gameId)
    .database()
    .ref(`${FirebaseCollection.Cards}/${gameId}`)
    .on('child_added', snapshot => {
      onData({ state: snapshot.val(), cardId: snapshot.key! });
    });

  return () => {
    firebase
      .app(gameId)
      .database()
      .ref(`${FirebaseCollection.Cards}/${gameId}`)
      .off('child_changed', changeSubscription);
    firebase.app(gameId).database().ref(`${FirebaseCollection.Cards}/${gameId}`).off('child_added', addSubscription);
  };
}
