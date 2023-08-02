import React, { useEffect, useState } from "react";
import "./Feedback.css";
import { getNotes } from "../../API";
import Filter from "../../Components/Filter/Filter";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import Loader from "../../Components/Loader/Loader";

const Feedback = () => {
  const [feedback, setFeedback] = useState([]);
  const [loading, setLoading] = useState(true);
  let feedback_list = feedback.length;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getNotes("feedback");
        setFeedback(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  return (
    <div>
      <div className="Feedbackcategoriefilter">
        <Filter />
      </div>
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="Feedback-content" id="list">
            <div className="Feedbacks">
              <h4>User Feedback</h4>
              <p>{feedback_list}</p>
            </div>
            <div className="Feedbacks">
              <h4>Store Feedback</h4>
              <p>15</p>
            </div>
            <div className="Feedbacks">
              <h4>Delivery Boy Feedback</h4>
              <p>45</p>
            </div>
          </div>
          <div className="Feedback-list">
            <table style={{ width: "100%" }}>
              <tbody>
                <tr>
                  <th>#Id</th>
                  <th>Review</th>
                  <th>Last Update</th>
                  <th>
                    Role <ArrowDropDownIcon id="arrow" />
                  </th>
                  <th>
                    Status <ArrowDropDownIcon id="arrow" />
                  </th>
                  <th>
                    Rating <ArrowDropDownIcon id="arrow" />
                  </th>
                </tr>
                {feedback.map((feedback, index) => {
                  return (
                    <tr>
                      <td>{feedback.shopid}</td>
                      <td>{feedback.fmessage}</td>
                      <td>Big bolw City</td>
                      <td>1425</td>
                      <td>5784</td>
                      <td>{feedback.frating}</td>
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

export default Feedback;
