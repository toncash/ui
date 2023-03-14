import {Deal} from "../models/deal";

export default class DealsServiceRest{
    constructor(private url: string) {}

    async add(owderId: string, deal: Deal) {
        return requestRest(`${this.url}/orders/deals?clientId=${owderId}`, {
            method: "POST",
            headers: getHeaders(),
            body: JSON.stringify(deal)
        })
    }

    async get(dealId: string): Promise<Deal> {
        return fetchGet(`${this.url}/${dealId}`) // TODO
    }

    async getByUser(userId: string): Promise<Deal []>{
        return fetchGet(`${this.url}/${userId}`) // TODO
    }

    async remove(dealId: string){
        // TODO
        console.log("deal removed")
    }

    async update(dealId: string, newDeal: Deal){
        // TODO
        console.log("deal updated")
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
        method: "GET"
    })
}
