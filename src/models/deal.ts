export enum DealStatus {
    CURRENT,
    PENDING,
    FINISH,
    BAD,
}

export type Deal = {
    orderId: string | number
    buyerId: string | number
    sellerId: string | number
    amount: number
    price: number
    currency: string
    dealStatus: DealStatus
}

export function getEmptyDeal(orderId: string): Deal{
    return {
        orderId,
        buyerId: 0,
        sellerId: 0,
        amount: 0,
        price: 0,
        currency: "",
        dealStatus: DealStatus.CURRENT
    }
}