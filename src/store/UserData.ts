import User, { getEmptyUser } from "../models/user"
import { atom } from "nanostores"

export const userData = atom<User>(getEmptyUser())

export function setUser(_user: User) {
  userData.set({ ..._user })
}
