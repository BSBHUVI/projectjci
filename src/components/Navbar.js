import React, { useState } from 'react'
import logo from '../images/jcilogo.jpg'
import { Link, Outlet, useNavigate} from 'react-router-dom'
import '../styles/Navbar.css'
import { Avatar, IconButton } from '@mui/material'
import { useMyDataContext } from '../context/DataContext'
import CloseIcon from '@mui/icons-material/Close';
import LogoutIcon from '@mui/icons-material/Logout';


function Navbar() {
    const navigate=useNavigate()
    const [profile,setProfile]=useState(false)
    const {location,userName,department}=useMyDataContext()
    
    const signOut=()=>{
     
        localStorage.clear()
        setProfile(false)
        navigate("/")
       
        
  
    }
  return (
    <>
    <div className='navbar'>
 <figure className='figure'>
 <Link to="/"><img  className='logo' alt='logo' src={logo}/></Link>
 </figure>
{localStorage.getItem("isLoggedIn")   && <IconButton onClick={()=>setProfile(p=>!p)}> <Avatar/></IconButton>}
     
    </div>
   {profile && <div className="profile">
   <IconButton onClick={()=>setProfile(p=>!p)}><CloseIcon color='secondary' fontSize='meduim'/></IconButton>
   <p style={{textAlign:"center"}}>User Name : {userName}</p>  
     <p style={{textAlign:"center"}}> Location : {location}</p> 
     <h4 style={{textAlign:"center"}}>Department : </h4>
      {department && department.map && department.map((res,idx)=>(<p style={{textAlign:"center"}}  key={idx}>{res}</p>))}
      <IconButton onClick={signOut}><LogoutIcon color='primary'/><p style={{color:"white"}}>Logout</p></IconButton>
        </div>}

       
    <Outlet/>
    </>
  )
}

export default Navbar
