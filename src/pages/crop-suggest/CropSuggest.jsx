import React, { useState } from "react";
import axios from "axios";
import {
  Container,
  Typography,
  TextField,
  Button,
  Grid,
  Box,
  Paper,
} from "@mui/material";
import "./suggest.css"; // Import the CSS file for styling

const CropFilter = () => {
  const [soilType, setSoilType] = useState("");
  const [climate, setClimate] = useState("");
  const [season, setSeason] = useState("");
  const [minRainfall, setMinRainfall] = useState("");
  const [filteredCrops, setFilteredCrops] = useState([]);

  const handleFilterSubmit = async (event) => {
    event.preventDefault();

    const query = soilType + climate + season + minRainfall;
    console.log("Query -> ", query);
    await axios
      .get(`http://localhost:8081/crop?query=${query}`)
      .then((response) => {
        setFilteredCrops(response.data);
        console.log("Filtered crops:", response.data);
      })
      .catch((error) => {
        console.error("Error fetching crops:", error);
      });
  };

  return (
    <Container maxWidth="md" className="suggest">
      <Typography
        variant="h4"
        align="center"
        className="text-slate-900"
        gutterBottom
      >
        Filter Crops
      </Typography>
      <Paper elevation={3} className="form-container bg-slate-900">
        <form onSubmit={handleFilterSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} className="form-field">
              <TextField
                fullWidth
                label="Soil Type"
                variant="outlined"
                value={soilType}
                onChange={(e) => setSoilType(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6} className="form-field">
              <TextField
                fullWidth
                label="Climate"
                variant="outlined"
                value={climate}
                onChange={(e) => setClimate(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6} className="form-field">
              <TextField
                fullWidth
                label="Season"
                variant="outlined"
                value={season}
                onChange={(e) => setSeason(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6} className="form-field">
              <TextField
                fullWidth
                label="Min Rainfall"
                variant="outlined"
                type="number"
                value={minRainfall}
                onChange={(e) => setMinRainfall(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                className="submit-button"
                fullWidth

              >
                Filter Crops
              </Button>
            </Grid>
          </Grid>
        </form>
        <Box mt={3} className="filtered-crops bg-slate-900">
          <Typography variant="h5" gutterBottom className="text-slate-300">
            Filtered Crops
          </Typography>
          <div className="flex space-x-2 hide-scroll fitems hide-scrollbar">
            {filteredCrops?.map((crop, index) => (
              <div key={index} className="crop-card w-6">
                <img src={crop?.cropImage} alt={crop?.cropName} />

                <div className="crop-details">
                  <p>
                    <strong>Crop Name:</strong> {crop?.cropName}
                  </p>
                  <p>
                    <strong>Soil Type:</strong> {crop?.cropSoil}
                  </p>
                  <p>
                    <strong>Climate:</strong> {crop?.cropType}
                  </p>
                  <p>
                    <strong>Season:</strong> {crop?.cropSeason}
                  </p>
                  <p>
                    <strong>Min Rainfall:</strong> {crop?.cropRainfall}
                  </p>
                  <p>
                    <strong>Min Rainfall:</strong> {crop?.cropRainfall}
                  </p>
                  <p>
                    <strong>Crop Variety:</strong> {crop?.cropVariety}
                  </p>
                  <p>
                    <strong>cropIrrigation:</strong> {crop?.cropIrrigation}
                  </p>
                  <p>
                    <strong>Min Rainfall:</strong> {crop?.cropRainfall}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Box>
      </Paper>
    </Container>
  );
};

export default CropFilter;
