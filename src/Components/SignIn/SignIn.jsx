import React, { useState } from "react";
import {useNavigate} from 'react-router-dom'
import "./SignIn.css";

const SignIn = () => {
  const navigate = useNavigate({});
  const [data, setdata] = useState()
  // const [email, setEmail] = useState();
  const handleinput = (e) =>{
    setdata({
      ...data, [e.target.name] : e.target.value ,
    })
  }
  return (
    <>
      <div className="loginPage">
        <div className="login">
          <form action="" className="form-login">
            <h1>Sign In</h1>
            {/* <div className="email">
              <input type="email" placeholder="Full Name" required autoFocus="false" autoComplete="false" name='email' onChange={handleinput}/>
            </div> */}
            <div className="password">
              <input type="password" placeholder="Password" name="password" onChange={handleinput}/>
            </div>
            <div className="submit">
              <div className="sumbit-pass">
                <p  onClick={()=>navigate('/ForgetPass')}>forget password?</p>
              </div>
              <div className="submit-register">
                <button>SignIn</button>
                <p>
                  don't have account?{" "}
                  <span onClick={()=>navigate('/SignUp')}>Register here</span>
                </p>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignIn;

