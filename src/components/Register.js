import { useState} from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { Button, Select } from "@mui/material";
import {MenuItem} from "@mui/material";
import '../styles/Register.css'
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios'
import '../styles/Login.css'

function Register() {
    const navigate=useNavigate()
  const [registerFormData, setRegisterFormData] = useState({
    UserName: "",
    Password: "",
    ConfirmPassword: "",
    Location: "",
    Department: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const locations = ["Pune", "Gurgaon", "Bangalore", "Mumbai", "Kadi"];

  const departments = ['OBS', 'FD', 'BAS', 'BMS', 'HVAC', 'ACVS'];

  

  const handleSubmit = (e) => {
    
e.preventDefault();
if(registerFormData.Password===registerFormData.ConfirmPassword){
    axios.post("https://localhost:7105/api/Auth/register",{
        UserName: registerFormData.UserName,
        Password: registerFormData.Password,
        Location: registerFormData.Location
      }).then(()=>{
        axios.post(`https://localhost:7105/api/Auth/userTorole/${registerFormData.Department}/${registerFormData.UserName}`)
      }).then(()=>{
       navigate("/login")
      }).catch((err)=>{
        alert(err.message)
      })
}

    
  }
  

  return (
    <>
      <Box sx={{ display: "flex", flexWrap: "wrap", height: '90vh', width: '100%', justifyContent: 'center', alignContent: 'center'}}>
        <div style={{ padding: '2rem', boxShadow:'rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px',display: 'flex', flexDirection: 'column', width: '50%'}}>
          <h2>Register</h2>
          <TextField
            label="UserName"
            id="username"
            value={registerFormData?.UserName}
            sx={{ m: 1, width: "100%" }}
            onChange={(event) => setRegisterFormData({...registerFormData, UserName: event.target.value})}
          />
          <FormControl sx={{ m: 1, width: "100%" }} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">
              Password
            </InputLabel>
            <OutlinedInput
              value={registerFormData.Password}
              onChange={(event) => setRegisterFormData({...registerFormData, Password: event.target.value})}
              id="outlined-adornment-password"
              type={showPassword ? "text" : "password"}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
            />
          </FormControl>
          <FormControl sx={{ m: 1, width: "100%" }} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">
              Confirm Password
            </InputLabel>
            <OutlinedInput
              value={registerFormData.ConfirmPassword}
              onChange={(event) => setRegisterFormData({...registerFormData, ConfirmPassword: event.target.value})}

              id="outlined-adornment-password"
              type={showPassword ? "text" : "password"}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
            />
          </FormControl>
          <br />
          <FormControl fullWidth>
            <InputLabel id="locations">Locations</InputLabel>
            <Select 
              labelId="locations"
              id="locationId"
              value={registerFormData.Location}
              label="Location"
              onChange={(event) => setRegisterFormData({...registerFormData, Location: event.target.value})}
            >
              {locations.map((location, index) => (
                <MenuItem value={location} key={index}>
                  {location}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <br />
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Departments</InputLabel>
            <Select
              labelId="departments"
              id="departmentId"
              value={registerFormData.Department}
              label="Age"
              onChange={(event) => setRegisterFormData({...registerFormData, Department: event.target.value})}
            >
              {departments.map((department, index) => (
                <MenuItem value={department} key={index}>
                  {department}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <br />
          <Button variant="contained" onClick={handleSubmit}>Submit</Button>
       <p style={{textAlign:"center",marginTop:"2rem"}}>   <Link to="/"  className="link" >Already user ? Login here</Link></p>
        </div>
      </Box>
    </>
  );
}

export default Register;
