import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import axios from "axios";
import { Avatar } from "@mui/material";
import { uploadToCloudinary } from "../../uploadToCloudinary"; // Assuming uploadToCloudinary is correctly implemented

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  maxHeight: "90vh",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  overflowY: "auto", // Enable vertical scrolling
};

const ProfileModal = ({ open, onClose }) => {
  const [user, setUser] = React.useState(null);
  const [selectedFile, setSelectedFile] = React.useState(null); // State to hold selected file

  React.useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:8081/api/user", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(response.data);
        console.log("User fetched successfully:", response.data);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchUser();
  }, []); // Removed user dependency to prevent infinite loop

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);

    try {
      const url = await uploadToCloudinary(file, "image"); // Assuming uploadToCloudinary returns a promise with the cloudinary URL
      setUser({
        ...user,
        profilePicture: url,
      });
    } catch (error) {
      console.error("Error uploading file to Cloudinary:", error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("User data to be updated:", user);
    try {
      const token = localStorage.getItem("token");

      const response = await axios.put("http://localhost:8081/api/user", user, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json", // Changed to JSON since we're sending user as JSON object
        },
      });

      console.log("User profile updated successfully:", response.data);
      setUser(response.data); // Update user state with response data
      onClose(); // Close the modal after submission
    } catch (error) {
      console.error("Error updating user profile:", error);
    }
  };

  const hiddenFileInput = React.useRef(null);

  const handleClickAvatar = () => {
    hiddenFileInput.current.click();
  };

  if (!user) {
    return null; // Handle case where user data is still loading
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          User Profile
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
          <Avatar
            src={user.profilePicture}
            sx={{ width: 100, height: 100, cursor: "pointer" }}
            onClick={handleClickAvatar}
          />
          <input
            type="file"
            ref={hiddenFileInput}
            onChange={handleFileChange}
            style={{ display: "none" }}
          />
          <TextField
            label="First Name"
            name="firstName"
            variant="outlined"
            fullWidth
            margin="normal"
            value={user.firstName}
            onChange={handleChange}
          />
          <TextField
            label="Last Name"
            name="lastName"
            variant="outlined"
            fullWidth
            margin="normal"
            value={user.lastName}
            onChange={handleChange}
          />
          <TextField
            label="Email"
            name="email"
            variant="outlined"
            fullWidth
            margin="normal"
            value={user.email}
            onChange={handleChange}
          />
          <TextField
            label="Phone Number"
            name="phoneNumber"
            variant="outlined"
            fullWidth
            margin="normal"
            value={user.phoneNumber}
            onChange={handleChange}
          />
          <TextField
            label="Adhar Number"
            name="adharNumber"
            variant="outlined"
            fullWidth
            margin="normal"
            value={user.adharNumber}
            onChange={handleChange}
          />
          <TextField
            label="State"
            name="state"
            variant="outlined"
            fullWidth
            margin="normal"
            value={user.state}
            onChange={handleChange}
          />
          <TextField
            label="District"
            name="district"
            variant="outlined"
            fullWidth
            margin="normal"
            value={user.district}
            onChange={handleChange}
          />
          <TextField
            label="Location"
            name="location"
            variant="outlined"
            fullWidth
            margin="normal"
            value={user.location}
            onChange={handleChange}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
          >
            Save Changes
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default ProfileModal;
