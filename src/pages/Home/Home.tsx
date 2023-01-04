import React from "react"
import { Container } from "react-bootstrap"
import { WalletButton } from "../../components/WalletButton"
import { CashpStatistics } from "../../components/CashpStatistics"
import "./Home.scss"

export const Home: React.FC = () => {
  return (
    <Container className="home">
      <div className="row mt-5 justify-content-center">
        <div className="col-md-8 mb-3">
          <CashpStatistics />
        </div>
      </div>
      <div className="cardContainer">
        <WalletButton />
        <p className="subHeading">Connect your Wallet to stake tokens</p>
      </div>
      <div className="mt-3">
        <div className="no-pool">No Staking pool available.</div>
      </div>
    </Container>
  )
}
