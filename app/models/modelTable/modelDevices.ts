import { Timestamp } from "firebase/firestore"

export type ModelDevicesIdType = {
    id: string,
    accountId: string,
    active: string,
    controller: ModelDevicesControllerType,
    createdAt: Timestamp,
    instrument: ModelDevicesInstrumentType,
    updateAt: Timestamp
}

export type ModelDevicesType = {
    accountId: string,
    active: string,
    controller: ModelDevicesControllerType,
    createdAt: Timestamp,
    instrument: ModelDevicesInstrumentType,
    updateAt: Timestamp
}

export type ModelDevicesControllerType = {
    appVersion: string,
    boardName: string,
    extendedId: string,
    mac: string,
    network: string,
    osVersion: string,
    wireless: string,
    imei: string
}

export type ModelDevicesInstrumentType = {
    brand: string,
    model: string,
    serialNumber: string
}