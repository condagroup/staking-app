import React, { useEffect, useState, useMemo } from "react"
import { Button, Col, Container, Row } from "react-bootstrap"
import { Link, useParams } from "react-router-dom"
import { BynToken } from "../../assets"
import "./View.scss"
import { API } from '../../helpers/api';
import { ProjectDataType, initProjectDatas } from './Create';
import { ContentHeader } from "../../components/LaunchPad"
import DataTable from "react-data-table-component"
import { TableColumn } from "react-data-table-component/dist/src/DataTable/types"
import { Form } from "react-bootstrap"

import "./Manage.scss"

export const Manage: React.FC = () => {
  const [res, setRes] = useState<ProjectDataType[]>([initProjectDatas]);
  const deleteRow = (event: any) => {
    console.log(event.target.id);
  }
  const viewRow = (event: any) => {
    console.log(event.target.id);
  }
  const columns = useMemo<TableColumn<ProjectDataType>[]>(
    () => [
      {
        name: 'Name',
        selector: (row: ProjectDataType) => row.projectName,
        sortable: true,
        grow: 2,
      },
      {
        name: 'CreatedBy',
        selector: (row: ProjectDataType) => row.fullName,
        sortable: true,
      },
      {
        name: 'price',
        selector: (row: ProjectDataType) => row.price,
        sortable: true,
        right: true,
      },
      {
        name:"Action",
        cell: (row: ProjectDataType) => <div className="btn-group" role="group" aria-label="Basic example">
        <button type="button" id={row._id} onClick={viewRow} className="btn btn-warning">View</button>
        <button type="button" id={row._id} onClick={deleteRow} className="btn btn-danger">Delete</button>
      </div>,
        ignoreRowClick: true,
        allowOverflow: true,
        selector: undefined
      },
    ],[],
    );
  useEffect(() => {
    API()
      .get(`/projects`)
      .then((res) => {
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
        setRes(initDatas);
      })
      .catch((error) => {
        console.log(error);
      })
  }, []);
  const handleOnChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    let filterData = [] as ProjectDataType[];
    switch (event.target.value) {
      case "upcoming":
        filterData = res.filter((item) => {
          return Date.parse(item.projectDate) > Date.now()
        });
        console.log(filterData);
        setRes(filterData);
        break;
      case "ended":
        filterData = res.filter((item) => {
          return Date.parse(item.projectDate) <= Date.now()
        });
        console.log(filterData);
        setRes(filterData);
        break;
      default:
        filterData = res;
        setRes(filterData);
        console.log(filterData);
        break;
    }
  }
  return (
    <div className="launchpad">
      <Container>
        <ContentHeader />
      </Container>
      <Container className="launchpad__content">
        <div className="searchbar">
          <Form.Select className="type_form" aria-label="Default select example" onChange={(event) => handleOnChange(event)}>
            <option value="all">All</option>
            <option value="upcoming">Upcoming</option>
            <option value="ended">Ended</option>
          </Form.Select>
        </div>
        <Row className="row-center">
          <DataTable
            data={res}
            columns={columns}
            theme="dark"
            pagination
          />
        </Row>
      </Container>
    </div>
  )
}
