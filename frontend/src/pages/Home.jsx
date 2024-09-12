import React, { useState } from 'react'
import Header from '../components/Header'
import Menu_list from '../components/Menu_list'
import Food_display from '../components/Food_display'

const Home = () => {

  const [Category, setCategory] = useState("All")

  return (
    <div>
      <Header/>
      <Menu_list Category={Category} setCategory={setCategory}/>
      <Food_display Category={Category}/>
    </div>
  )
}

export default Home
