import fb from "firebase";

export interface CreatedAt {
  createdAt: fb.firestore.Timestamp | fb.firestore.FieldValue;
}
