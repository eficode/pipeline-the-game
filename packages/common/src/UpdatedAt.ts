/**
 * Generics are used because of the different model for the admin sdk
 * and dhe client sdk regarding the Timestamp and serverTimestamp
 * object. The client and the server packages can share the data model
 * but they have to specify the timestamp interface of the firebase sdk
 */
export interface UpdatedAt<T, F> {
  updatedAt: T | F;
}
