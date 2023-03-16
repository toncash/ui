import {useTonClient} from "./useTonClient";
import {useTonConnect} from "./useTonConnect";
import {useAsyncInitialize} from "./useAsyncInitialize";
import {Address, beginCell, Cell, OpenedContract} from "ton-core";

import {accountCode, dealCode, masterAddress} from "../contracts/encode-contracts-code";
import {Deal} from "../contracts/Deal";
import {useAccount} from "./useAccount";
import {Account} from "../contracts/Account";

export function useDealContract(buyer_address: Address) {
    const { client } = useTonClient()
    const { sender, wallet } = useTonConnect()
    const code: Cell = Cell.fromBase64(accountCode)

    const account = useAsyncInitialize(async ()=> {
        if (!client || !wallet) return

        const contract = await Account.createFromConfig({
            owner_address: Address.parse(wallet),
            deal_code: Cell.fromBase64(dealCode),
            master_address: Address.parse(masterAddress)
        }, code)
        return client.open(contract) as OpenedContract<Account>
    }, [client, wallet])

    const dealContract = useAsyncInitialize(async ()=> {
        if (!account || !client) return
        const deal_code: Cell = Cell.fromBase64(dealCode)
        const contract = await Deal.createFromConfig({
            owner_address: sender.address as Address,
            account_address: account.address ? account.address : Address.parse(""),
            buyer_address,
            cell_with_master: beginCell().storeAddress(Address.parse(masterAddress)).endCell()
        }, deal_code)

        return client.open(contract) as OpenedContract<Deal>
    }, [client, account])
    return {
        sendCancel: ()=>{
            return dealContract?.sendCancel(sender)
        },
        sendComplete: ()=>{
            return dealContract?.sendComplete(sender)
        },
        address: dealContract?.address
    }
}