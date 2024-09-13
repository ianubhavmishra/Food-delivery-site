import React, { useContext,useState,useEffect } from 'react'
import { Store_context } from '../components/context/Store_context';
import {useNavigate} from 'react-router-dom'
import axios from 'axios';
 

const PlaceOrder = () => {

  const { totalCartAmount, token, food_list, cartItems, url } = useContext(Store_context);
  const [data, setdata] = useState({ firstName: "", lastName: "", email: "", street: "", city: "", state: "", pincode: "", country: "", phone: "" })

  const onChangeHandler = (e) => {
    setdata({ ...data, [e.target.name]: e.target.value });
  }

  const placeOrder = async (e) => {
    e.preventDefault();
    let orderItems = [];
    food_list.map((item) => {
      if(cartItems[item._id]> 0) { 
      let itemInfo = item;
      itemInfo["quantity"] = cartItems[item._id];
      orderItems.push(itemInfo);
    }
  })
    
    let orderData = {
      address:data,
      items:orderItems,
      amount:totalCartAmount()+20,
    }

    const response = await axios.post(url+"/api/order/place",orderData,{headers:{token}});
    if(response.data.success){
      const {session_url} = response.data;
      window.location.replace(session_url);
    }
      else{
        alert("Somthing went wrong")
      }
}

const navigate = useNavigate();

useEffect(() => {
 if(!token){
  navigate("/cart");
  alert("Please login first before proceed")
 }
 else if(totalCartAmount()===0){
  navigate("/cart");
  alert("Please add items in cart before checkout")
 }
}, [token])


return (
  <form onSubmit={placeOrder} className='flex max-md:flex-col max-md:gap-8 justify-between w-[80vw] max-md:w-[90vw] m-auto max-md:my10 my-20 max-md:my-10'>

    <div className='flex flex-col justify-between w-[27vw] max-md:w-full min-h-[40vh] max-md:h-[36vh]'>
      <h1 className='font-semibold text-2xl'>Delivery Information</h1>
      <div className='flex'>
        <input className='p-1 mr-3 w-48 max-md:w-[48%] border border-gray-600 rounded-[4px] ' type="text" placeholder='First name' name='firstName' value={data.firstName} onChange={onChangeHandler} required />
        <input className='p-1 w-48 max-md:w-[48%] border border-gray-600 rounded-[4px]' type="text" placeholder='Last name' name='lastName' value={data.lastName} onChange={onChangeHandler} required />
      </div>
      <div className='flex flex-col gap-4'>
        <input className='p-1 w-[26vw] max-md:w-full border border-gray-600 rounded-[4px]' type="email" placeholder='Email address' name='email' value={data.email} onChange={onChangeHandler} required />
        <input className='p-1 w-[26vw] max-md:w-full border border-gray-600 rounded-[4px]' type="number" placeholder='Phone number' name='phone' value={data.phone} onChange={onChangeHandler} required />
        <input className='p-1 w-[26vw] max-md:w-full border border-gray-600 rounded-[4px]' type="text" placeholder='House-no. / Area/ Locality' name='street' value={data.street} onChange={onChangeHandler} required />
      </div>
      <div className='flex'>
        <input className='p-1 mr-3 w-48 max-md:w-[48%] border border-gray-600 rounded-[4px] ' type="text" placeholder='City' name='city' value={data.city} onChange={onChangeHandler} required />
        <input className='p-1 w-48 max-md:w-[48%] border border-gray-600 rounded-[4px] ' type="text" placeholder='State' name='state' value={data.state} onChange={onChangeHandler} required />
      </div>
      <div className='flex'>
        <input className='p-1 mr-3 w-48 max-md:w-[48%] border border-gray-600 rounded-[4px] ' type="number" placeholder='Pincode' name='pincode' value={data.pincode} onChange={onChangeHandler} required />
        <input className='p-1 w-48 max-md:w-[48%] border border-gray-600 rounded-[4px] ' type="text" placeholder='Country' name='country' value={data.country} onChange={onChangeHandler} required />
      </div>
    </div>

    <div>
      <div className='flex flex-col gap-2 w-[27vw] max-md:w-full'>
        <h1 className='font-semibold text-2xl'>Cart Total</h1>
        <div className='flex justify-between text-gray-600'>
          <p>Subtotal</p>
          <p>₹{0}</p>
        </div>
        <hr />
        <div className='flex justify-between text-gray-600'>
          <p>Delivery Fee</p>
          <p>₹{totalCartAmount() > 0 ? 20 : 0}</p>
        </div>
        <hr />
        <div className='flex justify-between font-medium'>
          <p>Total</p>
          <p>₹{totalCartAmount() > 0 ? totalCartAmount() + 20 : 0}</p>
        </div>
        <button type='submit' className='py-2 mt-3 bg-orange-500 text-white rounded-lg hover:text-black'>PROCEED TO CHECKOUT</button>
      </div>
    </div>
  </form>
)
}

export default PlaceOrder