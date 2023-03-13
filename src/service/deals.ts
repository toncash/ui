import DataProvider from "./data-provider"
import {Deal} from "../models/deal";

export default class Deals {
    constructor(private dealService: any) {}

    addDeal(deal: Deal): Promise<Deal> {
        return this.dealService.add(deal)
    }

    removeDeal(id: string): Promise<Deal> {
        return this.dealService.remove(id)
    }

    getDeal(dealId: string): Promise<Deal> {
        return this.dealService.get(dealId)
    }

    getDealsByUser(userId: number): Promise<Deal[]> {
        return this.dealService.getByUser(userId)
    }

}
