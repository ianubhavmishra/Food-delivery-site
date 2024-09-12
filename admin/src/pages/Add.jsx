import React from 'react'
import { useState } from 'react'
import { assets } from '../assets/assets'
import axios from 'axios'
import { toast } from 'react-toastify'

const Add = ({url}) => {

  const [image, setimage] = useState(false);
  const [data, setdata] = useState({name:"",description:"",category:"Salad",price:""});

  const onChangeHandler = (e)=>{
    setdata({...data,[e.target.name]:e.target.value})
  }

  const onSubmitHandler = async (e)=>{
    e.preventDefault();
    const formData = new FormData();
    formData.append("name",data.name)
    formData.append("description",data.description)
    formData.append("category",data.category)
    formData.append("price",Number(data.price))
    formData.append("image",image)

    const responce = await axios.post(`${url}/api/food/add`,formData)
    if(responce.data.success){
      setdata({name:"",description:"",category:"Salad",price:""})
      setimage(false)
      toast.success(responce.data.message)
    }
    else{
      toast.error(responce.data.message)
    }
  }

  return (
    <div>
      <form className='flex flex-col gap-5 p-8 max-md:w-[90vw]' onSubmit={onSubmitHandler}>
        <div>
            <p>Upload image</p>
            <label htmlFor="image">
                <img className=' w-[10vw] max-md:w-32 mt-2 cursor-pointer' src={image?URL.createObjectURL(image):assets.upload_area}/>
                <input onChange={(e)=>setimage(e.target.files[0])} type="file" name="image" id="image" hidden required/>
            </label>
        </div>
        <div>
            <p>Product name</p>
            <input className='w-[32vw] max-md:w-80 p-2 mt-2 border border-gray-300' onChange={onChangeHandler} value={data.name} name='name' type="text" placeholder='Enter product name' required/>
        </div>
        <div>
            <p>Product description</p>
            <textarea className='w-[32vw] h-[18vh] max-md:w-80 p-2 mt-2 border border-gray-300' onChange={onChangeHandler} value={data.description} name="description" placeholder='Enter product description'></textarea>
        </div>
        <div className='flex justify-between items-center max-md:flex-col gap-1 max-md:items-start'>
            <p>Category</p>
            <select className='w-[8vw] p-1 mt-2 border border-gray-300 cursor-pointer max-md:w-32'onChange={onChangeHandler} name='category'>
            <option value="Salad">Salad</option>
            <option value="Rolls">Rolls</option>
            <option value="Deserts">Deserts</option>
            <option value="Sandwich">Sandwich</option>
            <option value="Cake">Cake</option>
            <option value="Pure veg">Pure veg</option>
            <option value="Pasta">Pasta</option>
            <option value="Noodels">Noodels</option>
            </select>

            <p>Product price</p>
            <input className='w-[8vw] p-1 mt-2 border border-gray-300 max-md:w-32' onChange={onChangeHandler} value={data.price} type="number" name="price" placeholder='INR 00'/>
        </div>
        <button className='w-[8vw] max-md:w-80 p-1 mt-2 text-white bg-black' type='submit'>Add</button>
      </form>
    </div>
  )
}

export default Add
