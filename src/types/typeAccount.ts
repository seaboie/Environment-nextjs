import { Timestamp } from "firebase/firestore"

export type AccountType = {
    active: boolean,
    company: string,
    createdAt: Timestamp,
    customerCode: string,
    
    place: PlaceAddress,
}

export type PlaceAddress = {
    address: string
}