import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';
import * as express from 'express';

const checkAuth = async (req: functions.https.Request, res: express.Response): Promise<admin.auth.DecodedIdToken | null> => {
  if (!req.headers['authorization'] || !req.headers['authorization'].startsWith('Bearer ')) {
    res.status(403).send();
    return null;
  }
  const idToken = req.headers.authorization.split('Bearer ')[1];
  try {
    return await admin.auth().verifyIdToken(idToken)
  } catch(e) {
    res.status(403).send();
    return null;
  }
};

export {checkAuth}
