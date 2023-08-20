import React, { useState } from "react";
import { useNavigate } from 'react-router-dom'
import "./SignUp.css";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";


const SignUp = () => {
  const [email, setemail] = useState('')
  const [password, setpassword] = useState('');

  const navigate = useNavigate();
  const newUser = async () => {
    createUserWithEmailAndPassword(auth, "abhishek.jangid777@gmail.com", "abhi@123#k")
      .then((userCredential) => {
        console.log(userCredential.user)
        // navigate('/')
      })
      .catch((error) => {
        switch (error.code) {
          case "auth/user-not-found":
            alert("Incorrect Email")
            break;
          case "auth/wrong-password":
            alert("Incorrect Password");
            break;
          default:
            break;
        }
      });
  }
  return (
    <>
      <div className="registerpage">
        <div className="register">
          <form action="" className="register-form">
            <h1>Sign Up</h1>
            {/* <div className="name">
              <input
                type="name"
                placeholder="username"
                required
                autoFocus="false"
                autoComplete="false"
              />
            </div> */}
            <div className="email">
              <input
                type="email"
                placeholder="email address"
                required
                autoFocus="false"
                autoComplete="false"
              />
            </div>
            <div className="password">
              <input type="password" placeholder="password" />
            </div>
            <div className="password">
              <input type="password" placeholder="confirm password" />
            </div>
            <div className="register-btn">
              <button onClick={newUser}>SignUp</button>
              <p>already have an account? <span onClick={() => navigate('/SignIn')}>Login here</span> </p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignUp;
