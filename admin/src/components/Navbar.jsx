import React from 'react'
import { assets } from '../assets/assets'

const Navbar = () => {


  return (
    <div className='flex justify-between items-center px-8 max-md:px-1 max-md:pr-7 py-2'>
      <img className='w-36' src={assets.logo}/>
      <img className='size-12' src={assets.profile_image}/>
    </div>
  )
}

export default Navbar
