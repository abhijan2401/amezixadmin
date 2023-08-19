import React from "react";
import {useNavigate} from 'react-router-dom'
import "./SignUp.css";

const SignUp = () => {
  const navigate = useNavigate();
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
              <button>SignUp</button>
              <p>already have an account? <span onClick={()=>navigate('/SignIn')}>Login here</span> </p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignUp;
