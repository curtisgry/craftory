import React, { useContext } from "react";
import { useState } from "react";
import axios from "axios";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import { UserListProvider } from "../context/UserListsContext";

export default function AddCompany({ toggle, toggleUpdate }) {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const { loadingList, setLoadingList } = useContext(UserListProvider.context)

  function handleName(e) {
    setName(e.target.value);
  }
  function handleLocation(e) {
    setLocation(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log('ran submit')

    const data = {
      name,
      location,
    };
    toggleUpdate();
    toggle();

      setName("");
      setLocation("");
      setLoadingList(true)
      
    axios.post("/company", data)
    .then(res => {
      console.log('insubmit',loadingList)
    }).catch(e => console.log(e))
 
   
    
    
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
        <Button disabled={name ? false : true}>
        Submit
      </Button>
      </Form>
     
    </div>
  );
}
