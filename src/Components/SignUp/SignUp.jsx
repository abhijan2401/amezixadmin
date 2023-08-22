import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SignUp.css";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";

const SignUp = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  // console.log("hello",email, password)

  const navigate = useNavigate();
  const newUser = async () => {
    console.log("hello", email, password);
    await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log("user created", userCredential);
        localStorage.setItem("autoLoginEmail", email);
        localStorage.setItem("autoLoginPassword", password);
        navigate('/amezixadmin')
      })
      .catch((error) => {
        console.log("user not Created", error);
      });
  };
  return (
    <>
      <div className="registerpage">
        <div className="register">
          <div className="register-form">
            <h1>Sign Up</h1>
            <div className="email">
              <input
                type="email"
                name="email"
                placeholder="email address"
                required
                autoComplete="false"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="password">
              <input
                type="password"
                name="password"
                placeholder="password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {/* <div className="password">
              <input
                type="password"
                name="confirm_password"
                placeholder="confirm password"
                onChange={handleinput}
              />
            </div> */}
            <div className="register-btn">
              <button onClick={newUser}>SignUp</button>
              <p>
                already have an account?{" "}
                <span onClick={() => navigate("/SignIn")}>Login here</span>{" "}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
