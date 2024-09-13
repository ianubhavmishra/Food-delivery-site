import React, { useContext } from 'react'
import Food_item from './Food_item'
import { Store_context } from './context/Store_context'

const Food_display = ({Category}) => {

    const { food_list } = useContext(Store_context)

    return (
        <div className='w-[80vw] max-md:w-[90vw] m-auto'>
            <h2 className='font-medium text-3xl my-4 max-md:my-0'>Top dishes near you</h2>
            <div className='grid grid-cols-4 gap-4 max-md:grid-cols-1'>
                {food_list.map((item, index) => {
                    if(Category==="All" ||Category===item.category){
                        return <Food_item key={index} id={item._id} name={item.name} description={item.description} price={item.price} image={item.image} />
                    }
                })}
            </div>
        </div>
    )
}

export default Food_display
