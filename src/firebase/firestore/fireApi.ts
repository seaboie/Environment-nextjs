import { getFirestore, collection, query, orderBy, OrderByDirection, limit, getDocs, QueryDocumentSnapshot, DocumentData, getCountFromServer, startAfter, endBefore, startAt, limitToLast, where } from "firebase/firestore";
import firebase_app from "../config";
import { FirebaseError } from '@firebase/util';


const db = getFirestore(firebase_app);

export interface QueryResultType<T> {
    datas: T[] | null;
    lastDoc: QueryDocumentSnapshot<DocumentData> | null;
    firstDoc: QueryDocumentSnapshot<DocumentData> | null;
    error: unknown | null;
}

export interface QueryCountType {
    totalPage: number
}

export const FireApi = {
    fetchedTotalPage: async (col: string, limitPerPage: number): Promise<QueryCountType> => {
        const collectionRef = collection(db, col);
        const snapshotCount = await getCountFromServer(collectionRef);

        const amountSnapshotCount = snapshotCount.data().count;
        const totalPage = Math.ceil(amountSnapshotCount / limitPerPage);

        return { totalPage }
    },
    fetchedData: async <T>(col: string, order: string, des: OrderByDirection, limited: number): Promise<QueryResultType<T>> => {

        try {
            const collectionRef = collection(db, col);
            const q = query(collectionRef, orderBy(order, des), limit(limited));
            const documentSnapshot = await getDocs(q);

            const lastDoc = documentSnapshot.docs[documentSnapshot.docs.length - 1];
            const firstDoc = documentSnapshot.docs[0];

            const datas = documentSnapshot.docs.map((doc => ({ id: doc.id, ...doc.data() as T })));

            return { datas, lastDoc, firstDoc, error: null }
        } catch (error) {

            if (error instanceof FirebaseError && error.code === 'unavailable') {
                // Network error occurred
                console.log(error);
                return { datas: null, lastDoc: null, firstDoc: null, error: { message: 'A network error occurred.', code: error.code } };
            }
            console.log(error);
            return { datas: null, lastDoc: null, firstDoc: null, error };

        }
    },
    fetchedNextData: async <T>(col: string, fieldDocument: string, compareFieldDocument: string, order: string, des: OrderByDirection, limited: number, lastQueryDocument: QueryDocumentSnapshot<DocumentData> | null): Promise<QueryResultType<T>> => {

        try {
            const collectionRef = collection(db, col);
            const q = query(collectionRef, where(fieldDocument, '==', compareFieldDocument), orderBy(order, des), startAfter(lastQueryDocument), limit(limited));
            const documentSnapshot = await getDocs(q);

            const lastDoc = documentSnapshot.docs[documentSnapshot.docs.length - 1];
            const firstDoc = documentSnapshot.docs[0];

            const datas = documentSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() as T }));

            return { datas, lastDoc, firstDoc, error: null }

        } catch (error: unknown) {
            console.log(error);
            return { datas: null, lastDoc: null, firstDoc: null, error }
        }

    },
    fetchedPreviousData: async <T>(col: string, fieldDocument: string, compareFieldDocument: string, order: string, des: OrderByDirection, limited: number, firstQueryDocument: QueryDocumentSnapshot<DocumentData> | null): Promise<QueryResultType<T>> => {

        try {
            const collectionRef = collection(db, col);
            const q = query(collectionRef, where(fieldDocument, '==', compareFieldDocument), orderBy(order, des), endBefore(firstQueryDocument), limitToLast(limited))
            const documentSnapshot = await getDocs(q);

            const lastDoc = documentSnapshot.docs[documentSnapshot.docs.length - 1];
            const firstDoc = documentSnapshot.docs[0];

            const datas = documentSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() as T }));

            return { datas, firstDoc, lastDoc, error: null }
        } catch (error: unknown) {
            console.log(error);
            return { datas: null, firstDoc: null, lastDoc: null, error }
        }

    },
    fetchedLastPage: async <T>(col: string, fieldDocument: string, compareFieldDocument: string, order: string, des: OrderByDirection, limited: number, totalPage: number): Promise<QueryResultType<T>> => {
        const lastPageStartIndex = (totalPage - 1) * limited;

        try {
            const collectionRef = collection(db, col);
            const q = query(collectionRef, where(fieldDocument, '==', compareFieldDocument), orderBy(order, des));
            const docSnapshot = await getDocs(q);

            const lastPageQuery = query(collectionRef, where(fieldDocument, '==', compareFieldDocument), orderBy(order, des), startAt(docSnapshot.docs[lastPageStartIndex]), limit(limited));
            const lastPageDocSnapshot = await getDocs(lastPageQuery);

            const firstDoc = lastPageDocSnapshot.docs[0];
            const lastDoc = lastPageDocSnapshot.docs[lastPageDocSnapshot.docs.length - 1];

            const datas: T[] = lastPageDocSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() as T }));

            return { datas, firstDoc, lastDoc, error: null };
        } catch (error) {
            console.log(error);
            return { datas: null, firstDoc: null, lastDoc: null, error }
        }
    },

}