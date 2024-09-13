import React from 'react'
import { menu_list } from '../assets/assets'

const Menu_list = ({Category, setCategory}) => {
  return (
    <div className='w-[80vw] max-md:w-full mx-auto' id='menu'>
      <div className="max-md:w-[90vw] m-auto">
      <h1 className='font-medium text-3xl max-md:text-xl my-2 max-md:my-0'>Explore our Menu</h1>
      <p className='max-md:text-sm'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Corporis, molestias ex quis distinctio autem quasi perferendis totam, deleniti tempore, numquam suscipit placeat maxime officiis id!</p></div>
      <div className='flex gap-8 items-center justify-between p-4 text-center md:min-h-52 overflow-x-scroll'>
        {menu_list.map((item, index) => {
          return (
            <div onClick={()=>setCategory(prev=>prev===item.menu_name?"All":item.menu_name)} key={index}>
              <img className={Category===item.menu_name?"border-4 p-1 border-orange-400 rounded-full max-md:min-w-20":"max-md:min-w-20"} src={item.menu_image} />
              <p>{item.menu_name}</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Menu_list
