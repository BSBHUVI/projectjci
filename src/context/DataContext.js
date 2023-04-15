import axios from 'axios'
import React, { createContext, useContext, useEffect, useState } from 'react'

const MyContext=createContext()

function DataContext({children}) {

   const [products,setProducts]=useState([])
   const [toggle,setToggle]=useState(false)
   const [location,setLocation]=useState("")
   const [users,setUsers]=useState([])
  const [user,setUser]=useState([])
   const [userName,setUserName]=useState("")
   const [department,setDepartment]=useState([])
   const [userLocationProducts,setUserLocationProducts]=useState([])
   const [isLoggedIn,setIsLoggedIn]=useState(false)
  
   useEffect(()=>{
    const Userproducts=products.filter((res)=>res.Location===location);
    setUserLocationProducts(Userproducts)
   },[location,products])
   const changeData=()=>{
    setToggle(t=>!t)
   }
      useEffect(()=>{
axios.get("https://localhost:7105/api/Product").then((res)=>{
    setProducts(res.data)
})
   },[toggle])
   useEffect(()=>{
    let a=localStorage.getItem("isLoggedIn")
    if(a){
     setIsLoggedIn(true)
    }else{
        setIsLoggedIn(false)
    }
   },[])

   useEffect(()=>{
     const user=users.filter((u)=>{
       return u.Email===location && u.UserName!==userName
     })
     setUser(user)
   },[location, users,userName])


   useEffect(()=>{
if(localStorage.getItem("isLoggedIn")){
    axios.get("https://localhost:7105/api/Product").then((res)=>{
    setProducts(res.data)
}).then(()=>{
    setUserName(localStorage.getItem("userName"))
}).then(()=>{
    axios.get(`https://localhost:7105/api/Auth/getLocation/${userName}`).then((res)=>{
     setLocation(res.data)
     setUserName(userName)
     

    })
   }).then(()=>{
    axios.get(`https://localhost:7105/api/Auth/getRoles/${userName}`).then((res)=>{
        setDepartment(res.data)
                    })
})
}
   },[userName])


   useEffect(()=>{
axios.get("https://localhost:7105/api/Auth/getUsers/userList").then((res)=>{
setUsers(res.data)
})
   },[])

   
  return (
   <MyContext.Provider value={{user,isLoggedIn,products,changeData,setLocation,location,userName,setUserName,department,setDepartment,userLocationProducts,setIsLoggedIn,setUserLocationProducts}}>
    {children}
   </MyContext.Provider>
  )
}


export function useMyDataContext(){
    return useContext(MyContext)
}

export default DataContext
