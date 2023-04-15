import React, { useEffect } from "react";
import { useState } from "react";
import { Alert, Button, ButtonGroup } from "@mui/material";

import axios from "axios";
import "../styles/ProjectDetails.css"


import { Snackbar } from "@mui/material";

const ProductDetailsComponent = () => {
  const [quantity, setQuantity] = useState(1);
 

  const [selectedProduct,setSelectedProduct ]= useState({});
  const getdata=async()=>{
    const product=await localStorage.getItem("product")
    setSelectedProduct(JSON.parse(product))
  }
  useEffect(()=>{
  getdata()
  },[])
  console.log(selectedProduct);

 


 
const [orderPrice,setOrderPrice]=useState(()=>{
    let a= localStorage.getItem("price")
    return parseInt(a)
})


 
  const [snackBarOpen, setSnackBarOpen] = useState(false);



  const handleIncrement = () => {
    setQuantity(quantity+1)
    setOrderPrice((p)=>p+parseInt(localStorage.getItem("price")))
   
  };

  const handleDecrement = () => {
    setQuantity(quantity-1)
    setOrderPrice((p)=>p-parseInt(localStorage.getItem("price")))
  
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setSnackBarOpen(false);
  };

 

  const [errorForToast, setErrorForToast] = useState(false);

  const handleOrder =  () => {
    const obj={
        Department:selectedProduct.Department,
        Description:selectedProduct.Description,
        Id:selectedProduct.Id,
        ImageSrc:selectedProduct.ImageSrc,
        Location:selectedProduct.Location,
        Poster:selectedProduct.Poster,
        Price:selectedProduct.Price,
        Quantity:quantity,
        TotalPrice:orderPrice,
        OrderedBy:localStorage.getItem("userName")

        

    }
    console.log(obj);
  
  
  };

  return (
    <>
      <h1 style={{ position: "relative", top: "22px", left: "20px" }}>
        Order Product
      </h1>
      <div className="container">
        <div className="firstContainer">
          <img
            height="200px"
            width="200px"
            src={selectedProduct.ImageSrc}
            alt="Product"
            style={{ objectFit: "cover" }}
          />
          <p>{`${selectedProduct?.Name}` || `No product`}</p>
        </div>
        <div className="secondContainer">
          <p>Price: {`Rs. ${orderPrice}` ?? "Rs. 0"}</p>
          <>
            <ButtonGroup size="small" aria-label="small outlined button group">
              {quantity > 0 && <Button variant="outlined" style={{padding:"1rem"}} onClick={handleDecrement}>-</Button>}
              {quantity > 0 && <Button variant="outlined" className="quan" disabled>{quantity}</Button>}
              <Button onClick={handleIncrement}>+</Button>
            </ButtonGroup>
          </>
          <Button variant="outlined" onClick={handleOrder}>
            Order Now
          </Button>

          {snackBarOpen && (
            <>
              <Snackbar
                open={snackBarOpen}
                autoHideDuration={3000}
                onClose={handleClose}
              >
                <Alert
                  onClose={handleClose}
                  severity={errorForToast ? "error" : "success"}
                  sx={{ width: "100%" }}
                >
                  {errorForToast
                    ? "Product order Failed :("
                    : "Product ordered successfully!"}
                </Alert>
              </Snackbar>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default ProductDetailsComponent;
