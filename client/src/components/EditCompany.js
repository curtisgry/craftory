import React from "react";
import { useState } from "react";
import axios from "axios";

import { Button, Form, FormGroup, Label, Input } from "reactstrap";

export default function EditCompany({ toggleUpdate, data }) {
  const [name, setName] = useState(data.name);
  const [location, setLocation] = useState(data.location);
  const [email, setEmail] = useState(data.email);

  function handleName(e) {
    setName(e.target.value);
  }
  function handleLocation(e) {
    setLocation(e.target.value);
  }
  function handleEmail(e) {
    setEmail(e.target.value);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const update = {
      name,
      location,
      email,
    };

    toggleUpdate();
    await axios.put(`/company/${data._id}`, update);
  }

  async function handleDelete() {
    toggleUpdate();

    await axios.delete(`/company/${data._id}`);
  }

  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label for="name">Company Name</Label>
          <Input
            type="text"
            name="name"
            id="name"
            value={name || ""}
            onChange={handleName}
            placeholder="Enter company name"
          />
        </FormGroup>
        <FormGroup>
          <Label for="location">Location</Label>
          <Input
            type="text"
            name="location"
            id="location"
            value={location || ""}
            onChange={handleLocation}
            placeholder="Enter location"
          />
        </FormGroup>
        <FormGroup style={{ marginBottom: "1rem" }}>
          <Label for="email">Email</Label>
          <Input
            type="email"
            name="email"
            id="email"
            value={email || ""}
            onChange={handleEmail}
            placeholder="Enter email"
          />
        </FormGroup>
        <Button style={{ marginBottom: "1rem" }} disabled={name ? false : true}>
          Submit
        </Button>
      </Form>
      <Button
        onClick={handleDelete}
        color="danger"
        style={{ marginBottom: "1rem" }}
      >
        Delete
      </Button>
    </div>
  );
}
