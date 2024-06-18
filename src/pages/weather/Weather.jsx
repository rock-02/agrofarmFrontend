import React, { useEffect, useState } from "react";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import ThermostatIcon from "@mui/icons-material/Thermostat";
import WbCloudyIcon from "@mui/icons-material/WbCloudy";
import OpacityIcon from "@mui/icons-material/Opacity";
import AirIcon from "@mui/icons-material/Air";
import "./Weather.css";
import { Button } from "@mui/material";

const API_KEY = "8f3bfabf8d5176735ce20119c336c7f6";

const Weather = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [searchedWeatherData, setSearchedWeatherData] = useState(null);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          fetchWeatherData(latitude, longitude);
        },
        (error) => {
          setError("Error getting location");
          console.error("Error getting location:", error);
        }
      );
    } else {
      setError("Geolocation is not supported by this browser.");
    }
  }, []);

  const fetchWeatherData = (latitude, longitude) => {
    const BASE_URL = "http://api.openweathermap.org/data/2.5/weather";
    const url = `${BASE_URL}?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`;

    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Weather data not available");
        }
        return response.json();
      })
      .then((data) => {
        setWeatherData(data);
      })
      .catch((error) => {
        setError("Error fetching weather data");
        console.error("Error fetching weather data:", error);
      });
  };

  const fetchWeatherByCity = () => {
    const BASE_URL = "http://api.openweathermap.org/data/2.5/weather";
    const url = `${BASE_URL}?q=${search}&appid=${API_KEY}&units=metric`;

    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Weather data not available for the city");
        }
        return response.json();
      })
      .then((data) => {
        setSearchedWeatherData(data);
      })
      .catch((error) => {
        setError("Error fetching weather data for the city");
        console.error("Error fetching weather data for the city:", error);
      });
  };

  const handleSearch = () => {
    if (search.trim() !== "") {
      fetchWeatherByCity();
    }
  };

  if (error) {
    return <div className="error">{error}</div>;
  }

  if ((!weatherData && !searchedWeatherData) || (searchedWeatherData && !searchedWeatherData.main)) {
    return <div className="loading">Loading...</div>;
  }

  const displayData = searchedWeatherData || weatherData;

  return (
    <div className="weather-container">
      <div className="weather-search">
        <input
          type="text"
          placeholder="Enter city name"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Button
          onClick={handleSearch}
          variant="contained"
          color="primary"
        >
          Search
        </Button>
      </div>

      <div className="weather-card">
        <div className="weather-icon">
          <WbCloudyIcon fontSize="large" />
        </div>
        <div className="weather-info">
          <div className="info-item">
            <LocationOnIcon />
            <span className="info-label">Location:</span>{" "}
            <span className="info-value">{displayData.name}</span>
          </div>
          <div className="info-item">
            <ThermostatIcon />
            <span className="info-label">Temperature:</span>{" "}
            <span className="info-value">{displayData.main.temp}°C</span>
          </div>
          <div className="info-item">
            <WbCloudyIcon />
            <span className="info-label">Weather:</span>{" "}
            <span className="info-value">
              {displayData.weather[0].description}
            </span>
          </div>
          <div className="info-item">
            <OpacityIcon />
            <span className="info-label">Humidity:</span>{" "}
            <span className="info-value">{displayData.main.humidity}%</span>
          </div>
          <div className="info-item">
            <AirIcon />
            <span className="info-label">Wind Speed:</span>{" "}
            <span className="info-value">{displayData.wind.speed} m/s</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Weather;
