import React, { useState } from 'react'
import logo from '../images/jcilogo.jpg'
import { Outlet } from 'react-router-dom'
import '../styles/Navbar.css'
import { Avatar, IconButton } from '@mui/material'
import { useMyDataContext } from '../context/DataContext'
import CloseIcon from '@mui/icons-material/Close';

function Navbar() {
    const [profile,setProfile]=useState(false)
    const {location,userName,department}=useMyDataContext()
  return (
    <>
    <div className='navbar'>
 <figure className='figure'>
 <img className='logo' alt='logo' src={logo}/>
 </figure>
<IconButton onClick={()=>setProfile(p=>!p)}> <Avatar/></IconButton>
     
    </div>
   {profile &&  <div className="profile">
   <IconButton onClick={()=>setProfile(p=>!p)}><CloseIcon color='secondary' fontSize='meduim'/></IconButton>
   <p style={{textAlign:"center"}}>User Name : {userName}</p>  
     <p style={{textAlign:"center"}}> Location : {location}</p> 
     <h4 style={{textAlign:"center"}}>Department : </h4>
      {department && department.map && department.map((res,idx)=>(<p style={{textAlign:"center"}}  key={idx}>{res}</p>))}
        </div>}
    <Outlet/>
    </>
  )
}

export default Navbar
