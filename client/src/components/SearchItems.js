import React from "react";
import { useState } from "react";

import axios from "axios";

import { Form, FormGroup, Input } from "reactstrap";

export default function SearchInventory({ id, updateData, updateState }) {
  const [search, setSearch] = useState("");

  const handleChange = async (e) => {
    await setSearch(e.target.value);
    if (search.length > 1) {
      const data = {
        search: search.trim(),
      };
      const res = await axios.post(`/search/${id}`, data);
      updateData(res.data);
    } else {
      await updateState();
    }
  };

  return (
    <Form autoComplete="off" style={{ marginBottom: "3rem" }}>
      <FormGroup>
        <Input
          type="text"
          name="search"
          id="search"
          value={search}
          onChange={handleChange}
          placeholder="Search"
        />
      </FormGroup>
    </Form>
  );
}
