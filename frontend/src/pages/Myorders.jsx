import React, { useContext, useState, useEffect } from 'react'
import { Store_context } from '../components/context/Store_context';
import axios from 'axios';
import { assets } from '../assets/assets';


const Myorders = () => {

    const [data, setdata] = useState([]);
    const { url, token } = useContext(Store_context);

    const fetchOrders = async () => {
        const responce = await axios.post(url + "/api/order/orders", {}, { headers: { token } });
        setdata(responce.data.data);
        // console.log(responce.data.data);
        
    }

    useEffect(() => {
        if (token) {
            fetchOrders();
        }
    }, [token])

    return (
        <div className='mt-10 m-auto w-[80vw] max-md:w-[90vw] min-h-[36vh]'>
            <h1 className='font-medium text-2xl'>My Orders</h1>
            <div>
                {data.map((order, index) => {
                    return (
                        <div className='flex justify-between items-center border border-gray-600 px-4 my-3 max-md:flex-col max-md:text-xs max-md:py-3' key={index}>
                            <div className='flex justify-between items-center w-[33vw] max-md:w-full'>
                            <img src={assets.parcel_icon} />
                            <p className='w-[25vw] max-md:w-full'>{order.items.map((item,index)=>{
                                if(index===order.items.length-1){
                                    return item.name+" x "+item.quantity
                                }
                                else{
                                    return item.name+" x "+item.quantity+", "
                                }
                            })}</p>
                            </div>
                            <div className='flex justify-between items-center w-[40vw] max-md:w-full'>
                            <p>₹{order.amount}.00</p>
                            <p>Items:{order.items.length}</p>
                            <p className='w-[12vw] font-medium max-md:w-fit'><span className='text-orange-500'>&#x25cf;</span>{order.status}</p>
                            <button onClick={fetchOrders} className='bg-orange-200 p-2 rounded-md'>Track Order</button>
                            </div>
                        </div>
                    )
                })}             
            </div>
        </div>
    )
}

export default Myorders
