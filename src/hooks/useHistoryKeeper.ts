import {useTonClient} from "./useTonClient";
import {useTonConnect} from "./useTonConnect";
import {useAsyncInitialize} from "./useAsyncInitialize";
import {Address, Cell, OpenedContract} from "ton-core";
import {compile} from "@ton-community/blueprint";
import {HistoryKeeper} from "../contracts/history-keeper-contract";
import {hisrotyKeeperCode} from "../contracts/encode-contracts-code";

export function useHistoryKeeper() {
    const { client } = useTonClient()
    const { sender, network } = useTonConnect()

    const historyKeeper = useAsyncInitialize(async ()=> {
        console.log("kep")
        if (!client) return
        const code: Cell = Cell.fromBase64(hisrotyKeeperCode)
        console.log(code)
        const contract = await HistoryKeeper.createFromConfig({owner_address: sender.address as Address}, code)
        console.log("contract")
        console.log(contract)
        return client.open(contract) as OpenedContract<HistoryKeeper>
    }, [client])

    // return historyKeeper

    return {
        address: historyKeeper?.address,
        sendNewDeal: (buyer_address: Address, value: bigint)=>{
            return historyKeeper?.sendNewDeal(sender, value, buyer_address)
        },
        sendDeploy: (buyer_address: Address, value: bigint)=>{
            return historyKeeper?.sendDeploy(sender, value, buyer_address)
        },
    }
}