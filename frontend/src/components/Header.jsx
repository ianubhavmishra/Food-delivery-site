import React from 'react'

const Header = () => {
  return (
    <div className='bg-[url(/header_img.png)] w-[80vw] max-md:w-[90vw] max-md:h-[39vw] bg-contain bg-no-repeat h-[34vw] my-8 max-md:my-4 mx-auto relative'>
      <div className='flex flex-col items-start gap-5 absolute bottom-6 m-4 max-md:gap-1 max-md:h-14 animate-fadeIn'>
        <h2 className='text-white font-semibold text-8xl max-md:text-xl'>Order your <br /> favourite food here</h2>
        <p className='text-white font-normal text-lg max-md:hidden'>Lorem ipsum Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti harum sunt itaque quas minus laborum! dolor sit amet consectetur adipisicing elit. Nostrum incidunt ipsa doloribus quos? Ipsam dignissimos minima, aspernatur in neque</p>
        <a href='#menu'><button  className='px-6 py-4 hover:font-bold max-md:px-1 max-md:py-1 max-md:text-xs bg-white rounded-3xl'>View Menu</button></a>
      </div>
    </div>
  )
}

export default Header
