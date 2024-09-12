import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <div className='flex max-md:flex-col gap-4 justify-between items-start text-gray-400 max-md:mt-12 mt-28 p-10 bg-stone-800' id='contact'>
      <div className='flex flex-col gap-4 justify-between w-[40vw] max-md:w-full'>
        <img className='h-8 w-40' src={assets.logo}/>

        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut maiores error deleniti est, nesciunt sed dolorum eum, maxime magni dolores magnam laborum vero quasi! Laudantium minus accusamus dolorem dolorum aliquam, rem vitae voluptates. Delectus deserunt laborum quisquam non! Repellendus odio, dolore sapiente modi</p>
        <div className='flex gap-3 size-8'>
        <img src={assets.facebook_icon}/><img src={assets.twitter_icon}/><img src={assets.linkedin_icon}/>
        </div>
      </div>
      <div>
        <h1>COMPANY</h1>

        <li>Home</li>
        <li>About us</li>
        <li>Delivery</li>
        <li>Privacy policy</li>
      </div>
      <div>
        <h1>GET IN TOUCH</h1>

        <li>+91 9999222246</li>
        <li>contact@tomato.com</li>
      </div>
    </div>
  )
}

export default Footer
