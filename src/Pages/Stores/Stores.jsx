import React, { useEffect, useState } from "react";
import "./Stores.css";
import Filter from "../../Components/Filter/Filter";
import CancelIcon from "@mui/icons-material/Cancel";
import add from "../../assets/add.svg";
import { getNotes } from "../../API";
import Loader from "../../Components/Loader/Loader";
const Stores = () => {
  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(true);
  let store_list = stores.length;
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
  return (
    <div className="store-container">
      {/* <div className="categoriefilter">
        <Filter />
      </div> */}
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="store-content">
            <div className="store">
              <h4>New Stores</h4>
              <p>{store_list}</p>
            </div>
            <div className="store">
              <h4>Active Stores</h4>
              <p>{store_list}</p>
            </div>
            <div className="store">
              <h4>Total Stores</h4>
              <p>{store_list}</p>
            </div>
          </div>
          <div className="store-list">
            <table style={{ width: "100%" }}>
              <tbody>
                <tr>
                  <th>#Id</th>
                  <th>Store Name</th>
                  <th>Categories</th>
                  <th>Address</th>
                  <th>Doc</th>
                </tr>
                {stores.map((store, index) => {
                  return (
                    <tr key={index}>
                      <td>{store.id}</td>
                      <td>{store.shopname}</td>
                      <td>{store.storecategory}</td>
                      <td>{store.storeaddress}</td>
                      <td>No</td>
                      <p>
                        <CancelIcon />
                      </p>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            {/* {JSON.stringify(stores)} */}
          </div>

          <div className="addnewbtn">
            <button>
              Add New <img src={add} alt="" />
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Stores;
