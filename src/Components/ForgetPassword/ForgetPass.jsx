import React, { useState } from "react";
import './ForgetPass.css'
import { useNavigate } from "react-router-dom";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../firebase";

const ForgetPass = () => {
  const navigate = useNavigate({});
  const [email, setEmail] = useState();
  const [data, setdata] = useState();
  // const [email, setEmail] = useState();
  const handleinput = (e) => {
    setdata({
      ...data,
      [e.target.name]: e.target.value,
    });
  };


  const ResetLink = async () => {
    try {
      sendPasswordResetEmail(auth, email)
        .then(() => {
          console.log("link sent successfully");
          alert("Link Send Successfully (Check Spam Also)");
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode);
          console.log(errorMessage);
        });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="loginPage">
        <div className="login">
          <div action="" className="form-login">
            <h1>Forget Password</h1>
            <div className="email">
              <input
                type="email"
                placeholder="enter your email"
                required
                autoFocus="false"
                autoComplete="false"
                name="email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <button className="forget_btn" onClick={ResetLink}>Submit</button>
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
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgetPass;
