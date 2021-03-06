import React from "react";
import { useState } from "react";

import axios from "axios";

import { Form, FormGroup, Input } from "reactstrap";

import { baseUrl } from "../utils/baseUrl";

export default function SearchInventory({ id, updateData, updateState }) {
  const [search, setSearch] = useState("");

  const handleChange = async (e) => {
    await setSearch(e.target.value);
    if (search.length > 2) {
      const data = {
        search: search.trim(),
      };
      const res = await axios.post(`${baseUrl}/search/${id}`, data);
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
          onSelect={handleChange}
          placeholder="Search"
        />
      </FormGroup>
    </Form>
  );
}
