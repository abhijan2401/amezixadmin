import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import AdminBoard from "./Components/AdminBoard/AdminBoard";
import Transaction from "./Pages/Transaction/Transaction";
import Filter from "./Components/Filter/Filter";
import Banner from "./Pages/Banner/Banner";
import Loader from "./Components/Loader/Loader";
import SignUp from "./Components/SignUp/SignUp";
import SignIn from "./Components/SignIn/SignIn";
import ForgetPass from "./Components/ForgetPassword/ForgetPass";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import Wallet from "./Pages/Wallet/Wallet";
import walletDetailes from './Pages/Wallet/WalletModal/Details'
import Order from "./Pages/Order/Order";
import Stores from "./Pages/Stores/Stores";
import Drivers from "./Pages/Drivers/Drivers";
import User from "./Pages/Users/User";

function App() {
  const [userUid, setUserUid] = useState(null);
  const [userEmail, setUserEmail] = useState(null);
  useEffect(() => {
    getAutherUserDetails();
  }, []);
  async function getAutherUserDetails(userValue) {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        const email = user.email
        setUserUid(uid);
        setUserEmail(email)
      } else {
        setUserUid(userValue);
      }
    });
  }
  return (
    <div className="App">
      {
        !userUid ?
          <Routes>
            <Route path='/' element={<SignIn />} />
            <Route path='/SignUp' element={<SignUp />} />
            <Route path='/ForgetPass' element={<ForgetPass />} />
          </Routes> :
          <div className="App">
            {
              userUid &&
              <Routes>
                <Route path='/' element={<AdminBoard />} />
                <Route path='/Transaction' element={<Transaction />} />
                <Route path='/Filter' element={<Filter />} />
                <Route path='/Banner' element={<Banner />} />
                <Route path="/wallet" element={<Wallet/>}/>
                <Route path="/Orders" element={<Order/>}/>
                <Route path="/Stores" element={<Stores/>}/>
                <Route path="/Divers" element={<Drivers/>}/>
                <Route path="/Users" element={<User/>}/>
              </Routes>
            }
          </div>
      }

    </div>
  );
}

export default App;