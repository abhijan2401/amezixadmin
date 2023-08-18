import React, { useState, useEffect } from "react";
import "./Delivery.css";
import { getNotes } from "../../API";
import Button from "@mui/material/Button";
import Loader from "../../Components/Loader/Loader";
import Checkbox from "@mui/material/Checkbox";

const Delivery = () => {
  const [delivery, setDelivery] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getNotes("orders");
        console.log(response);
        // setStoreOrder(response.data);
        setDelivery(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  console.log("this is delivery", delivery);
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="delivery-container">
            <div className="delivery-list">
              <table style={{ width: "100%" }}>
                <tbody>
                  <tr>
                    <th>Id</th>
                    <th>Name</th>
                    <th>Mobile No.</th>
                    <th>Payment type</th>
                    <th>Total item</th>
                    <th>Address</th>
                    <th>Amount</th>
                    <th>Delivery Boy</th>
                  </tr>
                  {delivery.map((order, index) => {
                    return (
                      <tr key={index}>
                        {order.orderstatus === "neworders" ? (
                          <>
                            <td>{order.id}</td>
                            <td>{order.orderby}</td>
                            <td>{order.customercontact}</td>
                            <td>{order.paymenttype}</td>
                            <td>{order.totalitems}</td>
                            <td>{order.storeaddress}</td>
                            <td>{order.totalamount}</td>
                            <td>
                              <select
                                className="delivery_option"
                                name="languages"
                                id="lang"
                              >
                                <option value="select">
                                  Assign Delivery Boy
                                </option>
                                <option value="javascript">Ramesh</option>
                                <option value="php">Mukesh</option>
                                <option value="java">Marks</option>
                              </select>
                              {/* <Checkbox /> */}
                            </td>
                            <Button variant="contained" id="deliveryboy_btn">
                              Select
                            </Button>
                          </>
                        ) : null}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Delivery;
