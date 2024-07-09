import React from 'react'
import { useNavigate } from 'react-router-dom'

function Navbar() {
    const navigate = useNavigate();
  return (
    <div className='navbar-main'>
      <h1 style={{textAlign:'center'}}>FullStack Task</h1>
    <div className='navbar'>
        <button className='navic' onClick={()=>navigate('/')} >Home</button>
        <button className='navic' onClick={()=>navigate('/table')} >Table</button>
        <button className='navic' onClick={()=>navigate('/chart')} >Chart</button>
      </div>
      </div>
  )
}

export default Navbar