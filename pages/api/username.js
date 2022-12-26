// API Route to check if username Exist
// {
//   username:" "
// }

import { db } from '../../firebase/firebase.config';
import {
  collection,
  addDoc,
  updateDoc,
  doc,
  deleteDoc,
} from 'firebase/firestore';

export default async function handler(req, res) {
  if (req.method == 'POST') {
    try {
      const userDoc = doc(db, 'users', user.id);
      await getDoc(userDoc).then((doc) => {
        if (doc.exists()) {
          console.log(doc.data());
        }
      });
      alert(
        'Data was successfully fetched from cloud firestore! Close this alert and check console for output.'
      );
    } catch (error) {
      console.log(error);
      alert(error);
    }
  }
}
