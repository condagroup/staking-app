import React from "react"
import { Button, Col, Container, Row } from "react-bootstrap"
import { Link } from "react-router-dom"
import { BynToken } from "../../assets"
import "./Launchpad.scss"

export const Launchpad: React.FC = () => {
  return (
    <div className="launchpad">
      <Container>
        <div className="headStyle">
          <div>
            <h1 className="pageName">Launchpad</h1>
            <div className="divider"></div>
          </div>
          <div className="d-flex justify-content-end">
            <Link to="/" className="headLink">
              <button className="actionButton">How to Join</button>
            </Link>
            <Link to="/" className="headLink">
              <button className="actionButton">Level System</button>
            </Link>
            <Link to="/" className="headLink">
              <button className="actionButton">Apply for IDO</button>
            </Link>
            <Link to="/" className="headLink">
              <button className="actionButton">FAQs</button>
            </Link>
          </div>
        </div>
      </Container>
      <Container className="launchpad__content">
        <Row>
          <Col>
            <Button>Claim</Button>
          </Col>
        </Row>
        <Row>
          <Col lg={12}>
            <h2 className="launchpad__title">UPCOMING POOLS</h2>
          </Col>
        </Row>
      </Container>
      <Container className="launchpad__content">
        <Row>
          <Col lg={12}>
            <h2 className="launchpad__title">ENDED POOLS</h2>
          </Col>
        </Row>
      </Container>
      <Container className="launchpad__content">
        <Row>
          <Col sm={12} md={4} lg={4}>
            <div className="pool">
              <div className="pool__content">
                <img src={BynToken} alt="BynToken" width="60" height="60" />
                <h4 className="pool__content__title">Test IGO</h4>
                <h5 className="pool__content__guarantee yellow-text">Guaranteed</h5>
                <br />
                <div className="pool__content__field">
                  <span>Total Funds</span>
                  <span>
                    <b>166.6BNB</b>
                  </span>
                </div>
                <div className="pool__content__field">
                  <span>Ratio</span>
                  <span>
                    <b>1 BNB = 10909 Test</b>
                  </span>
                </div>
                <div className="pool__content__field">
                  <span>Price</span>
                  <span>
                    <b>0.1$</b>
                  </span>
                </div>
                <div className="pool__content__field">
                  <span>Access</span>
                  <span className="yellow-text">
                    <b>Guaranteed</b>
                  </span>
                </div>
                <div className="pool__content__field">
                  <span>Network</span>
                  <span className="yellow-text">
                    <b>Binance Smart Chain</b>
                  </span>
                </div>
                <div className="pool__content__field">
                  <span>Date</span>
                  <span className="yellow-text">
                    <b>TBA</b>
                  </span>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  )
}
