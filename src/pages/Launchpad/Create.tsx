import React, { useState } from "react"
import { Container, Row, Col, Form, Stack, Button, InputGroup } from "react-bootstrap"
import "./Create.scss"
import { API } from "../../helpers/api";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { ContentHeader } from "../../components/LaunchPad";

export interface ProjectDataType {
  _id?: string,
  fullName: string,
  projectName: string,
  projectDesc: string,
  access: string,
  network: string,
  price: number,
  projectDate: string
}

export const initProjectDatas: ProjectDataType = {
  fullName: "",
  projectName: "",
  projectDesc: "",
  access: "Guaranteed",
  network: "Binance Smart Chain",
  price: 0,
  projectDate: ""
};

export const Create: React.FC = () => {
  const navigate = useNavigate();
  const[projectDatas, setProjectDatas] = useState<ProjectDataType>(initProjectDatas);

  const handleChange = (event: any) => {
    const targetName = event.target.name;
    let targetValue = event.target.value;
    setProjectDatas({...projectDatas, [targetName]: targetValue});
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    let formData = new FormData();
    const { fullName, projectName,  projectDesc, access, price, network, projectDate } = projectDatas
    formData.append("fullName", fullName);
    formData.append("projectName", projectName);
    formData.append("projectDesc", projectDesc);
    formData.append("access", access);
    formData.append("price", price?.toString());
    formData.append("network", network);
    formData.append("projectDate", projectDate);
    await axios({
      url: process.env.REACT_APP_SERVER_URL + "/api/projects",
      method: "POST",
      data: formData,
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    .then((res) => {
      navigate('/launchpad');
    })
  };

  return (
    <div>
      <Container>
        <ContentHeader />
      </Container>
      <div className="create container">
          <Row className="justify-content-center">
            <Col md="8">
            <Form onSubmit={handleSubmit}>
              <Container className="info-container">
                <Stack gap={3}>
                  <Row>
                    <Form.Group className="mb-2">
                      <Form.Label>Full Name</Form.Label>
                      <Form.Control type="text" name="fullName" placeholder="Enter your full name" value={projectDatas.fullName} onChange={handleChange} required />
                    </Form.Group>
                  </Row>
                  <Row>
                    <Form.Group className="mb-2">
                      <Form.Label>Project Name</Form.Label>
                      <Form.Control type="text" name="projectName" placeholder="Enter your project name" value={projectDatas.projectName} onChange={handleChange} required />
                    </Form.Group>
                  </Row>
                  <Row>
                    <Form.Group className="mb-2">
                      <Form.Label>Project Desciption</Form.Label>
                      <Form.Control type="text" name="projectDesc" placeholder="Enter about your project description quickly" value={projectDatas.projectDesc} onChange={handleChange} required />
                    </Form.Group>
                  </Row>
                  <Row>
                    <Form.Group className="mb-2">
                      <Form.Label>Access</Form.Label>
                      <Form.Select name="access" value={projectDatas.access} onChange={handleChange}>
                        <option value="Guaranteed">Guaranteed</option>
                      </Form.Select>
                    </Form.Group>
                  </Row>
                  <Row>
                    <Form.Group className="mb-2">
                      <Form.Label>Network</Form.Label>
                      <Form.Control type="text" name="network" disabled value={projectDatas.network} onChange={handleChange} required />
                    </Form.Group>
                  </Row>
                  <Row>
                    <Form.Group className="mb-2">
                      <Form.Label>Price</Form.Label>
                      <InputGroup>
                        <Form.Control type="text" name="price" placeholder="Enter price" value={projectDatas.price?.toString()} onChange={handleChange} required />
                        <InputGroup.Text>$</InputGroup.Text>
                      </InputGroup>
                    </Form.Group>
                  </Row>
                  <Row>
                    <Form.Group className="mb-2">
                      <Form.Label>Date</Form.Label>
                      <Form.Control type="date" name="projectDate" placeholder="Enter date" value={projectDatas.projectDate} onChange={handleChange} required />
                    </Form.Group>
                  </Row>
                  <Row>
                    <div>
                      <Button type="submit">Submit</Button>
                    </div>
                  </Row>
                </Stack>
              </Container>
              </Form>
            </Col>
          </Row>
      </div>
    </div>
  )
}
