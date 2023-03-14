import {useTonClient} from "./useTonClient";
import {useTonConnect} from "./useTonConnect";
import {useAsyncInitialize} from "./useAsyncInitialize";
import {Address, Cell, OpenedContract} from "ton-core";
import {compile} from "@ton-community/blueprint";
import {Deal} from "../contracts/deal-contract";
import {HistoryKeeper} from "../contracts/history-keeper-contract";
import * as fs from "fs";

export function useDealContract(history_keeper: Address, buyer_address: Address) {
    const { client } = useTonClient()
    const { sender, network } = useTonConnect()

    const dealContract = useAsyncInitialize(async ()=> {
        if (!client) return
        const deal_code: Cell = Cell.fromBoc(fs.readFileSync("../contracts/compiled/deal.cell"))[0]
        const contract = await Deal.createFromConfig({
            owner_address: sender.address as Address,
            history_keeper,
            buyer_address
        }, deal_code)

        return client.open(contract) as OpenedContract<Deal>
    }, [client])
    return {
        sendCancel: ()=>{
            return dealContract?.sendCancel(sender)
        },
        address: dealContract?.address
    }
}