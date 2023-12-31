import { useState } from "react";
import "./login.css";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassowrd] = useState("");
  const login = async () => {
    try {
      const res = await Axios.post("https://deploy-mern-crud-098.vercel.app/login", {
        email: email,
        password: password,
      });
      console.log(res.data);
      if (res.data === "garanted acces") {
        navigate("/students");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="background-login">
      <div className="login-page">
        <h1>
          <img src="" style={{ paddingRight: "20px" }} alt="" />{" "}
          <span style={{ color: "#feb001" }}>|</span> CRUD OPERATIONS
        </h1>
        <h2>Sign in</h2>
        <p>Enter your credentials to access your account</p>
        <label className="label-login">
          <h3>Email</h3>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <br />
        <label className="label-login">
          <h3>password</h3>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassowrd(e.target.value)}
          />
        </label>
        <br />
        <button className="sign-in" type="button" onClick={login}>
          sign in
        </button>
      </div>
    </div>
  );
};

export default Login;
