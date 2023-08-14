import React, { useState, useEffect } from 'react'
import './Dashboard.css'
import { getNotes } from "../../API";
import Loader from "../../Components/Loader/Loader";
import Filter from '../../Components/Filter/Filter'

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [storeorder, setStoreOrder] = useState([]);
  const [users, setUsers] = useState([]);
  const [stores, setStores] = useState([]);
  const [drivers, setDrivers] = useState([]);
  let storeorder_list = storeorder.length;
  let users_list = users.length;
  let store_list = stores.length;
  let drivers_list = drivers.length;

// Order API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getNotes("orders");
        console.log(response);
        setStoreOrder(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }finally{
        setLoading(false)
      }
    };
    fetchData();
  }, []);

  // User API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getNotes("customer");
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Store API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getNotes("storedetail");
        setStores(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }finally{
        setLoading(false)
      }
    };
    fetchData();
  }, []);

  // Drivers API
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
    <div className='dashboard-container'>
      <div className="categoriefilter"><Filter/></div>
        <div className="dashboard-content">
          <div className="active_order"><h4>Active Order</h4><p>{storeorder_list}</p></div>
          {/* <div className="active_order"><h4>Total Sales</h4><p>45000</p></div> */}
          <div className="active_order"><h4>Active User</h4><p>{users_list}</p></div>
          {/* <div className="active_order"><h4>New User</h4><p>45</p></div> */}
          <div className="active_order"><h4>Active Stores</h4><p>{store_list}</p></div>
          {/* <div className="active_order"><h4>Cancle Order</h4><p>75</p></div> */}
          <div className="active_order"><h4>Active Drivers</h4><p>{drivers_list}</p></div>
          {/* <div className="active_order"><h4>Exchange Order</h4><p>85</p></div> */}
          {/* <div className="active_order"><h4>Total Complete Order</h4><p>15</p></div> */}
        </div>
    </div>
  )
}

export default Dashboard
