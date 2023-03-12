export enum DealStatus {
    CURRENT,
    PENDING,
    FINISH,
    BAD,
}

export type Deal = {
    id?: string | number
    addressContract?: string
    orderId: string | number
    buyerId: string | number
    sellerId: string | number
    amount: number
    dealStatus: DealStatus
}

export function getEmptyDeal(orderId: string): Deal{
    return {
        orderId,
        buyerId: 0,
        sellerId: 0,
        amount: 0,
        dealStatus: DealStatus.CURRENT
    }
}