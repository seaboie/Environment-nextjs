import firebase_app from '@/firebase/config'
import { doc, getDoc, getFirestore } from 'firebase/firestore'

const db = getFirestore(firebase_app);

export default async function getDocument(collection:string, id: string) {
  let docRef = doc(db, collection, id);

  let result = null;
  let error = null;

  try {
    result = await getDoc(docRef)
  } catch (e) {
    error = e;
  }

  return {result, error}
}
