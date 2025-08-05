// eslint-disable-next-line no-unused-vars
import React from 'react'
import { Link } from 'react-router-dom'
import dollorImg from "@/assets/dollor.jpeg";

const Logo = () => {
  return (
    <div onClick={(e) => e.stopPropagation()}>
 <Link to="/">
    <img src={dollorImg} alt="logo" className='w-14' />
 </Link>
 </div>
  )
}

export default Logo
