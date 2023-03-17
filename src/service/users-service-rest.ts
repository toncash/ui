import DataProvider from "./data-provider"
import User from "../models/user"

export default class UsersServiceRest implements DataProvider<User> {
  constructor(private url: string, private wsUrl: string = "") {}

  private getUrlId(id: number) {
    return `${this.url}/${id}`
  }

  async add(user: User): Promise<User> {
    return requestRest(`${this.url}/${user.chatId}`, {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify(user),
    })
  }

  async get(id: string): Promise<User> {
    return fetchGet(`${this.url}/${id}`)
  }

  async getByUser(userId: number): Promise<User[]> {
    return fetchGet(`${this.url}?personId=${userId}`)
  }

  async getByGeo(lat: number, lng: number): Promise<User[]> {
    return fetchGet(`${this.url}/location?location=${lat},${lng}&distance=20.5`)
  }

  async remove(id: string): Promise<User> {
    const oldOrder = await this.get(id)
    await requestRest(`${this.url}/${id}`, {
      method: "DELETE",
      headers: getHeaders(),
    })
    return oldOrder
  }
}

async function requestRest(url: string, init?: RequestInit): Promise<any> {
  const response: Response = await fetch(url, init)
  return await response.json()
}

function getHeaders(): { "Content-Type": string; Authorization?: string } {
  return { "Content-Type": "application/json" }
}

function fetchGet(url: string): Promise<any> {
  return requestRest(url, {
    method: "GET",
  })
}
