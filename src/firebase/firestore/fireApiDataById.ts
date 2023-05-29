import { collection, doc, getCountFromServer, getDoc, getDocs, getFirestore, limit, orderBy, OrderByDirection, query, startAt, where } from "firebase/firestore"
import firebase_app from "../config"

const db = getFirestore(firebase_app);

interface QueryDataByIdType<T> {
    dataById: T
}

export type ArrayDataByIdType<T> = {
    id: string,
    data: T
}

interface QueryArrayDataByIdType<T> {
    dataById: T[] | null;
}

export interface QueryResultByIdType<T> {
    count: number | null;
    datas: T[] | null;
    error: unknown | null;
}

export interface QueryResultCountByIdType<T> {
    count: T | null
}

export const FireApiDataById = {
    fetchedTotalCountWhere: async<T>(col: string, fieldDocument: string, compareFieldDocument: string): Promise<QueryResultCountByIdType<T>> => {

        const collectionRef = collection(db, col);
        const q = query(collectionRef, where(fieldDocument, '==', compareFieldDocument));
        const docSnapshot = await getCountFromServer(q);

        const count = docSnapshot.data().count as T;

        return { count }

    },
    fetchDataById: async <T>(col: string, docID: string): Promise<QueryDataByIdType<T>> => {

        const docRef = doc(db, col, docID);
        const docSnapshot = await getDoc(docRef);

        if (!docSnapshot.exists()) {
            alert("--- ไม่พบ ข้อมูล นะค่ะ ---");

        } 

        const dataById = await docSnapshot.data() as T;

        return { dataById }
    },
    fetchDataByDeviceId: async() => {
        
    }



}