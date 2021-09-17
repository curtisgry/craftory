import axios from "axios";
import React from "react";
import { useState } from "react";
import EditItem from "./EditItem";
import {
  Col,
  Collapse,
  Button,
  CardBody,
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardText,
} from "reactstrap";

export default function DashboardItem({
  id,
  name,
  qty,
  link,
  updateState,
  isLow,
}) {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  function handleClick() {
    axios.delete(`/items/${id}`);
    updateState();
  }

  const buttonStyles = {
    marginBottom: "1rem",
    marginRight: "1rem",
  };

  return (
    <Col sm="6" md="4" style={{ marginBottom: "2rem" }}>
      <Card inverse color={`${isLow ? "danger" : "success"}`}>
        <CardHeader>{name}</CardHeader>
        <CardBody>
          <CardTitle tag="h5">QTY: {qty}</CardTitle>
          <CardText>
            {link ? (
              <a
                className="link-info"
                href={link}
                target="_blank"
                rel="noreferrer"
              >
                Order More
              </a>
            ) : null}
          </CardText>
        </CardBody>
        <CardFooter>
          <Button
            color={`${isLow ? "warning" : "danger"}`}
            size="sm"
            onClick={handleClick}
            style={buttonStyles}
          >
            Delete
          </Button>
          <Button
            color="primary"
            size="sm"
            onClick={toggle}
            style={buttonStyles}
          >
            Edit
          </Button>
          <Collapse isOpen={isOpen}>
            <EditItem
              updateState={updateState}
              data={{ id, name, qty, link }}
            />
          </Collapse>
        </CardFooter>
      </Card>
    </Col>
  );
}
