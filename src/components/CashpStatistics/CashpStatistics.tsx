import React from "react"
import { Col, Container, Row } from "react-bootstrap"
import { Logo, U85xTl2 } from "../../assets"
import "./CashpStatistics.scss"

export const CashpStatistics: React.FC = () => {
  return (
    <div className="cashp">
      <Container className="info-container">
        <div className="d-flex justify-content-center">
          <div className="avatar">
            <img src={Logo} alt="avatar" className="avatar__image" />
          </div>
        </div>
        <h6 className="title">CashP Statistics</h6>
        <div className="d-flex justify-content-center align-items-center">
          <div className="round"></div>
        </div>
        <div className="rpcLabel">
          <img src={U85xTl2} className="icon" alt="U85xTl2" />
          Buy CashP tokens to start staking
        </div>
        <div className="text-center mt-4">
          <a target="_blank" rel="noreferrer" href="https://app.uniswap.org/#/swap?chain=mainnet">
            <button className="buyNow"> Buy Now</button>
          </a>
        </div>
        <Container>
          <Row>
            <Col sm={12} md={4} lg={4}>
              <div className="text-center mt-4">
                <div className="tokenTitle">Price</div>
                <div className="tokenAmount">1111</div>
              </div>
            </Col>
            <Col sm={12} md={4} lg={4}>
              <div className="text-center mt-4">
                <div className="tokenTitle">Market Cap</div>
                <div className="tokenAmount">1111</div>
              </div>
            </Col>
            <Col sm={12} md={4} lg={4}>
              <div className="text-center mt-4">
                <div className="tokenTitle"> 24Hr Change</div>
                <div className="tokenAmount">1111%</div>
              </div>
            </Col>
          </Row>
        </Container>
      </Container>
    </div>
  )
}
