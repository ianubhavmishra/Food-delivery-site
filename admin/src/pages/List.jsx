import axios from 'axios';
import React from 'react'
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';


const List = ({url}) => {

  const [list, setlist] = useState([]);

  const fetchData = async () => {
    const responce = await axios.get(`${url}/api/food/list`)
    if (responce.data.success) {
      setlist(responce.data.data)
    }
    else {
      toast.error(responce.data.message)
    }
  }

  const removeItem = async(foodId)=>{
    const responce = await axios.post(`${url}/api/food/remove`,{id:foodId})
    if(responce.data.success){
      toast.success(responce.data.message)
      fetchData();
    }
    else {
      toast.error(responce.data.message)
    }
  }

  useEffect(() => {
    fetchData();
  }, [])

  return (
    
      <div className='w-[75vw] max-md:w-[90vw] m-auto my-10 max-md:text-sm'>
      <div className='flex justify-between text-center mb-1'>
        <p className='w-32'>Item</p>
        <p className='w-32'>Category</p>
        <p className='w-32'>Price</p>
        <p className='w-32'>Action</p>
      </div>
      <hr />
      <div>
        {list.map((item, index) => {

            return (
              <div key={index}>
                <hr />
              <div className='flex justify-between text-center items-center my-3'>
                <div className='w-32'>
                  <img className='w-20 max-md:w-12 rounded-md m-auto' src={`${url}/images/`+item.image} />
                  <p className='max-md:text-sm'>{item.name}</p>
                </div>
                <p className='w-32'>{item.category}</p>
                <p className='w-32'>₹{item.price}</p>
                <p className='w-32 rounded-full hover:bg-red-500' onClick={()=>removeItem(item._id)}>X Remove</p>
                </div>
                </div>
            )
        })}
      </div>
    </div>
  )
}

export default List
