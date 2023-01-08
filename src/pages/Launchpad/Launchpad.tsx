import React, { useEffect, useState } from "react"
import { Button, Col, Container, Row } from "react-bootstrap"
import { Link, useNavigate } from 'react-router-dom';
import { BynToken } from "../../assets"
import "./Launchpad.scss"
import { API } from '../../helpers/api';
import { ProjectDataType, initProjectDatas } from './Create';

export const Launchpad: React.FC = () => {
  const navigate = useNavigate();
  const [launchedProjects, setLaunchedProjects] = useState<ProjectDataType[]>([initProjectDatas])
  useEffect(() => {
    API()
      .get('/projects')
      .then((res) => {
        console.log(res, "init");
        const initDatas = res.data.map((item: any, index: number) => {
          const { _id, author_name, name, description, access, network, price, project_date } = item;
          return {
            _id: _id,
            fullName: author_name,
            projectName: name,
            projectDesc: description,
            access,
            network,
            price,
            projectDate: project_date
          }
        });
        setLaunchedProjects(initDatas);
      })
      .catch((error) => {
        console.log(error);
      })
  }, []);
  const viewDetail = (viewId?: string) => {
    navigate(`/launchpad/view/${viewId}`);
  }
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
        <div className="launchpad__project">
          <div>
            <Button>Claim</Button>
          </div>
          <div>
            <Link to="/launchpad/create" className="headLink">
              <Button>Launch Project</Button>
            </Link>
          </div>
        </div>
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
          {
            launchedProjects.map((item: ProjectDataType, index: number) => (
              <Col sm={12} md={4} lg={4} key={index}>
                <div className="pool" onClick={ () => viewDetail(item._id)}>
                  <div className="pool__content">
                    <img src={BynToken} alt="BynToken" width="60" height="60" />
                    <h4 className="pool__content__title">{item.projectName}</h4>
                    <h5 className="pool__content__guarantee yellow-text">{item.access}</h5>
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
                        <b>{`${item.price}$`}</b>
                      </span>
                    </div>
                    <div className="pool__content__field">
                      <span>Access</span>
                      <span className="yellow-text">
                        <b>{item.access}</b>
                      </span>
                    </div>
                    <div className="pool__content__field">
                      <span>Network</span>
                      <span className="yellow-text">
                        <b>{item.network}n</b>
                      </span>
                    </div>
                    <div className="pool__content__field">
                      <span>Date</span>
                      <span className="yellow-text">
                        <b>{item.projectDate}</b>
                      </span>
                    </div>
                  </div>
                </div>
              </Col>
            ))
          }
          
        </Row>
      </Container>
    </div>
  )
}
