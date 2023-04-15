import React from 'react'
import '../styles/Home.css'




function Card({product}) {
  return (
 
    <div className="product-card">
           <div className='img_container'>
           <img className='image'
              src={product.ImageSrc}
              alt="ProductImage"
            />
           </div>
            <div className="product-details">
              <h3>{product.Name}</h3>
              <p>{product.Description}</p>
              <h3>{product.Price}</h3>
              <h3>{product.Quantity}</h3>
            </div>
          </div>
 
  )
}

export default Card
