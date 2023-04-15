import React, { useEffect, useRef, useState } from "react";
import "../styles/Home.css";
import Card from "./Card";
import MenuIcon from '@mui/icons-material/Menu';
import { IconButton } from "@mui/material";
import ClearIcon from '@mui/icons-material/Clear';
import HomeIcon from '@mui/icons-material/Home';
import { Link, useNavigate } from "react-router-dom";
import PersonIcon from '@mui/icons-material/Person';
import { useMyDataContext } from "../context/DataContext";
import UploadFileIcon from '@mui/icons-material/UploadFile';

function Home() {
    const ref=useRef()
    const navigate=useNavigate()
    const [menu,SetMenu]=useState(false)
    const {userLocationProducts,setUserLocationProducts,department}=useMyDataContext()
    const [Product,setProduct]=useState([])
    const {products,location}=useMyDataContext()
    useEffect(()=>{
        let a=localStorage.getItem("isLoggedIn")
        if(!a){
           navigate("/") 
        }
    },[navigate])
    useEffect(()=>{
        setProduct(userLocationProducts.slice())
    },[userLocationProducts])

 
    const showMenu=()=>{
        SetMenu((p)=>!p)
       

    }
    

  const handleSearch = () => {
    const search = ref.current.value;
    // filter products based on location and searchTerm
    let filteredProducts = [];
    if (search) {
      filteredProducts = userLocationProducts.filter((product) => {
        
          return product.Name?.toLowerCase().includes(search.toLowerCase());
        
      
      });
      setProduct(filteredProducts)
    }
 
  
    if (filteredProducts.length===0 && search ) {
      // if no products found in the selected location, show all products

      filteredProducts = products.filter((product) =>
        product.Name?.toLowerCase().includes(search?.toLowerCase()) && product.Location===location
      );
      setUserLocationProducts(filteredProducts)

    }
    if (!filteredProducts.length) {
      filteredProducts = products.filter((product) =>
        product.Name?.toLowerCase().includes(search?.toLowerCase())
      );
      setProduct(filteredProducts)
    }

    if(search.length===0){
    filteredProducts =products.filter((v)=>(v.Location===location))

    }
    setUserLocationProducts(filteredProducts)
 
  };
  return (
    <div className="home">
    
      <div className="search-bar">
        <input type="text" onChange={handleSearch} ref={ref} placeholder="Search products" />
  
 <div  >
 <IconButton onClick={showMenu}> <MenuIcon color="secondary" fontSize="large"/></IconButton>
 </div>
      </div>
      <div className="content">
        <h2>Featured Products</h2>
        <div className="product-grid">
              {Product && Product.map && Product.map((res,idx)=>(
                <Card key={idx} product={res}/>
              ))}                                              
        </div>
        {menu && <div className="menu">
<IconButton onClick={showMenu}><ClearIcon fontSize="large" color="secondary"/></IconButton>

<div onClick={showMenu} className="menuItems">
  <IconButton><HomeIcon fontSize="large" color="primary"/> </IconButton> <h3><Link style={{textDecoration:"none",color:"white"}} to="/home">Home</Link></h3>
</div>


<div onClick={showMenu} className="menuItems">
  <IconButton><PersonIcon fontSize="large" color="primary"/> </IconButton> <h3><Link style={{textDecoration:"none",color:"white"}} to="/users">Set Admin Access</Link></h3>
</div>
{ department.includes("admin")  && <div onClick={showMenu} className="menuItems">
  <IconButton><UploadFileIcon fontSize="large" color="primary"/> </IconButton> <h3><Link  style={{textDecoration:"none",color:"white"}} to="/productupload">Upload Product</Link></h3>
</div>}
        </div>}
      </div>
      <footer className="footer">
        <p>© 2023 Johnson Controls. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default Home;