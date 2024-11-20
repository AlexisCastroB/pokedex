import React from 'react'
import {Image} from 'react-bootstrap'
import logo from '../assets/pokedex_logo.png'
import Searchbar from '../components/Searchbar'

const Home = () => {
  return (
    <div className='home container my-auto'>
      <Image
        fluid
        src={logo}
        alt='Pokédex'
        className='pb-4 pb-lg-5'
      />
      <Searchbar />
    </div>
  )
}

export default Home