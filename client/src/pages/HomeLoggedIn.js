import React, { useContext } from "react";
import { useState, useEffect } from "react";

import axios from "axios";

import {
  Button,
  Container,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "reactstrap";
import AddCompany from "../components/AddCompany";
import CompanyListItem from "../components/CompanyListItem";
import { UserProvider, useGetUser } from "../context/UserContext";

export default function HomeLoggedIn({ companies, update, toggleUpdate }) {
  // const [userCompanies, setUserCompanies] = useState(null);
  const { user, loading } = useContext(UserProvider.context);

  const [modalOpen, setModalOpen] = useState(false);

  const toggle = () => setModalOpen(!modalOpen);

  // useEffect(() => {
  //   (async function fetchData() {
  //     const res = await axios.get("/nav");
  //     const { companies } = res.data;
  //     if(companies){
  //       setUserCompanies([...companies]);
  //     }

  //   })();

  // }, []);

  useEffect(() => {
    console.log(user);
  }, [loading]);

  const makeLinks = (arr) => {
    if (arr) {
      return arr.map((company) => {
        return (
          <CompanyListItem
            key={company._id}
            data={company}
            update={update}
            toggleUpdate={toggleUpdate}
          />
        );
      });
    }
  };

  const links = makeLinks(companies);

  return (
    <Container>
      <div className="px-4 py-5 my-5 text-center">
        {user.username && <h1>Welcome {user.username}</h1>}
        <Modal isOpen={modalOpen} toggle={toggle}>
          <ModalHeader toggle={toggle}>Add New Company</ModalHeader>
          <ModalBody>
            <AddCompany
              toggle={toggle}
              update={update}
              toggleUpdate={toggleUpdate}
            />
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={toggle}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>

        <h1 className="display-5 fw-bold">Home</h1>
        <div className="col-lg-6 mx-auto">
          <p className="lead mb-4">Your Inventory Lists</p>
          <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
            <button
              onClick={toggle}
              type="button"
              className="btn btn-primary btn-lg px-4 gap-3"
            >
              New Inventory
            </button>
          </div>
        </div>
        {links}
      </div>
    </Container>
  );
}
