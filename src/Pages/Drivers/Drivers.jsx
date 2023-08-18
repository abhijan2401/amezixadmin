import React, { useEffect, useState } from "react";
import "./Drivers.css";
import { getNotes } from "../../API";
import Filter from "../../Components/Filter/Filter";
import Loader from "../../Components/Loader/Loader";

const Drivers = () => {
  const [drivers, setDrivers] = useState([]);
  const[loading, setLoading] = useState(true);
  let drivers_list = drivers.length;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getNotes("deliveryregister");
        console.log(response);
        setDrivers(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }finally{
        setLoading(false)
      }
    };
    fetchData();
  }, []);
  return (
    <div className="driver-container">
      {/* <div className="drivercategoriefilter">
        <Filter />
      </div> */}
      {loading ? (
        <Loader/>
      ) : (
        <>
          <div className="driver-content">
            <div className="driver">
              <h4>New Drivers</h4>
              <p>25</p>
            </div>
            <div className="driver">
              <h4>Active Drivers</h4>
              <p>45</p>
            </div>
            <div className="driver">
              <h4>Total Drivers</h4>
              <p>55</p>
            </div>
            <div className="driver">
              <h4>On Hand cash Drivers</h4>
              <p>45</p>
            </div>
            <div className="driver">
              <h4>Total On Cash Amount</h4>
              <p>4285</p>
            </div>
          </div>
          <div className="driver-list">
            <table style={{ width: "100%" }}>
              <tbody>
                <tr>
                  <th>Driver Id</th>
                  <th>Name</th>
                  <th>Mobile No.</th>
                  <th>Cash On Hand</th>
                  <th>Document Verification</th>
                  <th>Address</th>
                </tr>
                {drivers.map((drivers, index) => {
                  return (
                    <tr key={index}>
                      <td>{drivers.deliveryboyid}</td>
                      <td>{drivers.name}</td>
                      <td>{drivers.phone}</td>
                      <td>2000</td>
                      <td>
                        {drivers.profilestatus === "done" ? "verified" : "un-verified"}
                      </td>
                      <td>{drivers.address}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
};

export default Drivers;
