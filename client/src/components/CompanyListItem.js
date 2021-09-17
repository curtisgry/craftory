import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button, Card, CardBody, Collapse } from "reactstrap";
import EditCompany from "./EditCompany";

export default function CompanyListItem({ data, toggleUpdate }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div className="list-group mt-3 mb-3 col-sm-8 offset-sm-2">
      <Link
        to={`/dashboard/${data._id}`}
        className="list-group-item list-group-item-action d-flex gap-3 py-3"
      >
        <div className="d-flex gap-2 w-100 justify-content-center">
          <div>
            <h6 className="mb-0">{data.name}</h6>
            <p className="mb-0 opacity-75">{data.location}</p>
          </div>
        </div>
      </Link>
      <Button color="primary" onClick={toggle}>
        Edit
      </Button>
      <Collapse isOpen={isOpen}>
        <Card>
          <CardBody>
            <EditCompany toggleUpdate={toggleUpdate} data={data} />
          </CardBody>
        </Card>
      </Collapse>
    </div>
  );
}
