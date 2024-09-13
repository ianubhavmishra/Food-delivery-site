import React, { useContext } from 'react'
import { Store_context } from '../components/context/Store_context'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'

const Cart = () => {

  const navigate = useNavigate();
  const { cartItems, food_list, removeFromCart, addToCart, totalCartAmount , url} = useContext(Store_context)

  return (
    <div className='max-w-[80vw] max-md:max-w-[90vw] m-auto my-10'>
      <div className='flex justify-between text-center animate-fadeIn'>
        <p className='w-32'>Item</p>
        <p className='w-32'>Price</p>
        <p className='w-32'>Quantity</p>
        <p className='w-32'>Total</p>
      </div>
      <hr />
      <div>
        {food_list.map((item, index) => {

          if (cartItems[item._id] > 0) {

            return (
              <div>
              <div className='flex justify-between text-center items-center my-3' key={index}>
                <div className='w-32'>
                  <img className='w-20 max-md:w-12 rounded-md m-auto' src={url+"/images/"+item.image} />
                  <p className='max-md:text-sm'>{item.name}</p>
                </div>

                <p className='w-32'>₹{item.price}</p>
                <div className='flex cursor-pointer justify-evenly items-center rounded-3xl w-32 bg-white'>
                  <img className='max-md:w-5' onClick={() => removeFromCart(item._id)} src={assets.remove_icon_red} />
                  <p>{cartItems[item._id]}</p>
                  <img className='max-md:w-5' onClick={() => addToCart(item._id)} src={assets.add_icon_green} />
                </div>
                <p className='w-32'>₹{item.price * cartItems[item._id]}</p>
              </div>
              <hr />
              </div>
            )
          }
        })}
      </div>

        <div className=' mt-14 flex max-md:flex-col-reverse max-md:gap-8 justify-between'>
      <div className='flex flex-col gap-2 w-[27vw] max-md:w-full'>
        <h1 className='font-semibold text-2xl'>Cart Total</h1>
        <div className='flex justify-between text-gray-600'>
        <p>Subtotal</p>
        <p>₹{totalCartAmount()}</p>
        </div>
        <hr />
        <div className='flex justify-between text-gray-600'>
        <p>Delivery Fee</p>
        <p>₹{totalCartAmount()>0?20:0}</p>
        </div>
        <hr />
        <div className='flex justify-between font-medium'>
        <p>Total</p>
        <p>₹{totalCartAmount()>0?totalCartAmount()+20:0}</p>
        </div>
        <button onClick={()=>navigate('/order')} className='py-2 mt-3 bg-orange-500 text-white rounded-lg hover:text-gray-800'>PROCEED TO CHECKOUT</button>
      </div>

      <div className='w-[27vw] max-md:w-full'>
        <p className='text-gray-600'>If you have a promocode, Enter it here</p>
        <input className='bg-gray-200 w-[20vw] max-md:w-[50vw] py-1 my-1 rounded' type="text" placeholder='Promocode' required/>
        <button className='bg-black text-white m-1 px-5 py-1 rounded hover:bg-gray-800'>Submit</button>
      </div>
        </div>

    </div>
  )
}

export default Cart
