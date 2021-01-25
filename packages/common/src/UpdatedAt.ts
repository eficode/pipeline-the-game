import fb from "firebase";

export interface UpdatedAt {
  updatedAt: fb.firestore.Timestamp | fb.firestore.FieldValue;
}
