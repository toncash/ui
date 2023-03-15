import {useTonClient} from "./useTonClient";
import {useTonConnect} from "./useTonConnect";
import {useAsyncInitialize} from "./useAsyncInitialize";
import {Address, Cell, OpenedContract} from "ton-core";
import {compile} from "@ton-community/blueprint";
import {HistoryKeeper} from "../contracts/history-keeper-contract";
import {hisrotyKeeperCode} from "../contracts/encode-contracts-code";

export function useHistoryKeeper() {
    const { client } = useTonClient()
    const { sender, wallet, network } = useTonConnect()

    const historyKeeper = useAsyncInitialize(async ()=> {
        if (!client || !wallet) return
        const code: Cell = Cell.fromBase64(hisrotyKeeperCode)
        const contract = await HistoryKeeper.createFromConfig({owner_address: sender.address as Address}, code)
        return client.open(contract) as OpenedContract<HistoryKeeper>
    }, [client, wallet])

    // return historyKeeper

    return {
        address: historyKeeper?.address,
        sendNewDeal: (buyer_address: Address, value: bigint)=>{
            console.log("new deal step1")
            return historyKeeper?.sendNewDeal(sender, value, buyer_address)
        },
        sendDeploy: (buyer_address: Address, value: bigint)=>{
            console.log("step1")
            return historyKeeper?.sendDeploy(sender, value, buyer_address)
        },
        getDealAddress: async (buyer_address: Address)=>{
            const res = await historyKeeper?.getDealAddress(sender, buyer_address)
            console.log(res?.address.toString())
        },
    }
}