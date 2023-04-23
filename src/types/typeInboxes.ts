import { Timestamp } from "firebase/firestore"

export type InboxType = {
    id: string,
    arrivedAt: Timestamp,
    createdAt: Timestamp,
    data: InboxesDataType,
    deviceId: string
}
export type InboxesType = {
    arrivedAt: Timestamp,
    createdAt: Timestamp,
    data: InboxesDataType,
    deviceId: string
}

export type InboxesDataType = {
    'L 5': string,
    L10: string,
    L50: string,
    L90: string,
    L95: string,
    LFmax: string,
    LFmin: string,
    LImax: string,
    LImin: string,
    LSmax: string,
    LSmin: string,
    'Leq,T': string,
    Peak: string,
    Responding: string,
    SD: string,
    SEL: string,
    Weighting: string
}