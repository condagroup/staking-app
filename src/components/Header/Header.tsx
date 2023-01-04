import React, { useState } from "react"
import { Link } from "react-router-dom"
import { Row, Col, Offcanvas } from "react-bootstrap"
import { HiMenu } from "react-icons/hi"
import { WalletButton } from "../WalletButton"
import { Logo } from "../../assets"
import "./Header.scss"

export const Header: React.FC = () => {
  const [show, setShow] = useState(false)
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)
  const [activeIndex, setActiveIndex] = useState(-1)

  const navLinks = [
    {
      name: "Stake",
      link: "/stake",
    },
    {
      name: "Farm",
      link: "/farm",
    },
    {
      name: "Launchpad",
      link: "/launchpad",
    },
  ]

  return (
    <div className="header-nav-container">
      <Offcanvas className="nav-offcanvas" show={show} onHide={handleClose}>
        <Offcanvas.Header closeVariant="white" closeButton>
          <Offcanvas.Title></Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <ul className="navbar-li-small">
            {navLinks.map((nav, index) => {
              return (
                <li key={index}>
                  <Link
                    to={nav.link}
                    className={activeIndex === index ? "cool-link active" : "cool-link"}
                    onClick={() => setActiveIndex(index)}
                  >
                    {nav.name}
                  </Link>
                </li>
              )
            })}
          </ul>
        </Offcanvas.Body>
      </Offcanvas>
      <Row className="justify-content-around">
        <Col xs={3} lg={3}>
          <Link to="/" className="logo">
            <img width="80px" src={Logo} alt="Logo" />
            <span className="logo__title">Cash Printer</span>
          </Link>
        </Col>
        <Col xs={1} lg={6}>
          <ul className="navbar-li">
            {navLinks.map((nav, index) => {
              return (
                <li key={index}>
                  <Link
                    to={nav.link}
                    className={activeIndex === index ? "cool-link active" : "cool-link"}
                    onClick={() => setActiveIndex(index)}
                  >
                    {nav.name}
                  </Link>
                </li>
              )
            })}
          </ul>
        </Col>
        <Col xs={7} lg={3} className="justify-content-around__switch-btn">
          <WalletButton />
        </Col>
        <Col xs={1} className="menu-icon">
          <div onClick={handleShow}>
            <HiMenu />
          </div>
        </Col>
      </Row>
    </div>
  )
}
