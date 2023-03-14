import { Address, beginCell, Cell, Contract, contractAddress, ContractProvider, Sender, SendMode } from 'ton-core';
import {compile} from "@ton-community/blueprint";
import fs from "fs";
import {Deal} from "./deal-contract";

export type HistoryKeeperConfig = {
    owner_address: Address
};

export async function historyKeeperConfigToCell(config: HistoryKeeperConfig): Promise<Cell> {
    const deal_code: Cell = await compile('Deal')
    return beginCell()
        .storeAddress(config.owner_address)
        .storeUint(0, 64)
        .storeUint(0, 64)
        .storeRef(deal_code)
        .endCell();
}

function getMsgBody(buyer_address: Address): Cell {
    return beginCell()
        .storeUint(1, 32)
        .storeUint(12345, 64)
        .storeAddress(buyer_address)
        .endCell()
}
export class HistoryKeeper implements Contract {
    constructor(readonly address: Address, readonly init?: { code: Cell; data: Cell }) {}

    static createFromAddress(address: Address) {
        return new HistoryKeeper(address);
    }

    static async createFromConfig(config: HistoryKeeperConfig, code: Cell, workchain = 0) {
        const data = await historyKeeperConfigToCell(config);
        const init = { code, data };
        return new HistoryKeeper(contractAddress(workchain, init), init);
    }

    async sendDeploy(provider: ContractProvider, via: Sender, value: bigint, buyer_address: Address) {
        await provider.internal(via, {
            value,
            sendMode: SendMode.PAY_GAS_SEPARATLY,
            body: getMsgBody(buyer_address),
        });
    }

    async sendNewDeal(provider: ContractProvider, via: Sender, value: bigint, buyer_address: Address) {
        const deal_code: Cell = Cell.fromBoc(fs.readFileSync("./compiled/deal.cell"))[0]
        const deal_contract = await Deal.createFromConfig({
            owner_address: via.address as Address,
            history_keeper: this.address,
            buyer_address
        }, deal_code)

        await provider.internal(via, {
            value,
            sendMode: SendMode.PAY_GAS_SEPARATLY,
            body: getMsgBody(buyer_address),
        });

        return deal_contract
    }

    async get_keeper_data(provider: ContractProvider) {
        const {stack} = await provider.get("get_keeper_data", [])
        return stack
    }
}
