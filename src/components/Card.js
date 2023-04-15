import React from 'react'
import '../styles/Home.css'

import { useNavigate } from 'react-router-dom'




function Card({product}) {
  
    const navigate=useNavigate()

    const selectProduct=()=>{
        localStorage.setItem("product",JSON.stringify(product))
        localStorage.setItem("price",product.Price)
        navigate("/productDetail")
    }
  return (
 
    <div onClick={()=>selectProduct(product)} className="product-card">
           <div className='img_container'>
           <img className='image'
              src={product.ImageSrc}
              alt="ProductImage"
            />
           </div>
            <div className="product-details">
              <h4>Name :{product.Name}</h4>
              <p style={{height:"5rem",overflowY:"scroll"}}>Description : {product.Description}</p>
              <p>Price : {product.Price}</p>
              <p>Quantity : {product.Quantity}</p>
              <p>Poster : {product?.Poster}</p>
              <h3>{product.Location}</h3>
            </div>
          </div>
 
  )
}

export default Card
