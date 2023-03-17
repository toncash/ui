import { Deal, DealStatus } from "../models/deal"
import { Address, toNano } from "ton"
import { useTonClient } from "../hooks/useTonClient"
import { DealUser } from "../models/deal-user"
import DealsUsersServiceRest from "./deals-users-service-rest"

export default class DealsUsers {
  constructor(private dealService: DealsUsersServiceRest) {}

  offerDeal(ownerId: string, deal: Deal): Promise<Deal> {
    return this.dealService.add(ownerId, deal)
  }

  async denyDeal(id: string | number): Promise<Deal> {
    return this.dealService.deny(id)
  }

  async cancelDeal(id: string, dealContract?: any) {
    const { deal } = await this.getDealUser(id)
    if (DealStatus[deal.dealStatus] === "PENDING") {
      await dealContract.sendCancel() //todo atomicity
      deal.dealStatus = DealStatus.CANCEL
      return this.dealService.update(id, { ...deal })
      return this.dealService.deny(id)
    }
  }

  async completeDeal(dealId: string, dealContract: any) {
    const { deal } = await this.dealService.get(dealId)
    deal.dealStatus = DealStatus.FINISH
    await this.dealService.update(dealId, { ...deal }) //todo atomicity
    await dealContract.sendComplete()
  }

  async acceptDeal(dealId: string | number): Promise<Deal> {
    const { deal } = await this.getDealUser(dealId)
    console.log(deal)
    if (DealStatus[deal.dealStatus] === "CURRENT") {
      // @ts-ignore
      await this.dealService.accept(deal.id)
    }

    return deal
  }

  // private createDealContract(buyerAddress: Address, amount: bigint, accountContract: any) {
  //   return accountContract.sendDeploy(amount, buyerAddress)
  // }

  private async isContractDeployed(address: Address): Promise<boolean | undefined> {
    const client = useTonClient()
    return client.client?.isContractDeployed(address)
  }

  async getDealUser(id: string | number): Promise<DealUser> {
    return this.dealService.get(id)
  }

  async getDealsByUser(userId: string | number): Promise<DealUser[]> {
    return this.dealService.getByUser(userId)
  }
}
