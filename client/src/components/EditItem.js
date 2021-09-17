import React from "react";
import { useState } from "react";

import axios from "axios";

import { Button, Form, FormGroup, Label, Input } from "reactstrap";

export default function EditItem({ updateState, data }) {
  const [name, setName] = useState(data.name);
  const [qty, setQty] = useState(data.qty);
  const [link, setLink] = useState(data.link);

  function handleName(e) {
    setName(e.target.value);
  }
  function handleNumber(e) {
    setQty(e.target.value);
  }
  function handleLink(e) {
    setLink(e.target.value);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const update = {
      name,
      qty,
      link,
    };
    updateState();
    await axios.put(`/items/${data.id}`, update);
  }

  return (
    <Form onSubmit={handleSubmit}>
      <FormGroup>
        <Label for="name">Item Name</Label>
        <Input
          type="text"
          name="name"
          id="name"
          value={name || ""}
          onChange={handleName}
          placeholder="Enter item name"
        />
      </FormGroup>
      <FormGroup>
        <Label for="qty">Amount Available</Label>
        <Input
          type="number"
          name="qty"
          id="qty"
          value={qty || ""}
          onChange={handleNumber}
          placeholder="Enter quantity"
        />
      </FormGroup>
      <FormGroup>
        <Label for="link">Link</Label>
        <Input
          type="text"
          name="link"
          id="link"
          value={link || ""}
          onChange={handleLink}
          placeholder="Enter link"
        />
      </FormGroup>
      <Button
        style={{ marginBottom: "1rem", marginTop: "1rem" }}
        disabled={name && qty ? false : true}
      >
        Submit
      </Button>
    </Form>
  );
}
