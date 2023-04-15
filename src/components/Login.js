import { useState } from "react";
import {TextField,Button} from "@mui/material"
import "../styles/Login.css"
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useMyDataContext } from "../context/DataContext";

function Login() {
    //   const classes = useStyles();
      const [email, setEmail] = useState("");
      const [password, setPassword] = useState("");
      const navigate=useNavigate()
      const {setLocation,setUserName,setDepartment}=useMyDataContext()
    
      const handleSubmit = (event) => {
        event.preventDefault();
        axios.post("https://localhost:7105/api/Auth/login",{
            UserName: email,
            Password:password
          }).then(()=>{
           axios.get(`https://localhost:7105/api/Auth/getLocation/${email}`).then((res)=>{
            setLocation(res.data)
            setUserName(email)
            

           })
          }).then(()=>{
            axios.get(`https://localhost:7105/api/Auth/getRoles/${email}`).then((res)=>{
setDepartment(res.data)
            })
          }).then(()=>{
            navigate("/home")
          }).catch((err)=>{
            
          })
        
      };
    
      return (
        <div className="login_container">
          <form className="form_container"  onSubmit={handleSubmit}>
          <h1 style={{textAlign:"center",opacity:"0.6"}}>Login</h1>
            <TextField className="text_field"
              label="User Name"
              variant="outlined"
              type="text"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
            <TextField className="text_field"
              label="Password"
              variant="outlined"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />
            <Button type="submit" variant="contained" color="primary">
              Login
            </Button>
            <Link to="/register" className="link" >Sign Up for a New Account</Link>
          </form>
        </div>
      );
    }
    export default Login