import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import axios from "axios";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function OpenSellModal({ open, setOpen, crop }) {
  const [quantity, setQuantity] = React.useState("");

  const handleClose = () => setOpen(false);

  const sellCrop = async (data) => {
    const token = localStorage.getItem("token");
    await axios
      .post("http://localhost:8081/api/crops", data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response);
        console.log("Crop sold successfully");
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error selling crop:", error);
      });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission logic here
    console.log("Crop Name:", crop.name);
    console.log("Quantity:", quantity);

    const data = {
      cropName: crop.name,
      quantity: quantity,
    };
    sellCrop(data);

    handleClose();
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Sell {crop.name}
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
          <TextField
            label="Quantity"
            variant="outlined"
            fullWidth
            margin="normal"
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
          >
            Submit
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}
