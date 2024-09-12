import './App.css'
import Navbar from './components/Navbar'
import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Cart from './pages/Cart'
import PlaceOrder from './pages/PlaceOrder'
import Footer from './components/Footer'
import Login from './components/Login'
import Verify from './pages/Verify'
import Myorders from './pages/Myorders'
function App() {

  const [ShowLogin, setShowLogin] = useState(false)

  return (
    <>
      {ShowLogin?<Login setShowLogin={setShowLogin}/>:<></>}
     <Navbar setShowLogin={setShowLogin}/>
     <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/cart' element={<Cart/>} />
      <Route path='/order' element={<PlaceOrder/>} />
      <Route path='/verify' element={<Verify/>} />
      <Route path='/myorders' element={<Myorders/>} />
     </Routes>
     <Footer/>
    </>
  )
}

export default App
