import React, { useEffect, useState } from "react";

import "./index.css";
import LoginForm from "./pages/loginpage/LoginForm";
import SignUp from "./pages/signup/SignUp";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import axios from "axios";
import Weather from "./pages/weather/Weather";
import CropWaste from "./pages/crop-waste/CropWaste";
import CropFilter from "./pages/crop-suggest/CropSuggest";
import ResponsiveAppBar from "./components/navbar/ResponsiveAppBar";
import ContactUs from "./pages/contact/ContactUs";

const App = () => {
  const token = localStorage.getItem("token");

  const [user, setUser] = useState(null);

  const fetchUser = async () => {
    await axios
      .get("http://localhost:8081/api/user", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setUser(response.data);
        console.log(response);
        console.log("User fetched successfully");
        console.log(user);
      })
      .catch((error) => {
        console.error("Error fetching user:", error);
      });
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div>
      <ResponsiveAppBar />
      <Routes>
        <Route path="/" element={user ? <Home /> : <LoginForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<SignUp />} />
        <Route path="/weather" element={token && <Weather />} />
        <Route path="/crop-waste" element={token && <CropWaste />} />
        <Route path="/contact" element={token && <ContactUs />} />
        <Route path="/crop-suggestion" element={token && <CropFilter />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </div>
  );
};

export default App;
