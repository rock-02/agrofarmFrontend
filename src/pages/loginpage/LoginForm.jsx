import React, { useState } from "react";
import "./loginForm.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
function LoginForm() {
  const [email, setEmail] = useState(undefined);
  const [password, setPassword] = useState(undefined);
  const navigate = useNavigate();
  const handleSubmit = (event) => {
    if (
      email !== "" &&
      email !== undefined &&
      password !== "" &&
      password !== undefined
    ) {
      event.preventDefault();
      const user = {
        email: email,
        password: password,
      };
      axios
        .post("http://localhost:8081/auth/login", user)
        .then((res) => {
          console.log(res.data);
          localStorage.setItem("token", res.data.token);
          navigate("/home");
        })
        .catch((err) => {
          alert("Some error occurred. Please try again after some time", err);
        });
    }
  };
  return (
    <div className="loginForm">
      <div className="header-text">Login Form</div>
      <form method="POST">
        <input
          onChange={(event) => {
            setEmail(event.target.value);
          }}
          placeholder="Your Email Address"
          type="email"
          required
        />
        <input
          onChange={(event) => {
            setPassword(event.target.value);
          }}
          placeholder="Your Password"
          type="password"
          required
        />
        <Button
          onClick={(event) => {
            handleSubmit(event);
          }}
          type="submit"
          id="button"
          variant="contained"
        >
          Login
        </Button>

        <span>
          Or Click here to <a href="/register">Register</a>
        </span>
      </form>
    </div>
  );
}

export default LoginForm;
