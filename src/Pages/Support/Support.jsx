import React, {useState} from "react";
import "./Support.css";
import Filter from "../../Components/Filter/Filter";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import TextsmsIcon from '@mui/icons-material/Textsms';
import SupportModal from "./SupportModal/SupportModal";

const Support = () => {

  const [supportModal, setSupportModal] = useState(false);

  const closeSupportModal = () => setSupportModal(false);

  return (
    <div>
      {/* <div className="Supportcategoriefilter">
        <Filter />
      </div> */}
      <div className="Support-content" id="list">
        <div className="Supports">
          <h4>User Support</h4>
        </div>
        <div className="Supports">
          <h4>Store Support</h4>
        </div>
        <div className="Supports">
          <h4>Delivery Support</h4>
        </div>
      </div>
      <div className="Support-list">
        <table style={{ width: "100%" }}>
          <tr>
            <th>#Id</th>
            <th>Title</th>
            <th>Latest Update</th>
            <th>
              Role <ArrowDropDownIcon id="arrow" />
            </th>
            <th>Status <ArrowDropDownIcon id="arrow" /></th>
            <th>Action</th>
          </tr>
          <tr>
            <td>01</td>
            <td>356</td>
            <td>1425</td>
            <td>5784</td>
            <td>success </td>
            <td>
              <TextsmsIcon id="message" onClick={()=>setSupportModal(true)} />
            </td>
          </tr>
          <tr>
            <td>01</td>
            <td>356</td>
            <td>1425</td>
            <td>5784</td>
            <td>success </td>
            <td>
              <TextsmsIcon id="message"/>
            </td>
          </tr>
          <tr>
            <td>01</td>
            <td>356</td>
            <td>1425</td>
            <td>5784</td>
            <td>success </td>
            <td>
              <TextsmsIcon id="message"/>
            </td>
          </tr>
          <tr>
            <td>01</td>
            <td>356</td>
            <td>1425</td>
            <td>5784</td>
            <td>success </td>
            <td>
              <TextsmsIcon id="message"/>
            </td>
          </tr>
          <tr>
            <td>01</td>
            <td>356</td>
            <td>1425</td>
            <td>5784</td>
            <td>success </td>
            <td>
              <TextsmsIcon id="message" />
            </td>
          </tr>
          <tr>
            <td>01</td>
            <td>356</td>
            <td>1425</td>
            <td>5784</td>
            <td>success </td>
            <td>
              <TextsmsIcon id="message" />
            </td>
          </tr>
          <tr>
            <td>01</td>
            <td>356</td>
            <td>1425</td>
            <td>5784</td>
            <td>success </td>
            <td>
              <TextsmsIcon id="message"/>
            </td>
          </tr>
        </table>
      </div>
      {supportModal && <SupportModal closeSupportModal={closeSupportModal} />}
    </div>
  );
};

export default Support;
