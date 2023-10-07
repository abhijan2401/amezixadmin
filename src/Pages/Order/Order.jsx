import React, { useState, useEffect } from "react";
import "./Order.css";
import { getNotes } from "../../API";
import Filter from "../../Components/Filter/Filter";
import Loader from "../../Components/Loader/Loader";
const Order = () => {
  const [storeorder, setStoreOrder] = useState([]);
  const [loading, setLoading] = useState(true);
  let storeorder_list = storeorder.length;

  const [filteredOrders, setFilteredOrders] = useState([]);
  const [filterCriteria, setFilterCriteria] = useState("");
  console.log(filterCriteria);
  console.log(filteredOrders);

  // Filter Criteria Function
  const filterCat = (criteria) => {
    setFilterCriteria(criteria);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getNotes("orders");
        console.log(response);
        // setStoreOrder(response.data);
        setStoreOrder(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Filtering the data
  useEffect(() => {
    const filteredData = storeorder.filter(
      (order) => order.orderstatus === filterCriteria
    );
    setFilteredOrders(filteredData);
  }, [filterCriteria, storeorder]);

  return (
    <div className="order-container">
      {/* <div className="categoriefilter">
        <Filter />
      </div> */}
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="order-content">
            <div className="order">
              <h4 onClick={() => filterCat("neworders")}>
                New Order
              </h4>
              <p>{storeorder_list}</p>
            </div>
            <div className="order">
              <h4>Dispatch Order</h4>
              <p>{45}</p>
            </div>
            <div className="order">
              <h4>On The Way Order</h4>
              <p>45</p>
            </div>
            <div className="order">
              <h4 onClick={() => filterCat("ORDER_CANCELED")}>Cancle Order</h4>
              <p>45</p>
            </div>
            <div className="order">
              <h4 onClick={() => filterCat("Confirm Return Successful")}>Return Order</h4>
              <p>45</p>
            </div>
            <div className="order">
              <h4>Total Complete Order</h4>
              <p>{storeorder_list}</p>
            </div>
          </div>
          <div className="order-list">
            <table style={{ width: "100%" }}>
              <tbody>
                <tr>
                  <th>#Id</th>
                  <th>Name</th>
                  <th>Product Name</th>
                  <th>Status</th>
                  <th>Payment Mode</th>
                </tr>
                {filteredOrders !== null ? (
                  <>
                    {filteredOrders.map((order, index) => {
                      return (
                        <tr key={index}>
                          <td>{order.id}</td>
                          <td>{order.orderby}</td>
                          <td>{order.items.category}</td>
                          <td>{order.orderstatus}</td>
                          <td>{order.paymentstatus}</td>
                        </tr>
                      );
                    })}
                  </>
                ) : (
                  <>
                    {storeorder.map((order, index) => {
                      return (
                        <tr key={index}>
                          <td>{order.id}</td>
                          <td>{order.orderby}</td>
                          <td>{order.items.category}</td>
                          <td>{order.orderstatus}</td>
                          <td>{order.paymentstatus}</td>
                        </tr>
                      );
                    })}
                  </>
                )}

                {storeorder.map((order, index) => {
                  return (
                    <tr key={index}>
                      <td>{order.id}</td>
                      <td>{order.orderby}</td>
                      <td>{order.items.category}</td>
                      <td>{order.orderstatus}</td>
                      <td>{order.paymentstatus}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            {/* {JSON.stringify(storeorder)} */}
          </div>
        </>
      )}
    </div>
  );
};

export default Order;
