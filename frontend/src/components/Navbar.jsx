import React, { useContext, useState } from 'react'
import {Link} from 'react-router-dom'
import { assets } from '../assets/assets'
import { Store_context } from './context/Store_context'
import { useNavigate } from 'react-router-dom'

const Navbar = ({setShowLogin}) => {

  const [menu, setmenu] = useState("home")
  const {cartItems, totalCartAmount,token,settoken} = useContext(Store_context)
  const navigate = useNavigate();
  const logOut = ()=>{
    localStorage.removeItem("token");
    settoken("");
    navigate("/")
  }

  return (
    <div className='flex justify-around items-center pt-4'>
      <Link to='/'><img className='max-md:h-6' src={assets.logo}/></Link>
      <ul className='flex gap-x-8 text-lg cursor-pointer max-md:hidden'>
        <Link to='/'><li onClick={()=>{setmenu("home")}} className={menu==="home"?"border-b-2 border-gray-500 hover:font-medium":"hover:font-medium"}>Home</li></Link>
        <a href="#menu"onClick={()=>{setmenu("menu")}} className={menu==="menu"?"border-b-2 border-gray-500 hover:font-medium":"hover:font-medium"}>Menu</a>
        <li onClick={()=>{setmenu("mobile-app")}} className={menu==="mobile-app"?"border-b-2 border-gray-500 hover:font-medium":"hover:font-medium"}>Mobile App</li>
        <a href='#contact' onClick={()=>{setmenu("contact-us")}} className={menu==="contact-us"?"border-b-2 border-gray-500 hover:font-medium":"hover:font-medium"}>Contact us</a>
      </ul>
      <div className='flex items-center gap-8 max-md:gap-5 cursor-pointer'>
        <div>
        <img className='max-md:size-5' src={assets.search_icon} alt="" />
        </div>
        <div>
        <Link to='/cart'><img className='max-md:size-5' src={assets.basket_icon} alt="" /></Link>
        {totalCartAmount()>0?<div className="dot bg-red-500 size-3 max-md:size-2 rounded-lg relative bottom-9 left-6 max-md:bottom-6 max-md:left-4"></div>:<></>}
        </div>
        <div>
          {!token?<button onClick={()=>setShowLogin(true)} className='border px-5 py-2 max-md:py-0 max-md:px-1  border-black rounded-2xl hover:font-medium'>Sign in</button>:
          <div className='group absolute top-5 z-10'>
            <img className='max-md:h-5 max-md:w-4 h-8 w-7' src={assets.profile_icon}/>
            <ul className='hidden group-hover:flex flex-col gap-1 border border-gray-500 p-1 rounded-md bg-orange-100 relative right-[70px] mt-2 max-md:w-20 max-md:right-16'>
              <li onClick={()=>navigate("/myorders")} className='flex items-center gap-1 hover:text-orange-600  max-md:text-xs'><img className='max-md:size-5' src={assets.bag_icon}/>Orders</li>
              <hr/>
              <li onClick={logOut} className='flex items-center gap-1 hover:text-orange-600  max-md:text-xs'><img className='max-md:size-5' src={assets.logout_icon}/>Log-out</li>
            </ul>
          </div>}
        
        </div>
      </div>
    </div>
  )
}

export default Navbar
