import "./Signup.css";
import { useState } from "react";
import Button from "@mui/material/Button";
import EmailValidator from "email-validator";
import Select from "react-select";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import statesAndDistricts from "../../districtsAndStatesData.json";

function SignUp() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [adharNumber, setAdharNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [stateName, setStateName] = useState("");
  const [districtName, setDistrictName] = useState("");
  const [location, setLocation] = useState("");
  const [type, setType] = useState("text");
  const [dob, setDob] = useState("");
  const [districts, setDistricts] = useState([]);

  const navigate = useNavigate();
  const states = statesAndDistricts.map((r) => r.state);

  const handleChange = (event) => {
    setStateName(event.value);
    const findStateIndex = statesAndDistricts.findIndex(
      (r) => r.state === event.value
    );
    const selectedDistricts = statesAndDistricts[findStateIndex].districts.map(
      (r) => ({
        value: r,
        label: r,
      })
    );
    setDistricts(selectedDistricts);
  };

  const stateOptions = states.map((r) => ({
    value: r,
    label: r,
  }));

  const checkAndSubmit = (event) => {
    event.preventDefault();

    // console.log(user);

    if (
      !firstName ||
      !lastName ||
      !email ||
      !phoneNumber ||
      !adharNumber ||
      !password ||
      !confirmPassword ||
      !location
    ) {
      alert("Please fill all the fields");
      return;
    }

    const regNameM = /^[a-zA-Z]+ [a-zA-Z]+ [a-zA-Z]+$/;
    const regNameL = /^[a-zA-Z]+ [a-zA-Z]+$/;
    const regNameF = /^[a-zA-Z]+$/;
    const regex = /^[2-9]{1}[0-9]{3}\s{1}[0-9]{4}\s{1}[0-9]{4}$/;

    if (
      !regNameM.test(firstName) &&
      !regNameL.test(firstName) &&
      !regNameF.test(firstName)
    ) {
      alert("Enter a proper first name");
    } else if (!EmailValidator.validate(email)) {
      alert("Enter a proper email address");
    } else if (!regex.test(adharNumber)) {
      alert("Please enter a valid Aadhar number");
    } else if (!dob) {
      alert("Please select your date of birth");
    } else if (!stateName) {
      alert("Please select a state");
    } else if (password !== confirmPassword) {
      alert("Both passwords should match");
    } else {
      const user = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        phoneNumber: phoneNumber,
        dob: dob,
        state: stateName,
        district: districtName,
        location: location,
        adharNumber: adharNumber,
        password: password,
        role: "farmer",
        // profilePicture: "", // Add this field if needed
      };
      axios
        .post("http://localhost:8081/auth/signup", user)
        .then((res) => {
          // alert("Registered successfully");
          alert(res.data.message);
          localStorage.setItem("token", res.data.token);
          navigate("/home");
        })
        .catch((err) => {
          console.error("error -> " + err.message);
          alert("Some error occurred. Please try again later");
        });
    }
  };

  return (
    <>
      <div className="registerPage">
        <div id="register">
          <h1>Registration Form</h1>
          <form method="POST">
            <input
              type="text"
              placeholder="First name"
              required
              onChange={(event) => setFirstName(event.target.value)}
            />
            <input
              type="text"
              placeholder="Last name"
              required
              onChange={(event) => setLastName(event.target.value)}
            />
            <input
              type="email"
              placeholder="Email"
              required
              onChange={(event) => setEmail(event.target.value)}
            />
            <input
              type="number"
              placeholder="Mobile number"
              maxLength={10}
              required
              onChange={(event) => setPhoneNumber(event.target.value)}
            />
            <input
              type="text"
              placeholder="Aadhar number (xxxx xxxx xxxx)"
              maxLength={14}
              required
              onChange={(event) => setAdharNumber(event.target.value)}
            />
            <input
              type={type}
              placeholder="Select DOB"
              onFocus={() => setType("date")}
              onChange={(event) => setDob(event.target.value)}
              required
            />
            <Select
              className="select"
              options={stateOptions}
              placeholder="Select state..."
              onChange={handleChange}
            />
            <Select
              className="select"
              options={districts}
              placeholder="Select district..."
              onChange={(event) => setDistrictName(event.value)}
            />
            <input
              type="text"
              placeholder="Location"
              required
              onChange={(event) => setLocation(event.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              required
              maxLength={6}
              onChange={(event) => setPassword(event.target.value)}
            />
            <input
              type="password"
              placeholder="Confirm password"
              required
              maxLength={6}
              onChange={(event) => setConfirmPassword(event.target.value)}
            />
            <Button
              onClick={checkAndSubmit}
              type="submit"
              id="button"
              variant="contained"
            >
              Register
            </Button>
            <p>
              Already have an account? <a href="/login">Login</a>
            </p>
          </form>
        </div>
      </div>
    </>
  );
}

export default SignUp;
