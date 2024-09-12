import React, { useContext, useEffect} from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { Store_context } from '../components/context/Store_context.jsx'
import axios from 'axios'

const Verify = () => {

  const [searchParams, setSearchParams] = useSearchParams()
  const success = searchParams.get("success")
  const orderId = searchParams.get("orderId")
  const { url } = useContext(Store_context);
  const navigate = useNavigate();

  
  const verifyPayment = async () => {
    const responce = await axios.post(url + "/api/order/verify", { success, orderId });
    if (responce.data.success) {
      navigate("/myorders");
    }
    else {
      navigate("/");
      alert(responce.data.message);
    }
  }
    useEffect(() => {
      verifyPayment();
    }, [])



  return (
    <div className='grid min-h-[42vh]'>
<div className="border-gray-300 h-20 w-20 animate-spin rounded-full border-8 border-t-orange-400 place-self-center" />
    </div>
  )
}

export default Verify
