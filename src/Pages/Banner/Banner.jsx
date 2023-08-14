import React, { useState, useEffect } from "react";
import { getNotes, deleteData } from "../../API";
import "./Banner.css";
import Filter from "../../Components/Filter/Filter";
import CreateIcon from "@mui/icons-material/Create";
import DeleteIcon from "@mui/icons-material/Delete";
import Switch from "@mui/material/Switch";
import UserBanner from "./UserBanner/UserBanner";
import EditModal from "./Modals/EditBanner/EditModal";
import StoreBanner from "./StoreBanner/StoreBanner";
import DeliveryBanner from "./DeliveryBanner/DeliveryBanner";
import Loader from "../../Components/Loader/Loader";

const Banner = ({ userCount, storeCount }) => {
  const [banner, setBanner] = useState("defaultBanner");
  const [editmodal, setEditModal] = useState(false);
  const closeEditModal = () => setEditModal(false);
  const [checked, setChecked] = React.useState(true);

  const [bannerData, setBannerData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedData, setSelectedData] = useState(null);
  const fetchData = async () => {
    console.log("i am called")
    try {
      const response = await getNotes("banner");
      setBannerData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  // Deleting the Table data
  const delete_Data = async (id, table_name) => {
    console.log("id and tablename", id, table_name);
    try {
      await deleteData({ id, table_name });
      const response = await getNotes("banner");
      setBannerData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Edit Table
  const editTable = async (id) => {
    let newdata = bannerData.find((element) => {
      return element.id === id;
    });
    setSelectedData(newdata);
    console.log(newdata);
    setEditModal(true);
    await fetchData();
    console.log("i am called2")
  };

  return (
    <div>
      {banner === "defaultBanner" && (
        <>
          <div className="Bannercategoriefilter">
            <Filter />
          </div>

          {loading ? (
            <Loader />
          ) : (
            <>
              <div className="Banner-content" id="list">
                <div className="Banners">
                  <h4 onClick={() => setBanner("userBanner")}>User Banner</h4>
                  <p>{userCount}</p>
                </div>
                <div className="Banners">
                  <h4 onClick={() => setBanner("storeBanner")}>Store Banner</h4>
                  <p>{storeCount}</p>
                </div>
                <div className="Banners">
                  <h4 onClick={() => setBanner("deliveryBanner")}>
                    Delivery Boy
                  </h4>
                  <p>45</p>
                </div>
              </div>
              <div className="Banner-list">
                <table style={{ width: "100%" }}>
                  <tbody>
                    <tr>
                      <th>#Id</th>
                      <th>Title</th>
                      <th>Learn More</th>
                      <th>Last Update</th>
                      <th>Role</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                    {bannerData.map((bannerData, index) => {
                      return (
                        <tr key={index}>
                          <td>{bannerData.id}</td>
                          <td>{bannerData.title}</td>
                          <td>
                            <Switch
                              checked={
                                bannerData.learnmoreactive === "true"
                                  ? checked
                                  : null
                              }
                            />
                          </td>
                          <td>{bannerData.lastupdate}</td>
                          <td>{bannerData.role}</td>
                          <td>
                            <Switch
                              checked={
                                bannerData.status === "active" ? checked : null
                              }
                            />
                          </td>
                          <td>
                            <CreateIcon
                              id="createicon"
                              onClick={() => editTable(bannerData.id)}
                            />
                            <DeleteIcon
                              id="deleteicon"
                              onClick={() =>
                                delete_Data(bannerData.id, "banner")
                              }
                            />
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              {editmodal && (
                <EditModal
                  closeEditModal={closeEditModal}
                  selectedData={selectedData}
                />
              )}
            </>
          )}
        </>
      )}

      {banner === "userBanner" && <UserBanner />}
      {banner === "storeBanner" && <StoreBanner />}
      {banner === "deliveryBanner" && <DeliveryBanner />}
    </div>
  );
};

export default Banner;
