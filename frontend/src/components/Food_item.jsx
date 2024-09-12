import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { Store_context } from './context/Store_context'

const Food_item = ({ id, name, description, price, image }) => {

  const { cartItems, addToCart, removeFromCart, url} = useContext(Store_context)

  return (
    <div className='bg-gray-100 animate-fadeIn'>
      <div className='relative'>
        <img src={url+"/images/"+image} />
        {!cartItems[id] ? <img className='cursor-pointer absolute bottom-1 right-1 size-10' onClick={() => addToCart(id)} src={assets.add_icon_white} /> :
          <div className='flex cursor-pointer items-center justify-between absolute bottom-1 right-1 rounded-3xl w-24 bg-white'>
            <img onClick={() => removeFromCart(id)} src={assets.remove_icon_red} />
            <p>{cartItems[id]}</p>
            <img onClick={() => addToCart(id)} src={assets.add_icon_green} />
          </div>}
      </div>
      <div className='flex justify-between items-center'>
        <p className='text-xl font-medium'>{name}</p>
        <img className='w-20 h-5' src={assets.rating_starts} alt="" />
      </div>
      <div>
        <p>{description}</p>
        <p className='text-orange-600 font-medium text-xl'>₹{price}</p>
      </div>
    </div>
  )
}

export default Food_item
