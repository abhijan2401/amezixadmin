import React, { useEffect, useState } from "react";
import "./Notification.css";
import { getNotes } from "../../API";
import Filter from "../../Components/Filter/Filter";
import CreateIcon from "@mui/icons-material/Create";
import DeleteIcon from "@mui/icons-material/Delete";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import NotificationModal from "./NotificationModal/NotificationModal";
import Loader from "../../Components/Loader/Loader";

const Notification = () => {
  const [notificationModal, setNotificationModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [notification, setNotification] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getNotes("notification");
        setNotification(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }finally{
        setLoading(false)
      }
    };
    fetchData();
  }, []);
  console.log(notification);
  const closeNotificationModal = () => setNotificationModal(false);

  return (
    <div>
      {/* <div className="Notificationcategoriefilter">
        <Filter />
      </div> */}
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="Notification-content" id="list">
            <div className="Notifications">
              <h4>User Notification</h4>
            </div>
            <div className="Notifications">
              <h4>Store Notification</h4>
            </div>
            <div className="Notifications">
              <h4>Delivery Notification</h4>
            </div>
          </div>
          <div className="Notification-list">
            <table style={{ width: "100%" }}>
              <tbody>
                <tr>
                  <th>#Id</th>
                  <th>Title</th>
                  <th>Latest Update</th>
                  <th>
                    Role <ArrowDropDownIcon id="arrow" />
                  </th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
                {notification.map((element, index) => {
                  return (
                    <tr key={index}>
                      <td>{element.id}</td>
                      <td>{element.notificationtitle}</td>
                      <td>1425</td>
                      <td>5784</td>
                      <td>{element.isseen} </td>
                      <td>
                        <CreateIcon
                          id="createicon"
                          onClick={() => setNotificationModal(true)}
                        />
                        <DeleteIcon id="deleteicon" />
                      </td>
                    </tr>
                  );
                })}
                {/* {JSON.stringify(notification)} */}
              </tbody>
            </table>
          </div>

          {notificationModal && (
            <NotificationModal
              closeNotificationModal={closeNotificationModal}
            />
          )}
        </>
      )}
    </div>
  );
};

export default Notification;
