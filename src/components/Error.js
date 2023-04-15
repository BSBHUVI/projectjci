import React from 'react'
import { Link}from 'react-router-dom'


function Error() {
    
  return (
    <div style={{display:"flex",alignItems:"center",justifyContent:"center",flexDirection:"column"}}>
      <h1>404 Not Found</h1>
      <Link to="/home"> return to home page </Link>
    </div>
  )
}

export default Error
