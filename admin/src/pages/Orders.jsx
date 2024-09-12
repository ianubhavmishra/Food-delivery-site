import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { assets } from '../../../frontend/src/assets/assets'

const Orders = ({ url }) => {

  const [orders, setorders] = useState([]);

  const fetchOrders = async () => {
    const responce = await axios.get(url + "/api/order/list");
    if (responce.data.success) {
      setorders(responce.data.data);
    }
    else {
      toast.error("Error")
    }
  }

  const statusHandler = async (event, orderId) => {
    const responce = await axios.post(url + "/api/order/status", {
      orderId,
      status: event.target.value
    })
    if (responce.data.success) {
      await fetchOrders();
    }
  }

  useEffect(() => {
    fetchOrders();
  }, [])

  return (
    <div className='mt-10 m-auto w-[80vw] max-md:w-[90vw] max-md:text-xs'>
      <h1 className='font-medium text-2xl'>Orders Page</h1>
      <div>
        {orders.map((order, index) => {
          return (
            <div className='flex justify-between items-center border border-gray-600 px-4 max-md:px-1 h-28 my-3 max-md:text-xs' key={index}>
              <div className='flex items-center max-md:items-start max-md:flex-col justify-between gap-1'>

                <img className='max-md:size-10' src={assets.parcel_icon} />
                <p className='w-[20vw]'>{order.items.map((item, index) => {
                  if (index === order.items.length - 1) {
                    return item.name + " x " + item.quantity
                  }
                  else {
                    return item.name + " x " + item.quantity + ", "
                  }
                })}</p>
              </div>

              <div className='flex items-center gap-6 max-md:flex-col max-md:gap-1'>

                <p>₹{order.amount}.00</p>
                <p>Items:{order.items.length}</p>
                <p><span className='text-orange-500'>&#x25cf;</span><b>{order.status}</b></p>
                <select onChange={(event) => statusHandler(event, order._id)} value={order.status} className='bg-orange-200 p-2 rounded-md max-md:py-1 max-md:p-0 text-xs'>
                  <option value="Food Processing">Food Processing</option>
                  <option value="Out for Delivery">Out for delivery</option>
                  <option value="Delivered">Delivered</option>
                </select>

              </div>

              <div className='flex flex-col'>
                <p>{order.address.firstName + " " + order.address.lastName}</p>
                <p>{order.address.street + ","}</p>
                <p>{order.address.city + ", " + order.address.state + ", " + order.address.country + ", " + order.address.pincode}</p>
                <p>{order.address.phone}</p>
              </div>

            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Orders
