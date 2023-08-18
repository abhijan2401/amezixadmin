import React from 'react'
import './StoreTransaction.css'
import Filter from '../../../Components/Filter/Filter'

const StoreTransaction = () => {
  return (
    <div>
      {/* <div className="transactioncategoriefilter"><Filter/></div> */}
      <div className="storetransaction-content" id="list">
          <div
            className="storetransaction"
          >
            <h4>Pending Store Transaction</h4>
            <p>20</p>
          </div>
          <div className="storetransaction">
            <h4>Complete Store Transaction</h4>
            <p>15</p>
          </div>
          <div className="storetransaction">
            <h4>Total Store transaction</h4>
            <p>45</p>
          </div>
        </div>
        <div className="storetransaction-list">
          <table style={{ width: "100%" }}>
            <tr>
              <th>#Id</th>
              <th>User Id</th>
              <th>Store Name</th>
              <th>Pending Transaction</th>
              <th>Total Transaction</th>
            </tr>
            <tr>
              <td>01</td>
              <td>356</td>
              <td>Big bolw City</td>
              <td>1425</td>
              <td>5784</td>
            </tr>
            <tr>
              <td>02</td>
              <td>5689</td>
              <td>Spark Piplod</td>
              <td>1235</td>
              <td>7854</td>
            </tr>
            <tr>
              <td>03</td>
              <td>9478</td>
              <td>syx store</td>
              <td>3452</td>
              <td>4520</td>
            </tr>
            <tr>
              <td>04</td>
              <td>917</td>
              <td>abc store</td>
              <td>4021</td>
              <td>5000</td>
            </tr>
            <tr>
              <td>04</td>
              <td>917</td>
              <td>abc store</td>
              <td>4021</td>
              <td>5000</td>
            </tr>
            <tr>
              <td>04</td>
              <td>917</td>
              <td>abc store</td>
              <td>4021</td>
              <td>5000</td>
            </tr>
            <tr>
              <td>04</td>
              <td>917</td>
              <td>abc store</td>
              <td>4021</td>
              <td>5000</td>
            </tr>
            <tr>
              <td>04</td>
              <td>917</td>
              <td>abc store</td>
              <td>4021</td>
              <td>5000</td>
            </tr>            
          </table>
        </div>
    </div>
  )
}

export default StoreTransaction
