import React from "react";
import { useState, useEffect } from "react";

import DashboardItem from "../components/DashboardItem";

import AddItem from "../components/AddItem";
import axios from "axios";
import { useHistory } from "react-router";

import {
  Container,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Row,
} from "reactstrap";
import SearchInventory from "../components/SearchItems";
import { useParams } from "react-router";
import { baseUrl } from "../utils/baseUrl";

export default function Dashboard() {
  const history = useHistory();
  const [alert, setAlert] = useState(false);

  const [data, setData] = useState(null);
  const [company, setCopany] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const [loading, setLoading] = useState(true);

  let { id } = useParams();

  const toggle = () => setModalOpen(!modalOpen);

  function renderItems(arr) {
    if (arr) {
      return arr
        .filter((item) => item.qtyLow < item.qty)
        .map((item) => {
          return (
            <DashboardItem
              key={item._id}
              isLow={false}
              id={item._id}
              name={item.name}
              qty={item.qty}
              link={item.link}
              updateState={updateState}
            />
          );
        });
    }
  }

  function renderItemsLowStock(arr) {
    if (arr) {
      return arr
        .filter((item) => item.qtyLow >= item.qty)
        .map((item) => {
          return (
            <DashboardItem
              key={item._id}
              isLow={true}
              id={item._id}
              name={item.name}
              link={item.link}
              qty={item.qty}
              upc={item.upc}
              updateState={updateState}
            />
          );
        });
    }
  }

  function updateData(res) {
    setData(res);
  }

  function updateState() {
    setAlert((last) => !last);
  }
  useEffect(() => {
    async function fetchApi() {
      const res = await axios.get(`${baseUrl}/company/${id}`, { withCredentials:true, params: id });
      const itemData = res.data.items;
      const companyData = res.data.company;

      setData(itemData);
      setCopany(companyData);
      setLoading(false);
    }

    fetchApi();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [alert, history.location.pathname]);

  const items = renderItems(data);
  const itemsLowStock = renderItemsLowStock(data);

  return (
    <>
      {loading ? <h3>Loading..</h3> : ""}
      {data && !loading ? (
        <Container style={{ marginTop: "8rem" }}>
          <h1>{`${company ? company.name : ""}`}'s Inventory</h1>
          <Button
            style={{ marginBottom: "2rem" }}
            color="info"
            onClick={toggle}
          >
            Add Item
          </Button>
          <SearchInventory
            id={id}
            updateState={updateState}
            updateData={updateData}
          />
          
          <Modal isOpen={modalOpen} toggle={toggle}>
            <ModalHeader toggle={toggle}>Add New Item</ModalHeader>
            <ModalBody>
              <AddItem id={id} updateState={updateState} handleClick={toggle} />
            </ModalBody>
            <ModalFooter>
              <Button color="secondary" onClick={toggle}>
                Cancel
              </Button>
            </ModalFooter>
          </Modal>

          {itemsLowStock && itemsLowStock.length ? (
            <Row>
              <div className="card mb-3">
                <div className="card-body">
                  <h5 className="card-title">LOW STOCK</h5>
                  <Row>{itemsLowStock}</Row>
                </div>
              </div>
            </Row>
          ) : (
            ""
          )}

          {items && items.length ? (
            <Row>
              <div className="card mb-3">
                <div className="card-body">
                  <h5 className="card-title">Your Inventory</h5>
                  <Row>{items}</Row>
                </div>
              </div>
            </Row>
          ) : (
            ""
          )}
        </Container>
      ) : (
        ""
      )}
      {!data && !loading ? (
        <h1>You do not have access to this inventory</h1>
      ) : (
        ""
      )}
    </>
  );
}
