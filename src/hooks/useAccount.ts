import {useTonClient} from "./useTonClient";
import {useTonConnect} from "./useTonConnect";
import {useAsyncInitialize} from "./useAsyncInitialize";
import {Address, Cell, OpenedContract} from "ton-core";
import {accountCode, dealCode, masterAddress} from "../contracts/encode-contracts-code";
import {Account} from "../contracts/Account";

export function useAccount() {
    const { client } = useTonClient()
    const { sender, wallet, network } = useTonConnect()
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


    return {
        address: account?.address,
        sendNewDeal: (buyer_address: Address, value: bigint)=>{
            return account?.sendNewDeal(sender, value, buyer_address)
        }
    }
}