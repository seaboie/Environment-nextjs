import { Timestamp } from "firebase/firestore"

export type UserType = {
    accountId: string,
    active: boolean,
    createdAt: Timestamp,
    displayName: string,
    email: string,
    fullName: string,
    phone: string,
    photo: string,
    role: string
}