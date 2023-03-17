import { useTonClient } from "./useTonClient"
import { useTonConnect } from "./useTonConnect"
import { useAsyncInitialize } from "./useAsyncInitialize"
import { Address, OpenedContract } from "ton-core"
import { masterAddress } from "../contracts/encode-contracts-code"
import { Master } from "../contracts/Master"

export function useMaster() {
  const { client } = useTonClient()
  const { sender, wallet, network } = useTonConnect()

  const master = useAsyncInitialize(async () => {
    if (!client || !wallet) return
    const contract = new Master(Address.parse(masterAddress))
    return client.open(contract) as OpenedContract<Master>
  }, [client, wallet])

  return {
    address: master?.address,
    sendNewAccount: (buyer_address: Address, value: bigint) => {
      return master?.sendNewAccount(sender, value, buyer_address)
    },
    isDeployed: master?.address ? client?.isContractDeployed( master?.address ) : false
  }
}
