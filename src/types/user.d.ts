interface User {
  _id: string;
  name: string;
  email: string;
  firebaseId: string;
  photoURL: string;
  type: string;
  org: string | null;
  createdAt: Date;
  updatedAt: Date;
}
