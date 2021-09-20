import React, { useContext } from "react";
import { useState } from "react";
import axios from "axios";

import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import { UserListProvider } from "../context/UserListsContext";
import { baseUrl } from "../utils/baseUrl";
export default function EditCompany({ data }) {
  const [name, setName] = useState(data.name);
  const [location, setLocation] = useState(data.location);


  const {  setLoadingList } = useContext(UserListProvider.context)

  function handleName(e) {
    setName(e.target.value);
  }
  function handleLocation(e) {
    setLocation(e.target.value);
  }


  async function handleSubmit(e) {
    e.preventDefault();
    const update = {
      name,
      location,
    };

    setLoadingList(true)
    await axios.put(`${baseUrl}/company/${data._id}`, update);
  }

  async function handleDelete() {

    setLoadingList(true)
    await axios.delete(`${baseUrl}/company/${data._id}`);
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
