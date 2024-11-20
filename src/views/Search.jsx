import React from 'react'
import { useState } from 'react';
import { useParams } from "react-router";
import { useSearchPokemonQuery } from '../redux/api';
import { Row, Col, Image } from 'react-bootstrap';
import Header from '../components/Header';
import Bookmarks from '../components/Bookmarks';
import Footer from '../components/Footer';
import PokemonList from '../components/PokemonList';
import loader from '../assets/loading.gif'

const Search = () => {
  const { query } = useParams()
  const {data, isLoading, isSuccess, isFetching, error} = useSearchPokemonQuery(query)
  const [count, setCount] = useState(0);
  const handleBookmarks = () => {
    setCount(count+1)
  }

  const content = () => {
    if(error)
      return(
        <p>{error.error}</p>
      )
    else if(isLoading || isFetching)
      return(
        <div className='h-100 d-flex align-items-center justify-content-center'>
          <Image src={loader} fluid />
        </div>
      )
    else if(isSuccess && data.length < 1)
      return (
        <p>No Pokémon matching.</p>
      )
    else if(isSuccess && data)
      return (
        <Row>
          {data?.map(poke => 
            <Col key={poke.id} xs={6} lg={3} className='py-2'>
              <PokemonList change={count} {...poke} />
            </Col>
          )}
        </Row>
      )
  }



  return (
      <>
      <Header param={query} />
      <Bookmarks parentChange={handleBookmarks}/>
      <div className='search container py-3 h-100 overflow-auto'>
        <h1>{data?.length} results found for '{query}'.</h1>
          {content()}
      </div>
      <Footer/>
    </>
  )
}

export default Search