import { Deal } from "../models/deal"
import { DealUser } from "../models/deal-user"

export default class DealsUsersServiceRest {
  constructor(private url: string) {}

  async add(owderId: string | number, deal: Deal) {
    return requestRest(`${this.url}/deals?clientId=${owderId}`, {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify(deal),
    })
  }

  async get(dealId: string | number): Promise<DealUser> {
    return fetchGet(`${this.url}/deals/${dealId}`)
  }

  async getByUser(userId: string | number): Promise<DealUser[]> {
    return fetchGet(`${this.url}/persons/${userId}/deals`)
  }

  async accept(dealId: string | number) {
    return requestRest(`${this.url}/deals/${dealId}`, {
      method: "POST",
      headers: getHeaders(),
    })
  }

  async deny(dealId: string | number): Promise<Deal> {
    return requestRest(`${this.url}/deals/${dealId}`, {
      method: "PUT",
      headers: getHeaders(),
    })
  }

  async remove(dealId: string | number) {
    return requestRest(`${this.url}/orders/deals/${dealId}`, {
      method: "DELETE",
      headers: getHeaders(),
    })
  }

  async update(dealId: string | number, newDeal: Deal) {
    return requestRest(`${this.url}/deals/${dealId}`, {
      method: "PUT",
      headers: getHeaders(),
      body: JSON.stringify(newDeal),
    })
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
