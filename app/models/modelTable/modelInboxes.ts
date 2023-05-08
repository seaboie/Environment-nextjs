import { Timestamp } from "firebase/firestore"

export type ModelInboxesType = {
    arrivedAt: Timestamp,
    createdAt: Timestamp,
    data: ModelInboxesDataType,
    deviceId: string
}

export type ModelInboxesDataType = {
    "L 5": string,
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
    "Leq,T": string,
    Peak: string,
    Responding: string,
    SD: string,
    SEL: string,
    Weighting: string
}

export type ModelInboxesDataCSVType = {
    date: string,
    "L 5": string,
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
    "Leq,T": string,
    Peak: string,
    Responding: string,
    SD: string,
    SEL: string,
    Weighting: string
}

