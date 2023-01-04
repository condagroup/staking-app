import React, { useEffect, useState } from "react"
import { Button, Col, Container, Row, Modal } from "react-bootstrap"
import { useAccount, useContract, useProvider, useSigner } from "wagmi"
import { formatEther } from "ethers/lib/utils"
import { CashPrinter, Staking } from "../../contracts"
import CashPrinterABI from "../../abis/CashPrinter.json"
import StakingABI from "../../abis/Staking.json"
import config from "../../config"
import { Logo } from "../../assets"
import "./Stake.scss"

export const Stake: React.FC = () => {
  const [percent, setPercent] = useState<number>(0)
  const [lockDays, setLockDays] = useState<number>(0)
  const [stakedAmount, setStakedAmount] = useState<number>(0)
  const [stakedLength, setStakedLength] = useState<number>(0)
  const [isWithdraw, setIsWithdraw] = useState<boolean>(false)

  const [show, setShow] = useState(false)
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  const { isConnected, address } = useAccount()
  const provider = useProvider({ chainId: config.networkId })
  const { data: signerData } = useSigner()
  const tokenContract = useContract<CashPrinter>({
    addressOrName: config.TokenAddrss,
    signerOrProvider: isConnected ? signerData : provider,
    contractInterface: CashPrinterABI,
  })
  const stakingContract = useContract<Staking>({
    addressOrName: config.stakingContractAddress,
    signerOrProvider: isConnected ? signerData : provider,
    contractInterface: StakingABI,
  })
  const [isApprove, setIsApprove] = useState<boolean>(false)
  // give permission to staking contract to transfer token
  const approveAction = async () => {
    await tokenContract.approve(config.stakingContractAddress, 100000000 + "000000000000000000")
    setIsApprove(true)
  }

  useEffect(() => {
    if (!tokenContract.signer) return
    if (address) {
      tokenContract
        .allowance(address, config.stakingContractAddress)
        .then((res) => {
          if (Number(formatEther(res)) > 0) {
            setIsApprove(true)
          }
        })
        .catch(console.error)
    }
  }, [tokenContract, address])

  useEffect(() => {
    if (!stakingContract.signer || !address) return
    stakingContract
      .getDepositLength(address)
      .then((res) => {
        setStakedLength(res.toNumber())
      })
      .catch(console.error)
    stakingContract
      .checkLockedPeriod(address)
      .then((res) => {
        setIsWithdraw(res)
      })
      .catch(console.error)
  }, [stakingContract, address])

  return (
    <div className="stake container">
      <div className="row mt-5 justify-content-center">
        <div className="col-md-8 mb-3">
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Token Staking</Modal.Title>
            </Modal.Header>
            <Modal.Body>Your Staking is done successfully</Modal.Body>
            <Modal.Footer>
              <Button variant="primary" onClick={handleClose}>
                Save Changes
              </Button>
            </Modal.Footer>
          </Modal>
          <Container className="info-container">
            <div className="d-flex justify-content-center">
              <div className="avatar">
                <img src={Logo} alt="avatar" className="avatar__image" />
              </div>
            </div>
            <h6 className="title">Lock Duration</h6>
            <div className="d-flex justify-content-center align-items-center">
              <div className="round"></div>
            </div>
            <div style={{ padding: "0px 20px" }}>
              <Row style={{ padding: "20px 0px" }}>
                <Col sm={6} md={3} lg={3}>
                  <Button
                    className="stake-button"
                    variant={lockDays === 7 ? "success" : "primary"}
                    onClick={(e) => {
                      e.preventDefault()
                      setPercent(5)
                      setLockDays(7)
                    }}
                  >
                    7 days
                  </Button>
                </Col>
                <Col sm={6} md={3} lg={3}>
                  <Button
                    className="stake-button"
                    variant={lockDays === 14 ? "success" : "primary"}
                    onClick={(e) => {
                      e.preventDefault()
                      setPercent(11)
                      setLockDays(14)
                    }}
                  >
                    14 days
                  </Button>
                </Col>
                <Col sm={6} md={3} lg={3}>
                  <Button
                    className="stake-button"
                    variant={lockDays === 30 ? "success" : "primary"}
                    onClick={(e) => {
                      e.preventDefault()
                      setPercent(25)
                      setLockDays(30)
                    }}
                  >
                    30 days
                  </Button>
                </Col>
                <Col sm={6} md={3} lg={3}>
                  <Button
                    className="stake-button"
                    variant={lockDays === 60 ? "success" : "primary"}
                    onClick={(e) => {
                      e.preventDefault()
                      setPercent(55)
                      setLockDays(60)
                    }}
                  >
                    60 days
                  </Button>
                </Col>
              </Row>
              <Row style={{ padding: "10px 0px" }}>
                <Col lg={6}>
                  <Button
                    className="stake-button"
                    variant={lockDays === 90 ? "success" : "primary"}
                    onClick={(e) => {
                      e.preventDefault()
                      setPercent(75)
                      setLockDays(90)
                    }}
                  >
                    90 days
                  </Button>
                </Col>
                <Col lg={6}>
                  <Button
                    className="stake-button"
                    variant={lockDays === 140 ? "success" : "primary"}
                    onClick={(e) => {
                      e.preventDefault()
                      setPercent(90)
                      setLockDays(140)
                    }}
                  >
                    140 days
                  </Button>
                </Col>
              </Row>
            </div>
            <h6 className="title">Select Level</h6>
            <div className="d-flex justify-content-center align-items-center">
              <div className="round"></div>
            </div>
            <div style={{ padding: "0px 20px" }}>
              <Row style={{ padding: "20px 0px" }}>
                <Col sm={4} md={4} lg={4} style={{ padding: "20px 10px" }}>
                  <Button
                    className="stake-button"
                    variant={stakedAmount === 250 ? "success" : "primary"}
                    onClick={(e) => {
                      e.preventDefault()
                      setStakedAmount(250)
                    }}
                  >
                    Level-1: 250CashP
                  </Button>
                </Col>
                <Col sm={4} md={4} lg={4} style={{ padding: "20px 10px" }}>
                  <Button
                    className="stake-button"
                    variant={stakedAmount === 1000 ? "success" : "primary"}
                    onClick={(e) => {
                      e.preventDefault()
                      setStakedAmount(1000)
                    }}
                  >
                    Level-2: 1000CashP
                  </Button>
                </Col>
                <Col sm={4} md={4} lg={4} style={{ padding: "20px 10px" }}>
                  <Button
                    className="stake-button"
                    variant={stakedAmount === 2500 ? "success" : "primary"}
                    onClick={(e) => {
                      e.preventDefault()
                      setStakedAmount(2500)
                    }}
                  >
                    Level-3: 2500CashP
                  </Button>
                </Col>
                <Col sm={4} md={4} lg={4} style={{ padding: "20px 10px" }}>
                  <Button
                    className="stake-button"
                    variant={stakedAmount === 5000 ? "success" : "primary"}
                    onClick={(e) => {
                      e.preventDefault()
                      setStakedAmount(5000)
                    }}
                  >
                    Level-4: 5000CashP
                  </Button>
                </Col>
                <Col sm={4} md={4} lg={4} style={{ padding: "20px 10px" }}>
                  <Button
                    className="stake-button"
                    variant={stakedAmount === 7500 ? "success" : "primary"}
                    onClick={(e) => {
                      e.preventDefault()
                      setStakedAmount(7500)
                    }}
                  >
                    Level-5: 7500CashP
                  </Button>
                </Col>
                <Col sm={4} md={4} lg={4} style={{ padding: "20px 10px" }}>
                  <Button
                    className="stake-button"
                    variant={stakedAmount === 10000 ? "success" : "primary"}
                    onClick={(e) => {
                      e.preventDefault()
                      setStakedAmount(10000)
                    }}
                  >
                    Level-6: 10000CashP
                  </Button>
                </Col>
                <Col sm={4} md={4} lg={4} style={{ padding: "20px 10px" }}>
                  <Button
                    className="stake-button"
                    variant={stakedAmount === 25000 ? "success" : "primary"}
                    onClick={(e) => {
                      e.preventDefault()
                      setStakedAmount(25000)
                    }}
                  >
                    Level-7: 25000CashP
                  </Button>
                </Col>
                <Col sm={4} md={4} lg={4} style={{ padding: "20px 10px" }}>
                  <Button
                    className="stake-button"
                    variant={stakedAmount === 50000 ? "success" : "primary"}
                    onClick={(e) => {
                      e.preventDefault()
                      setStakedAmount(50000)
                    }}
                  >
                    Level-8: 50000CashP
                  </Button>
                </Col>
                <Col sm={4} md={4} lg={4} style={{ padding: "20px 10px" }}>
                  <Button
                    className="stake-button"
                    variant={stakedAmount === 100000 ? "success" : "primary"}
                    onClick={(e) => {
                      e.preventDefault()
                      setStakedAmount(100000)
                    }}
                  >
                    Level-9: 100000CashP
                  </Button>
                </Col>
              </Row>
              <Row>
                <Col>
                  <span className="description">
                    {stakedAmount} * {percent}% / 365DAYS = {(stakedAmount * percent) / 365}
                  </span>
                </Col>
              </Row>
              <Row style={{ padding: "10px 0px" }}>
                <Col>
                  <Button
                    onClick={(e) => {
                      e.preventDefault()
                      if (isApprove) {
                        if (lockDays > 0 && stakedAmount > 0) {
                          stakingContract
                            .stake(stakedAmount + "000000000000000000", lockDays)
                            .then(() => handleShow())
                            .catch(console.error)
                        } else {
                          alert("Select Locked days and Staked amount")
                          return
                        }
                      } else {
                        approveAction()
                      }
                    }}
                    variant="success"
                    style={{ width: "100%" }}
                  >
                    {isApprove ? "Staking" : "Approve"}
                  </Button>
                </Col>
              </Row>
              <Row style={{ padding: "10px 0px" }}>
                <Col>
                  <Button
                    disabled={!isWithdraw}
                    onClick={(e) => {
                      console.log(stakedLength)
                      e.preventDefault()
                      stakingContract
                        .unstakeAll()
                        .then(() => alert("Withdraw All Your Staked Tokens and Rewards"))
                        .catch(console.error)
                    }}
                  >
                    WithdrawAll
                  </Button>
                </Col>
              </Row>
            </div>
          </Container>
        </div>
      </div>
    </div>
  )
}
