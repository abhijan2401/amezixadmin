import React, { useState, useEffect } from "react";
import "./UserBanner.css";
import Banner from "../Banner";
import Filter from "../../../Components/Filter/Filter";
import Modal from "../Modals/AddImage/bannerModal";
import EditModal from "../Modals/EditBanner/EditModal";
import { getNotes, deleteData } from "../../../API";
import Loader from "../../../Components/Loader/Loader";

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
  const [loading, setLoading] = useState(true);

  const [userBanner, setUserBanner] = useState([]);
  const [userCount, setUserCount] = useState([]);
  const [selectedUserData, setSelectedUserData] = useState(null);

  // Function to calculate the number of users
  // const calculateUserCount = (bannerData) => {
  //   const users = bannerData.filter((banner) => banner.role === "User");
  //   const uc = users.length;
  //   setUserCount([...userCount, uc]);
  // };
  // useEffect(() => {
  //   calculateUserCount(userBanner);
  // }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getNotes("banner");
        setUserBanner(response.data);
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
      setUserBanner(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Edit Table
  const editTable = (id) => {
    let newdata = userBanner.find((element) => {
      return element.id === id;
    });
    setSelectedUserData(newdata);
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
              User Banner
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
                        <th>Last Update</th>
                        <th>Images</th>
                        <th>Status</th>
                        <th>Action</th>
                      </tr>

                      {userBanner.map((banner, index) => {
                        return (
                          <tr key={index}>
                            {banner.role === "User" ? (
                              <>
                                <td>{banner.id}</td>
                                <td>{banner.title}</td>
                                <td>
                                  <Switch
                                    checked={
                                      banner.learnmoreactive === "true"
                                        ? checked
                                        : null
                                    }
                                  />
                                </td>
                                <td>{banner.lastupdate}</td>
                                <td>
                                  <img
                                    src={banner.image}
                                    alt="loading.."
                                    style={{ width: "100px", height: "50px" }}
                                  />
                                </td>
                                <td>
                                  <Switch
                                    checked={
                                      banner.status === "active"
                                        ? checked
                                        : null
                                    }
                                  />
                                </td>
                                <td>
                                  <CreateIcon
                                    id="createicon"
                                    onClick={() => editTable(banner.id)}
                                  />
                                  <DeleteIcon
                                    id="deleteicon"
                                    onClick={() =>
                                      delete_Data(banner.id, "banner")
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
          {modal && <Modal closeModal={() => closeModal()} role={"User"} />}
          {editmodal && (
            <EditModal
              closeEditModal={() => closeEditModal()}
              selectedData={selectedUserData}
            />
          )}
        </>
      ) : (
        <Banner userCount={userCount} />
      )}
    </div>
  );
};

export default UserBanner;
