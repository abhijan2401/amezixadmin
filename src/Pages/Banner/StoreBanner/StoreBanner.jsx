import React, { useState, useEffect } from "react";
import { getNotes, deleteData } from "../../../API";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
// import "./UserBanner.css";
import Banner from "../Banner";
import Filter from "../../../Components/Filter/Filter";
import Modal from "../Modals/AddImage/bannerModal";
import EditModal from "../Modals/EditBanner/EditModal";
import Loader from "../../../Components/Loader/Loader";

import AddIcon from "@mui/icons-material/Add";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
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

  const [storeBanner, setStoreBanner] = useState([]);
  const [loading, setLoading] = useState(true);
  const [storeCount, setStoreCount] = useState(0);
  const [selectedData, setSelectedData] = useState(null);

  const deleteNotify = () => toast("Item is Deleted !!", {
    position:"top-center" ,autoClose:"3000"
  });

  // Function to calculate the number of users
  const calculateUserCount = (bannerData) => {
    const store = bannerData.filter((banner) => banner.role === "Store");
    setStoreCount(store.length);
  };
  console.log(storeCount);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getNotes("banner");
        setStoreBanner(response.data);
        calculateUserCount(response.data);
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
      setStoreBanner(response.data);
      deleteNotify();
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Edit Table
  const editTable = (id) => {
    let newdata = storeBanner.find((element) => {
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
              Store Banner
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
                    <tbody>
                      <tr>
                        <th>#Id</th>
                        <th>Title</th>
                        <th>Learn More</th>
                        <th>Latest Update</th>
                        <th>Images</th>
                        <th>Status</th>
                        <th>Action</th>
                      </tr>
                      {storeBanner.map((storeBanner, index) => {
                        return (
                          <tr key={index}>
                            {storeBanner.role === "Store" ? (
                              <>
                                <td>{storeBanner.id}</td>
                                <td>{storeBanner.title}</td>
                                <td>
                                  <Switch
                                    checked={
                                      storeBanner.learnmoreactive === "true"
                                        ? checked
                                        : null
                                    }
                                  />
                                </td>
                                <td>{storeBanner.lastupdate}</td>
                                <td>
                                  <img
                                    src={storeBanner.image}
                                    alt="loading..."
                                    style={{ width: "100px", height: "50px" }}
                                  />
                                </td>
                                <td>
                                  <Switch
                                    checked={
                                      storeBanner.status === "active"
                                        ? checked
                                        : null
                                    }
                                  />
                                </td>
                                <td>
                                  <CreateIcon
                                    id="createicon"
                                    onClick={() => editTable(storeBanner.id)}
                                  />
                                  <DeleteIcon
                                    id="deleteicon"
                                    onClick={() =>
                                      delete_Data(storeBanner.id, "banner")
                                    }
                                  />
                                </td>
                              </>
                            ) : null}
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </>
            )}
          </div>
          {modal && <Modal closeModal={closeModal} role={"Store"} />}
          {editmodal && (
            <EditModal
              closeEditModal={closeEditModal}
              selectedData={selectedData}
            />
          )}
           <ToastContainer/>
        </>
      ) : (
        <Banner storeCount={storeCount} />
      )}
    </div>
  );
};

export default UserBanner;
