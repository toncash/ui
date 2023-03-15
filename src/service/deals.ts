import {Deal, DealStatus} from "../models/deal";
import {Address, toNano} from "ton";
import {HistoryKeeper} from "../contracts/history-keeper-contract";
import {OpenedContract, Sender} from "ton-core";
import {useTonClient} from "../hooks/useTonClient";

export default class Deals {
    constructor(private dealService: any) {}

    offerDeal(ownerId: string, deal: Deal): Promise<Deal> {
        return this.dealService.add(ownerId, deal)
    }

    // async denyDeal(id: string): Promise<Deal> {
    //     const deal = await this.getDeal(id)
    //     if(DealStatus[deal.dealStatus]==="CURRENT") {
    //         return this.dealService.remove(id)
    //     } else {
    //         deal.dealStatus = DealStatus.BAD
    //         return this.dealService.update(id, deal)
    //     }
    // }

    async acceptDeal(
        id: string,
        orderId: string,
        ownerId: string,
        ownerAddress: Address,
        buyerAddress: Address,
        historyKeeper: any
    ): Promise<Deal> {

        const {deal} = await this.getDeal(orderId, id)
        console.log(deal)
        if(String(deal.dealStatus)==="CURRENT"){
            if(deal.sellerId==ownerId){
                deal.dealStatus = DealStatus.PENDING
                console.log("start")
                console.log("historyKeeper")
                console.log(historyKeeper)
                const dealContract = await this.createDealContract(ownerAddress, buyerAddress, toNano(5), historyKeeper)
                console.log("dealContract")
                console.log(dealContract)
                console.log(dealContract.address.toString())
                this.dealService.update(deal.id, {...deal})
                console.log("success")
            }
        }

        return deal
    }

    private createDealContract(
        ownerAddress: Address,
        buyerAddress: Address,
        amount: bigint,
        historyKeeper: any){
        return historyKeeper.sendDeploy(amount, buyerAddress)
    }

    private async isContractDeployed(address: Address) : Promise<boolean | undefined> {
        const client = useTonClient()
        return client.client?.isContractDeployed(address)
    }

    async getDealsByUser(userId: number | string): Promise<Deal[]> {
        return this.dealService.getByUser(userId)
    }

    async getDeal(orderId: string, id: string): Promise<Deal> {
        return this.dealService.get(orderId, id)
    }

}
