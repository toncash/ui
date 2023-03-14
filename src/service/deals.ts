import {Deal, DealStatus} from "../models/deal";
import {Address, toNano} from "ton";
import {HistoryKeeper} from "../contracts/history-keeper-contract";
import {OpenedContract, Sender} from "ton-core";
import {useDealContract} from "../hooks/useDealContract";
import {useTonClient} from "../hooks/useTonClient";

export default class Deals {
    constructor(private dealService: any, private historyKeeper: OpenedContract<HistoryKeeper>, private sender: Sender) {}
    offerDeal(ownerId: string, deal: Deal): Promise<Deal> {
        return this.dealService.add(ownerId, deal)
    }

    async denyDeal(id: string): Promise<Deal> {
        const deal = await this.getDeal(id)
        if(DealStatus[deal.dealStatus]==="CURRENT"){
            return this.dealService.remove(id)
        } else {
            deal.dealStatus = DealStatus.BAD
            return this.dealService.update(id, deal)
        }

    }

    async acceptDeal(id: string, owderId: string, ownerAddress: Address, buyerAddress: Address): Promise<Deal> {
        const deal = await this.getDeal(id)
        if(DealStatus[deal.dealStatus]==="CURRENT"){
            if(deal.sellerId==owderId){
                const client = useTonClient()
                const dealContract = await this.createDealContract(ownerAddress, buyerAddress, toNano(deal.amount))
                client.client?.isContractDeployed(dealContract.address)

            }
        }

        return this.dealService.get(id)
    }

    private createDealContract(ownerAddress: Address, buyerAddress: Address, amount: bigint){
        return this.historyKeeper.sendNewDeal(this.sender, amount, buyerAddress)
    }

    async getDealsByUser(userId: number): Promise<Deal[]> {
        return this.dealService.getByUser(userId)
    }

    async getDeal(id: string): Promise<Deal> {
        return this.dealService.get(id)
    }



}
