import {useTonClient} from "./useTonClient";
import {useTonConnect} from "./useTonConnect";
import {useAsyncInitialize} from "./useAsyncInitialize";
import {Address, Cell, OpenedContract} from "ton-core";
import {compile} from "@ton-community/blueprint";
import {HistoryKeeper} from "../contracts/history-keeper-contract";
import fs from "fs";

export function useHistoryKeeper() {
    const { client } = useTonClient()
    const { sender, network } = useTonConnect()

    const historyKeeper = useAsyncInitialize(async ()=> {
        if (!client) return
        const code: Cell = Cell.fromBoc(fs.readFileSync("../contracts/compiled/history-keeper.cell"))[0]
        const contract = await HistoryKeeper.createFromConfig({owner_address: sender.address as Address}, code)

        return client.open(contract) as OpenedContract<HistoryKeeper>
    }, [client])

    return {
        sendNewDeal: (buyer_address: Address, value: bigint)=>{
            return historyKeeper?.sendNewDeal(sender, value, buyer_address)
        }
    }
}