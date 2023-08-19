import React, { useState } from "react";
import './ForgetPass.css'
import { useNavigate } from "react-router-dom";

const ForgetPass = () => {
  const navigate = useNavigate({});
  const [data, setdata] = useState();
  // const [email, setEmail] = useState();
  const handleinput = (e) => {
    setdata({
      ...data,
      [e.target.name]: e.target.value,
    });
  };
  return (
    <>
      <div className="loginPage">
        <div className="login">
          <form action="" className="form-login">
            <h1>Forget Password</h1>
            <div className="email">
              <input
                type="email"
                placeholder="Full Name"
                required
                autoFocus="false"
                autoComplete="false"
                name="email"
                onChange={handleinput}
              />
            </div>
            {/* <div className="password">
              <input
                type="password"
                placeholder="Password"
                name="password"
                onChange={handleinput}
              />
            </div> */}
            <div className="submit">
              <div className="submit-register">
                <p>
                  don't have account?{" "}
                  <span onClick={() => navigate("/SignUp")}>Register here</span>
                </p>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default ForgetPass;
