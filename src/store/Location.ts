
import { atom } from 'nanostores'
import Order, {getEmptyOrder, Location} from "../models/order";

export const locationData = atom<Location>({x: 0, y: 0})
export const errorLocationData = atom<string>("")

export function setLocationData(location: Location) {
    locationData.set(location)
}

export function setErrorLocationData(error: string) {
    errorLocationData.set(error)
}