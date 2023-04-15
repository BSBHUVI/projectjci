import React, { useEffect, useState } from 'react'

import defaultimg from '../images/default.jpg'
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import axios from 'axios';
import '../styles/ProductForm.css'
import { useMyDataContext } from '../context/DataContext';
import {useNavigate } from 'react-router-dom';


function ProductForm() {
  const navigate=useNavigate()

  const {department}=useMyDataContext()
  const [user,setUser]=useState("")
  useState(()=>{
     const name=localStorage.getItem("userName")
     setUser(name)
  },[])

  useEffect(()=>{
   if(!department.includes("admin")){
  navigate("/home")
   }
  },[navigate,department])
  useEffect(()=>{
    let a=localStorage.getItem("isLoggedIn")
    if(!a){
       navigate("/") 
    }
},[navigate])
  const {changeData}=useMyDataContext()
 

  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [quantity,setQuantity]=useState("")
  const {location}=useMyDataContext();
  const [img1,setImg1]=useState(()=>({
    imageName:"",
    imageSrc:defaultimg,
    imageFile:null

  }))

  const showimage1=(e)=>{
    if(e.target.files && e.target.files[0]){
      let imageFile=e.target.files[0];
      const reader =new FileReader();
      reader.onload=x=>{
      
        setImg1({
          ...img1,
          imageFile:imageFile,
          imageSrc:x.target.result
          
        })
      }
      reader.readAsDataURL(imageFile);
    }else{
      setImg1({
        ...img1,
        imageFile:null,
        imageSrc:defaultimg
        
      })
    }

  }
  
const handleSubmit=(e)=>{
  e.preventDefault();
  const formdata=new FormData();
  formdata.append("Name",productName);
  formdata.append("Description",productDescription);
  formdata.append("Img",img1.imageFile)
  formdata.append("Poster",user)
  formdata.append("ImageName","imageName1")
  formdata.append("Price",productPrice)
  formdata.append("Quantity",quantity)
  formdata.append("Location",location)
  formdata.append("Department",JSON.stringify(department))
  
  

axios.post("https://localhost:7105/api/Product",formdata).then(()=>{
  navigate("/home")
}).then(()=>{
  changeData()
})

}

  return (
    <div className='post_container'>
   
      <form onSubmit={handleSubmit} className='post_form_container form'>
 <h2 className='post_furniture_heading'>Post Product</h2>
 <input value={productName} onChange={e=>setProductName(e.target.value)} type='text' placeholder='Enter the name of furniture' required/>

<input type='number' value={productPrice} onChange={e=>setProductPrice(e.target.value)} placeholder='Enter the Price' required/>

 <h3 style={{opacity:"0.6",marginTop:"0.7rem"}}>Upload image of the Product</h3>
 <div>
 <label htmlFor='img1'><AddPhotoAlternateIcon/></label>
<input id='img1' onChange={showimage1}  type='file' accept='image/**' required/>

<img width="200" height="200" src={img1.imageSrc} alt='selectedimage'/>
</div>




 <input type='text' value={productDescription} onChange={e=>setProductDescription(e.target.value)} placeholder='Enter the Description' required/>
 <input type='number' value={quantity} onChange={e=>setQuantity(e.target.value)} placeholder='Enter the Quantity' required/>
 <button className='upload'>Upload</button>
      </form>

    
    </div>
  )
}

export default ProductForm
