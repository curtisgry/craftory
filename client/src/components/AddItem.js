import React from "react";
import { useState } from "react";
import axios from "axios";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";

export default function AddItem({
  id,
  categories,
  className,
  handleClickModalBody,
  handleClick,
  updateState,
}) {
  const [name, setName] = useState("");
  const [qty, setQty] = useState(0);
  const [qtyLow, setQtyLow] = useState(0);
  const [link, setLink] = useState("");

  function handleName(e) {
    setName(e.target.value);
  }
  function handleNumber(e) {
    setQty(e.target.value);
  }
  function handleNumberLow(e) {
    setQtyLow(e.target.value);
  }
  function handleLink(e) {
    setLink(e.target.value);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const data = {
      name,
      qty,
      qtyLow,
      link,
      company: id,
    };

    updateState();
    await axios.post("/items", data);

    setName("");
    setQty(0);
    setLink("");
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
        <Label for="qtyLow">Low Stock Threshold</Label>
        <Input
          type="number"
          name="qtyLow"
          id="qtyLow"
          value={qtyLow || ""}
          onChange={handleNumberLow}
          placeholder="Enter quantity"
        />
      </FormGroup>
      <FormGroup>
        <Label for="link">Link for re-order</Label>
        <Input
          type="text"
          name="link"
          id="link"
          value={link || ""}
          onChange={handleLink}
          placeholder="Enter link"
        />
      </FormGroup>
      <Button disabled={name && qty ? false : true}>Submit</Button>
    </Form>
  );
}
