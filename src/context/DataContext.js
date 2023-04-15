import axios from 'axios'
import React, { createContext, useContext, useEffect, useState } from 'react'
const MyContext=createContext()

function DataContext({children}) {

   const [products,setProducts]=useState([])
   const [toggle,setToggle]=useState(false)
   const [location,setLocation]=useState("")
   const [userName,setUserName]=useState("")
   const [department,setDepartment]=useState([])
   const changeData=()=>{
    setToggle(t=>!t)
   }
      useEffect(()=>{
axios.get("https://localhost:7105/api/Product").then((res)=>{
    setProducts(res.data)
})
   },[toggle])

   
  return (
   <MyContext.Provider value={{products,changeData,setLocation,location,userName,setUserName,department,setDepartment}}>
    {children}
   </MyContext.Provider>
  )
}


export function useMyDataContext(){
    return useContext(MyContext)
}

export default DataContext
