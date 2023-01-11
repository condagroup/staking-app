import React, { useEffect, useState } from "react"
import { Button, Col, Container, Row } from "react-bootstrap"
import { Link, useParams } from "react-router-dom"
import { BynToken } from "../../assets"
import "./View.scss"
import { API } from '../../helpers/api';
import { ProjectDataType, initProjectDatas } from './Create';
import { ContentHeader } from "../../components/LaunchPad"

export const View: React.FC = () => {
  const { viewId } = useParams();
  const [viewProject, setViewProject] = useState<ProjectDataType>(initProjectDatas)
  useEffect(() => {
    API()
      .get(`/projects/${viewId}`)
      .then((res) => {
        console.log(res, "viewInit");
        const { _id, author_name, name, description, access, network, price, project_date } = res.data;
        const viewData =  {
          _id: _id,
          fullName: author_name,
          projectName: name,
          projectDesc: description,
          access,
          network,
          price,
          projectDate: project_date
        }
        setViewProject(viewData);
      })
      .catch((error) => {
        console.log(error);
      })
  }, [viewId]);
  return (
    <div className="launchpad">
      <Container>
        <ContentHeader />
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
        <Row className="row-center">
          <Col lg={8} md={8} sm={12}>
            <div className="detail">
              <div className="detail__content">
                <img src={BynToken} alt="BynToken" width="60" height="60" />
                <h4 className="detail__content__title">{viewProject.projectName}</h4>
                <h5 className="detail__content__guarantee yellow-text">{viewProject.access}</h5>
                <br />
                <div className="detail__content__description">
                  {viewProject.projectDesc}
                </div>
                <div className="detail__content__field">
                  <span>Total Funds</span>
                  <span>
                    <b>166.6BNB</b>
                  </span>
                </div>
                <div className="detail__content__field">
                  <span>Ratio</span>
                  <span>
                    <b>1 BNB = 10909 Test</b>
                  </span>
                </div>
                <div className="detail__content__field">
                  <span>Price</span>
                  <span>
                    <b>{`${viewProject.price}$`}</b>
                  </span>
                </div>
                <div className="detail__content__field">
                  <span>Access</span>
                  <span className="yellow-text">
                    <b>{viewProject.access}</b>
                  </span>
                </div>
                <div className="detail__content__field">
                  <span>Network</span>
                  <span className="yellow-text">
                    <b>{viewProject.network}n</b>
                  </span>
                </div>
                <div className="detail__content__field">
                  <span>Date</span>
                  <span className="yellow-text">
                    <b>{viewProject.projectDate}</b>
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
