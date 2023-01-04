import React, { useEffect } from "react"
import { useAccount, useConnect, useContract, useNetwork, useProvider, useSigner, useSwitchNetwork } from "wagmi"
// import * as ethers from "ethers"
import { CashPrinter } from "../../contracts"
import CashPrinterABI from "../../abis/CashPrinter.json"
import config from "../../config"
import "./WalletButton.scss"

export const WalletButton: React.FC = () => {
  const { isConnected } = useAccount()
  const { connect, connectors } = useConnect()
  const { switchNetwork } = useSwitchNetwork()
  const { chain } = useNetwork()
  // const [rewards, setRewards] = useState<ethers.BigNumber>()

  const provider = useProvider({ chainId: config.networkId })
  const { data: signerData } = useSigner()

  const tokenContract = useContract<CashPrinter>({
    addressOrName: config.TokenAddrss,
    signerOrProvider: isConnected ? signerData : provider,
    contractInterface: CashPrinterABI,
  })

  useEffect(() => {
    if (!tokenContract.signer) return
  }, [tokenContract])

  return isConnected ? (
    config.networkId === chain?.id ? (
      <button
        className="wallet-connect-btn"
        onClick={async (e) => {
          e.preventDefault()
          if (!tokenContract.signer) return
        }}
      >
        Connected
      </button>
    ) : (
      <button
        className="wallet-connect-btn"
        onClick={(event) => {
          event.preventDefault()
          switchNetwork?.(config.networkId)
        }}
      >
        SwitchNetwork
      </button>
    )
  ) : (
    <button
      className="wallet-connect-btn"
      onClick={(e) => {
        e.preventDefault()
        const [metamaskConnector] = connectors.filter((_connector) => _connector.id === "injected")
        if (!metamaskConnector) return
        connect({ connector: metamaskConnector })
      }}
    >
      Connect Wallet
    </button>
  )
}
