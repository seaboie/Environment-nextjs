import { Timestamp } from "firebase/firestore"

export type UserType = {
    accountId: string,
    active: boolean,
    createdAt: Timestamp,
    displayName: string,
    email: string,
    role: string
}

export type DevicesType = {
    accountId: string,
    active: boolean,
    controller: DevicesOptionsType,
    createdAt: Timestamp,
    instrument: DevicesDetailsType,
    updatedAt: Timestamp
}

export type DevicesOptionsType = {
    extendedId: string,
    firmwareVersion: string,
    hardwareVersion: string,
    imei: string,
    network: string
}

export type DevicesDetailsType = {
    brand: string,
    model: string,
    serial: string
}