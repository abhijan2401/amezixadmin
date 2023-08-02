import React, { useState, useEffect } from "react";
import { getNotes } from "../../../API";
// import "./UserBanner.css";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import Banner from "../Banner";
import Filter from "../../../Components/Filter/Filter";
import Modal from "../Modals/AddImage/bannerModal";
import EditModal from "../Modals/EditBanner/EditModal";
import AddIcon from "@mui/icons-material/Add";
import CreateIcon from "@mui/icons-material/Create";
import DeleteIcon from "@mui/icons-material/Delete";
import Switch from "@mui/material/Switch";

import pic from "../../../assets/banner.png";

const UserBanner = () => {
  const [backbanner, setbackBanner] = useState("");
  const [modal, setModal] = useState(false);
  const [editmodal, setEditModal] = useState(false);
  const [checked, setChecked] = React.useState(true);

  const closeModal = () => setModal(false);
  const closeEditModal = () => setEditModal(false);
  const [deliveryBanner, setDeliveryBanner] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getNotes("banner");
        setDeliveryBanner(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  return (
    <div>
      {backbanner === "" ? (
        <>
          <div className="user-banner-header">
            <Filter />
            <p className="banner-para-header">
              <ArrowBackIosIcon
                onClick={() => setbackBanner("backBanner")}
                id="backToBanner"
              />
              Delivery Banner
            </p>
          </div>
          <div className="banner-content">
            <div className="user-banner-content">
              <div className="background-image">
                <button className="learn-more-btn">Learn More</button>
              </div>
              <div className="addicon" onClick={() => setModal(true)}>
                <AddIcon style={{ color: "white" }} />
              </div>
            </div>

            <div className="UserBanner-list">
              <table style={{ width: "100%" }}>
                <tr>
                  <th>#Id</th>
                  <th>Title</th>
                  <th>Learn More</th>
                  <th>Latest Update</th>
                  <th>Images</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
                {deliveryBanner.map((deliveryBanner, index) => {
                  return (
                    <tr key={index}>
                      {deliveryBanner.role === "Delivery" ? (
                        <>
                          <td>{deliveryBanner.id}</td>
                          <td>{deliveryBanner.title}</td>
                          <td>
                            <Switch
                              checked={
                                deliveryBanner.learnmoreactive === "true"
                                  ? checked
                                  : null
                              }
                            />
                          </td>
                          <td>{deliveryBanner.lastupdate}</td>
                          <td>
                            <img
                              src={deliveryBanner.image}
                              alt="loading...."
                              style={{ width: "100px", height: "50px" }}
                            />
                          </td>
                          <td>
                            <Switch
                              checked={
                                deliveryBanner.status === "active"
                                  ? checked
                                  : null
                              }
                            />
                          </td>
                          <td>
                            <CreateIcon
                              id="createicon"
                              onClick={() => setEditModal(true)}
                            />
                            <DeleteIcon id="deleteicon" />
                          </td>
                        </>
                      ) : null}
                    </tr>
                  );
                })}
              </table>
            </div>
          </div>
          {modal && <Modal closeModal={closeModal} role={"Delivery"} />}
          {editmodal && <EditModal closeEditModal={closeEditModal} />}
        </>
      ) : (
        <Banner />
      )}
    </div>
  );
};

export default UserBanner;
