import React from 'react'

const PageNotFound = () => {
  return (
    <div style={{background:'#51A985', height:'100vh', display:'flex', alignItems:'center', justifyContent:'center'}}>
        <div className='text-center'>
            <h1 className='text-white font-bold' style={{fontSize:'45px'}}>Oops!</h1>
            <p className='text-white font-semibold text-3xl'>Its Seems, The Page You are looking doesn't exist</p>
        </div>
    </div>
  )
}

export default PageNotFound