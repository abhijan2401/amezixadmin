import React, { useState, useEffect } from "react";
import { getNotes, deleteData } from "../../../API";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import Banner from "../Banner";
import Filter from "../../../Components/Filter/Filter";
import Modal from "../Modals/AddImage/bannerModal";
import EditModal from "../Modals/EditBanner/EditModal";
import Loader from "../../../Components/Loader/Loader";
// import "./UserBanner.css";

import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import AddIcon from "@mui/icons-material/Add";
import CreateIcon from "@mui/icons-material/Create";
import DeleteIcon from "@mui/icons-material/Delete";
import Switch from "@mui/material/Switch";

const UserBanner = () => {
  const [backbanner, setbackBanner] = useState("");
  const [modal, setModal] = useState(false);
  const [editmodal, setEditModal] = useState(false);
  const [checked, setChecked] = React.useState(true);

  const closeModal = () => setModal(false);
  const closeEditModal = () => setEditModal(false);
  const [deliveryBanner, setDeliveryBanner] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedData, setSelectedData] = useState(null);

  const deleteNotify = () => toast("Item is Deleted !!", {
    position:"top-center" ,autoClose:"3000"
  });
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

  // Deleting the Table data
  const delete_Data = async (id, table_name) => {
    console.log("id and tablename", id, table_name);
    try {
      await deleteData({ id, table_name });
      const response = await getNotes("banner");
      setDeliveryBanner(response.data);
      deleteNotify();
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Edit Table
  const editTable = (id) => {
    let newdata = deliveryBanner.find((element) => {
      return element.id === id;
    });
    setSelectedData(newdata);
    console.log(newdata);
    setEditModal(true);
  };

  return (
    <div>
      {backbanner === "" ? (
        <>
          <div className="user-banner-header">
            {/* <Filter /> */}
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
            {loading ? (
              <Loader />
            ) : (
              <>
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
                                  onClick={() => editTable(deliveryBanner.id)}
                                />
                                <DeleteIcon
                                  id="deleteicon"
                                  onClick={() =>
                                    delete_Data(deliveryBanner.id, "banner")
                                  }
                                />
                              </td>
                            </>
                          ) : null}
                        </tr>
                      );
                    })}
                  </table>
                </div>
              </>
            )}
          </div>
          {modal && <Modal closeModal={closeModal} role={"Delivery"} />}
          {editmodal && (
            <EditModal
              closeEditModal={closeEditModal}
              selectedData={selectedData}
            />
          )}
          <ToastContainer />
        </>
      ) : (
        <Banner />
      )}
    </div>
  );
};

export default UserBanner;
