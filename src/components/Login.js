import axios from "axios";
import { useState } from "react";
import "./Login.css";
import { useHistory } from "react-router-dom";
const Login = () => {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const emailHandler = (event) => {
    setEmail(event.target.value);
  };
  const passwordHandler = (event) => {
    setPassword(event.target.value);
  };
  const signUpHandler = () => {
    axios
      .post(
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAJ0arsmCug_jD3EdkBBRNMEuFtqx8PIaQ",
        { email: email, password: password, returnSecureToken: true }
      )
      .then((response) => {
        alert(`${response.data.email} Registered Successfully `);
      })
      .catch((error) => {
        alert(error.response.data.error.message);
      });
  };
  const signInHandler = () => {
    axios
      .post(
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAJ0arsmCug_jD3EdkBBRNMEuFtqx8PIaQ",
        { email: email, password: password, returnSecureToken: true }
      )
      .then((response) => {
        history.replace("/home");
        let userId = response.data.localId;
        localStorage.setItem("userid", userId);
      })
      .catch((error) => {
        alert(error.response.data.error.message);
      });
  };
  return (
    <div className="master">
      <h1 className="head">
        <span style={{ color: "red" }}>C</span>
        <span style={{ color: "green" }}>o</span>
        <span style={{ color: "orange" }}>l</span>
        <span style={{ color: "pink" }}>o</span>
        <span style={{ color: "blue" }}>r</span>
        <span style={{ color: "yellow" }}>i</span>
        <span style={{ color: "purple" }}>f</span>
        <span style={{ color: "brown" }}>y</span>
      </h1>
      <div>
        <label className="label label1">Username</label>
        <input type={"email"} className="inp" onChange={emailHandler} />
      </div>
      <div>
        <label className="label">Password</label>
        <input type={"password"} className="inp" onChange={passwordHandler} />
      </div>
      <div className="buttonclass">
        <button className="bttn" onClick={signUpHandler}>
          Sign Up
        </button>
        <button className="bttn bttn1" onClick={signInHandler}>
          Login
        </button>
      </div>
    </div>
  );
};
export default Login;
