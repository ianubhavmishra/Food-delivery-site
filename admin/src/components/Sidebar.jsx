import React, { useState } from "react";
import { assets } from '../assets/assets'
import { NavLink } from 'react-router-dom'

const Sidebar = () => {
    
    const [isActive, setIsActive] = useState(false);

  const toggleStyle = () => {
    setIsActive(!isActive);
  };

    return (

        <div onClick={toggleStyle} className='flex gap-6 max-md:absolute max-md:right-[95%]' style={{
            right: isActive ? "50%" : "98%",
          }}>
        <div className='flex flex-col gap-5 min-h-[calc(100vh-81px)] min-w-[17vw] max-md:min-w-44 border-r border-black p-5 z-10 bg-gray-100'>
            <NavLink to="/add" className='flex items-center gap-4 cursor-pointer'>
                <img src={assets.add_icon} />
                <p>Add items</p>
            </NavLink>
            <NavLink to="/list" className='flex items-center gap-4 cursor-pointer'>
                <img src={assets.order_icon} />
                <p>Items list</p>
            </NavLink>
            <NavLink to="/orders" className='flex items-center gap-4 cursor-pointer'>
                <img src={assets.order_icon} />
                <p>Orders</p>
            </NavLink>
        </div>
        <img src='src/assets/hamburger-menu-svgrepo-com.svg' className='size-5 mt-1 relative right-14 z-20 md:hidden' style={{
            right: isActive ? "56px" : "0",
          }}/>
        </div>
    )
}

export default Sidebar
