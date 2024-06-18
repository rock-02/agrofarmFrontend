import React from "react";

import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import "./Home.css";
import { Icon } from "@mui/material";
const Home = () => {
  return (
    <div className="home">
      <div id="page-home">
        <div>
          <h1 className="title">Welcome to FarmAid</h1>
          <p className="description">
            FarmAid is a platform that provides farmers with information <br />
            on weather, crop waste management, and crop suggestions. <br /> Use
            the navigation bar to explore the features.
          </p>
        </div>
      </div>

      <div id="home-services">
        <h1>our Services : </h1>

        <div className="home-services2">
          <div className="weather">
            <h2>Weather </h2>
            <img
              src="https://previews.123rf.com/images/madozi/madozi1708/madozi170800224/84530022-agriculture-rice-field-flooded-damage-after-heavy-rain.jpg"
              alt=""
            />
            <p>
              Get the latest weather updates and forecasts for your location.
              like temperature, humidity, wind speed, etc.
            </p>
          </div>

          <div className="weather">
            <h2>Crop Suggestion </h2>
            <img
              src="https://camo.githubusercontent.com/26dd456211c8565656342810c4a76d69338a6a0c61917d231c9004efe8be201c/68747470733a2f2f7777772e6f70656e6465692e65752f77702d636f6e74656e742f75706c6f6164732f323032302f31312f696d672d59616e65776e304f52574378344a6c6d2d773830302e6a7067"
              alt=""
            />
            <p>
              Get suggestions on the best crops to plant based on your location,
              soil type, climate, and rainfall season climate.
            </p>
          </div>

          <div className="weather">
            <h2>Weather </h2>
            <img
              src="https://previews.123rf.com/images/madozi/madozi1708/madozi170800224/84530022-agriculture-rice-field-flooded-damage-after-heavy-rain.jpg"
              alt=""
            />
            <p>
              Selling crop Wastes like Tobacco Crop Residues, Cotton Stalks and
              Leaves, Sugarcane Bagasse, etc.
            </p>
          </div>
        </div>
      </div>

      <footer id="footer-home">
        <div id="footer-1">
          <h2>farmaid@gmail.com</h2>
        </div>

        <div id="footer-2">
          <div className="icons">
            {/* <Icon> */}
              <GitHubIcon />
            {/* </Icon> */}
            {/* <Icon> */}
              <LinkedInIcon />
            {/* </Icon> */}
            {/* <Icon> */}
              <InstagramIcon />
            {/* </Icon> */}
          </div>

          <h2>copy rights are reserved</h2>
        </div>

        <div id="footer-3">
          <h2>contact us</h2>
        </div>
      </footer>
    </div>
  );
};

export default Home;
