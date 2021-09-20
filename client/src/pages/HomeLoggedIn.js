import React, { useContext, useEffect } from "react";
import { useState } from "react";


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
import { UserProvider } from "../context/UserContext";
import { UserListProvider } from "../context/UserListsContext";

export default function HomeLoggedIn({ companies, update, toggleUpdate }) {

  const { user } = useContext(UserProvider.context);

  const [modalOpen, setModalOpen] = useState(false);

  const {list, loadingList} = useContext(UserListProvider.context)

  const toggle = () => setModalOpen(!modalOpen);



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

  const links = makeLinks(list);

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
