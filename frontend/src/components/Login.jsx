import React, {useContext, useState} from 'react'
import { assets } from '../assets/assets'
import { Store_context } from './context/Store_context';
import axios from 'axios'
// import ScrollLock from 'react-scrolllock';

const Login = ({setShowLogin}) => {

    const [currState, setcurrState] = useState("Sign in");
    const [data, setdata] = useState({name:"",email:"",password:""});
    const {url,settoken} = useContext(Store_context);

    const onChangeHandler = (e)=>{
      setdata({...data,[e.target.name]:e.target.value});
    }

    const onLogin = async(e)=>{
        e.preventDefault()
        let newUrl = url;
        if(currState==="Sign up"){
          newUrl += "/api/user/register"
        }
        else{
          newUrl += "/api/user/login"
        }

        const responce = await axios.post(newUrl,data);
        if(responce.data.success){
          settoken(responce.data.token);
          localStorage.setItem("token",responce.data.token)
          setShowLogin(false)
        }
        else{
          alert(responce.data.message)
        }
    }


  return (
    <div className='grid w-full h-[100vh] top-0  bg-[#00000090] absolute z-10'>
      <form onSubmit={onLogin} className='place-self-center bg-gray-300 w-96 max-md:w-60 rounded-lg'>
        <div className='flex justify-between w-80 max-md:w-52 m-auto py-4 items-center font-semibold text-xl'>
            <h1>{currState}</h1>
            <img className='cursor-pointer' onClick={()=>setShowLogin(false)} src={assets.cross_icon}/>
        </div>
        <div className='flex flex-col gap-8 max-md:gap-3 items-center '>
            {currState==="Sign in"?<></>:<input className='w-80 max-md:w-52 rounded-md p-1 border-orange-400 border' name='name' value={data.name} onChange={onChangeHandler} type="text" placeholder='Your name' required/>}
            <input className='w-80 max-md:w-52 rounded-md p-1 border-orange-400 border' name='email' value={data.email} onChange={onChangeHandler} type="email" placeholder='Email' required/>
            <input className='w-80 max-md:w-52 rounded-md p-1 border-orange-400 border' name='password' value={data.password} onChange={onChangeHandler} type="password" placeholder='Password' required/>
        </div>
        <div className='flex flex-col pb-3 gap-3 w-80 max-md:w-52 m-auto'>
          <div className='flex items-start gap-2 pt-4 max-md:text-sm'>
            {currState==="Sign up"?<><input className='mt-2' type="checkbox" required/>
            <p>By continuing, I agree to terms of use & privacy policy.</p></>:<></>}
          </div>
          <button type='submit' className='w-80 max-md:w-52 border cursor-pointer border-gray-800 bg-orange-400 rounded-md py-2 font-medium max-md:py-1'>{currState==="Sign up"?"Create account":"Sign in"}</button>
            {currState==="Sign in"?
            <p className='max-md:text-sm'>Don't have an account?<span className='cursor-pointer text-orange-400 font-medium pl-1' onClick={()=>setcurrState("Sign up")}>Sign up</span></p>:
            <p className='max-md:text-sm'>Already have an account?<span className='cursor-pointer text-orange-400 font-medium pl-1' onClick={()=>setcurrState("Sign in")}>Sign in</span></p>
            }
        </div>
      </form>
    </div>
  )
}

export default Login
