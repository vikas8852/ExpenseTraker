// eslint-disable-next-line no-unused-vars
import React from 'react'
import { Link } from 'react-router-dom'

const Logo = () => {
  return (
    <div onClick={(e) => e.stopPropagation()}>
 <Link to="/">
    <img src="./src/assets/dollor.jpeg" alt="logo" className='w-14' />
 </Link>
 </div>
  )
}

export default Logo
