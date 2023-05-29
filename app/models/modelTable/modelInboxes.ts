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

export type ModelInboxesCSVType = {
    [key: string]: string | number;
    createdAt: any
    data: any
    "L 5": number,
    L10: number,
    L50: number,
    L90: number,
    L95: number,
    LFmax: number,
    LFmin: number,
    LImax: number,
    LImin: number,
    LSmax: number,
    LSmin: number,
    "Leq,T": number,
    Peak: number,
    Responding: string,
    SD: number,
    SEL: number,
    Weighting: string
}

export type ModelInboxesDataCSVType = {
    [key: string]: string | number;
    // date: string,
    "L 5": number,
    L10: number,
    L50: number,
    L90: number,
    L95: number,
    LFmax: number,
    LFmin: number,
    LImax: number,
    LImin: number,
    LSmax: number,
    LSmin: number,
    "Leq,T": number,
    Peak: number,
    Responding: string,
    SD: number,
    SEL: number,
    Weighting: string
}

