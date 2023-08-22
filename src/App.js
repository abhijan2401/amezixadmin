import { Routes, Route,Navigate  } from "react-router-dom";
import "./App.css";
import AdminBoard from "./Components/AdminBoard/AdminBoard";
import Transaction from "./Pages/Transaction/Transaction";
import Filter from "./Components/Filter/Filter";
import Banner from "./Pages/Banner/Banner";
import Loader from "./Components/Loader/Loader";
import SignUp from "./Components/SignUp/SignUp";
import SignIn from "./Components/SignIn/SignIn";
import ForgetPass from "./Components/ForgetPassword/ForgetPass";

function App() {
  const savedEmail = localStorage.getItem("autoLoginEmail");
  const savedPassword = localStorage.getItem("autoLoginPassword");
  const isLoggedIn = savedEmail && savedPassword;
  return (
    <div className="App">
      <Routes>
        {isLoggedIn ? (
          <>
            <Route path="/amezixadmin" element={<AdminBoard />} />
            <Route path="/Transaction" element={<Transaction />} />
            <Route path="/Filter" element={<Filter />} />
            <Route path="/Banner" element={<Banner />} />
          </>
        ) : (
          <>
            <Route path="/SignUp" element={<SignUp />} />
            <Route path="/SignIn" element={<SignIn />} />
            <Route path="/ForgetPass" element={<ForgetPass />} />
          </>
        )}
          <Route path="/" element={<Navigate to={isLoggedIn ? "/amezixadmin" : "/SignIn"} />} />
      </Routes>
    </div>
  );
}

export default App;
