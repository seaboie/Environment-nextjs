import { collection, DocumentData, getCountFromServer, getDocs, getFirestore, limit, orderBy, OrderByDirection, query, QueryDocumentSnapshot, startAt, Timestamp, where } from "firebase/firestore"
import firebase_app from "../config"

interface QueryCountTotalPage {
    totalPage: number
}

interface QueryFireApiDataChildList<T> {
    datas: T[] | null;
    firstDoc: QueryDocumentSnapshot<DocumentData> | null;
    lastDoc: QueryDocumentSnapshot<DocumentData> | null;
    error: unknown | null
}

interface QueryFireApiDataChildListData<T> {
    datas: T[] | null;
    error: unknown | null
}

const db = getFirestore(firebase_app);

export const FireApiDataChildList = {
    fetchedTotalCountByDateStartAndEnd: async(col: string, deviceId: string, createdAtField: string, startTime: Timestamp, endTime: Timestamp, limited: number): Promise<QueryCountTotalPage> => {
        const collectionRef = collection(db, col);
        
        try {
            const q = query(collectionRef, where('deviceId', '==', deviceId), where(createdAtField, '>=', startTime), where(createdAtField, '<', endTime));
            const docSnapshot = await getCountFromServer(q);

            const count = docSnapshot.data().count;
            const totalPage = Math.ceil(count / limited);

            return {  totalPage }
        } catch (error) {
            alert(error)
            return { totalPage: 0 }
        }
    },
    fetchedFirstPage: async<T>(col: string, deviceId: string, createdAtField: string, start: Timestamp, end: Timestamp, orderField: string, des: OrderByDirection, limited: number): Promise<QueryFireApiDataChildList<T>> => {
        const collectionRef = collection(db, col);

        try {
            const q = query(collectionRef, where('deviceId', '==', deviceId), where(createdAtField, '>=', start), where(createdAtField, '<=', end), orderBy(orderField, des), limit(limited));
            const docSnapshot = await getDocs(q);

            const firstDoc = docSnapshot.docs[0];
            const lastDoc = docSnapshot.docs[docSnapshot.docs.length - 1];

            const datas = docSnapshot.docs.map(doc => ({id: doc.id, ...doc.data() as T}))

            return {datas, firstDoc, lastDoc, error: null}
            
        } catch (error) {
            alert(error);
            return {datas: null, firstDoc: null, lastDoc: null, error}
        }
    },
    fetchedLastPage: async<T>(col: string, deviceId: string, createdAtField: string, start: Timestamp, end: Timestamp, orderField: string, des: OrderByDirection, limited: number, totalPage: number): Promise<QueryFireApiDataChildList<T>> => {

        const lastPageStartIndex = (totalPage - 1) * limited;
        const collectionRef = collection(db, col);

        try {

            const q = query(collectionRef, where('deviceId', '==', deviceId), where(createdAtField, '>=', start), where(createdAtField, '<', end), orderBy(orderField, des));
            const docSnapshot = await getDocs(q);

            const lastPageQuery = query(collectionRef, orderBy(orderField,des), startAt(docSnapshot.docs[lastPageStartIndex]), limit(limited));
            const lastPageDocSnapshot = await getDocs(lastPageQuery);

            const firstDoc = lastPageDocSnapshot.docs[0];
            const lastDoc = lastPageDocSnapshot.docs[lastPageDocSnapshot.docs.length - 1];

            const datas = lastPageDocSnapshot.docs.map(doc => ({id: doc.id, ...doc.data() as T}));

            return {datas, firstDoc, lastDoc, error: null}
            
        } catch (error) {

            alert(error);
            console.log(error);
            
            return {datas: null, firstDoc: null, lastDoc: null, error}
            
        }
    },
    fetchedExportCSV: async<T>(col: string, deviceId: string, createdAtField: string, start: Timestamp, end: Timestamp, orderField: string, des: OrderByDirection): Promise<QueryFireApiDataChildListData<T>> => {
        const collectionRef = collection(db, col);

        try {
            const q = query(collectionRef, where('deviceId', '==', deviceId), where(createdAtField, '>=', start), where(createdAtField, '<', end), orderBy(orderField, des));
            const docSnapshot = await getDocs(q)

            const datas = docSnapshot.docs.map(doc => ({id: doc.id, ...doc.data() as T}));

            return {datas, error: null}
            
        } catch (error) {
            alert(error)
            console.log(error);
            
            return {datas: null, error}
        }
    }
}