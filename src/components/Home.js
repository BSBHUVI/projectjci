import React, { useState } from "react";
import "../styles/Home.css";
import Card from "./Card";
import MenuIcon from '@mui/icons-material/Menu';
import { IconButton } from "@mui/material";
import ClearIcon from '@mui/icons-material/Clear';
import HomeIcon from '@mui/icons-material/Home';
import { Link } from "react-router-dom";
import PersonIcon from '@mui/icons-material/Person';
import { useMyDataContext } from "../context/DataContext";
import UploadFileIcon from '@mui/icons-material/UploadFile';

function Home() {
    const [menu,SetMenu]=useState(false)
    const {products}=useMyDataContext()
    const showMenu=()=>{
        SetMenu((p)=>!p)
       

    }
  return (
    <div className="home">
    
      <div className="search-bar">
        <input type="text" placeholder="Search products" />
  
 <div  >
 <IconButton onClick={showMenu}> <MenuIcon color="secondary" fontSize="large"/></IconButton>
 </div>
      </div>
      <div className="content">
        <h2>Featured Products</h2>
        <div className="product-grid">
              {products && products.map && products.map((res,idx)=>(
                <Card key={idx} product={res}/>
              ))}                                              
        </div>
        {menu && <div className="menu">
<IconButton onClick={showMenu}><ClearIcon fontSize="large" color="secondary"/></IconButton>

<div onClick={showMenu} className="menuItems">
  <IconButton><HomeIcon fontSize="large" color="primary"/> </IconButton> <h3><Link style={{textDecoration:"none",color:"white"}} to="/home">Home</Link></h3>
</div>
<div onClick={showMenu} className="menuItems">
  <IconButton><PersonIcon fontSize="large" color="primary"/> </IconButton> <h3><Link style={{textDecoration:"none",color:"white"}} to="/home">Profile</Link></h3>
</div>
<div onClick={showMenu} className="menuItems">
  <IconButton><UploadFileIcon fontSize="large" color="primary"/> </IconButton> <h3><Link  style={{textDecoration:"none",color:"white"}} to="/productupload">Upload Product</Link></h3>
</div>
        </div>}
      </div>
      <footer className="footer">
        <p>© 2023 Johnson Controls. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default Home;