import React, { useState } from "react";
import { useNavigate } from 'react-router-dom'
import "./SignIn.css";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";

const SignIn = () => {
  const navigate = useNavigate({});
  const [email, setEmail] = useState();
  const [password, setPassword] = useState()
  const [data, setdata] = useState()
  // const [email, setEmail] = useState();
  const handleinput = (e) => {
    setdata({
      ...data, [e.target.name]: e.target.value,
    })
  }
  const newUser = async () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential.user.uid)
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
      <div className="loginPage">
        <div className="login">
          <div action="" className="form-login">
            <h1>Sign In</h1>
            <div className="email">
              <input type="email" placeholder="enter your email" required autoFocus="false" autoComplete="false" name='email' onChange={(e)=>setEmail(e.target.value)}/>
            </div>
            <div className="password">
              <input type="password" placeholder="Password" name="password" onChange={(e)=>setPassword(e.target.value)} />
            </div>
            <div className="submit">
              <div className="sumbit-pass">
                <p onClick={() => navigate('/ForgetPass')}>forget password?</p>
              </div>
              <div className="submit-register">
                <button onClick={newUser}>SignIn</button>
                <p>
                  don't have account?{" "}
                  <span onClick={() => navigate('/SignUp')}>Register here</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignIn;

