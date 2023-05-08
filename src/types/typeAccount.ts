import { Timestamp } from "firebase/firestore"

export type AccountType = {
    active: boolean,
    company: string,
    createdAt: Timestamp,
    customerCode: string
}