import React from 'react'
import { useMyDataContext } from '../context/DataContext'
import '../styles/Users.css'
import axios from 'axios'

function Users() {
    const {user}=useMyDataContext()
    const makeAdmin=(val)=>{
        axios.post(`https://localhost:7105/api/Auth/userTorole/admin/${val}`).then(()=>{
            alert("Admin Added")
        })

    }
  return (
    <>  <h3 style={{textAlign:"center"}}>Give Admin Access</h3>
    <div className='userCon'>
  
    {user && user.map && user.map((val,idx)=>(
        <div className='userContainer' key={idx}>
         
            <p>{val.UserName}</p>
            <p>{val.Email}</p>
            <button onClick={()=>makeAdmin(val.UserName)}>Make Admin</button>
        </div>
    ))}
      
    </div>
    </>
  )
}

export default Users
