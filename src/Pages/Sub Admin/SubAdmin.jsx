import React from "react";
import "./SubAdmin.css";
import Filter from '../../Components/Filter/Filter'

const SubAdmin = () => {
  return (
    <div className="subAdmin-container">
       {/* <div className="categoriefilter"><Filter/></div> */}
      <div className="subAdmin-content">
        <div className="subAdmin">
          <h4>New Sub Admin</h4>
          <p>02</p>
        </div>
        <div className="subAdmin">
          <h4>Active Sub Admin</h4>
          <p>03</p>
        </div>
        <div className="subAdmin">
          <h4>Total Sub Admin</h4>
          <p>04</p>
        </div>
      </div>
      <div className="subAdmin-list">
        <table style={{ width: "100%" }}>
          <tr>
            <th>#Id</th>
            <th>Name</th>
            <th>Sub Admin Type</th>
            <th>Authority Section And Access</th>
          </tr>
          <tr>
            <td>01</td>
            <td>Rahul</td>
            <td>Agency</td>
            <td>order, Driver Managment</td>
          </tr>
          <tr>
            <td>02</td>
            <td>Shyam</td>
            <td>Call Center</td>
            <td>order, Driver Managment</td>
          </tr>
          <tr>
            <td>03</td>
            <td>Shobha</td>
            <td>Transaction</td>
            <td>order, Driver Managment</td>
          </tr>
          <tr>
            <td>04</td>
            <td>Riitk</td>
            <td>Agency</td>
            <td>order, Driver Managment</td>
          </tr>
        </table>
      </div>
    </div>
  );
};

export default SubAdmin;
