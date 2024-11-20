import React from 'react'
import Header from '../components/Header';
import Bookmarks from '../components/Bookmarks';
import Footer from '../components/Footer';
import { useParams, useNavigate } from 'react-router-dom';
import { useTypeDetailQuery } from '../redux/api';
import { formatName, getPokemonId, getPokemonImg, getType } from '../features/format';
import { Row, Col, Image, Badge } from 'react-bootstrap';
import PokemonList from '../components/PokemonList';
import loader from '../assets/loading.gif'

const Type = () => {
  const { id } = useParams()
  const {data, isLoading, isSuccess, isFetching, error} = useTypeDetailQuery(id)
  const navigate = useNavigate()
  const handleTypeClick = (id) => {
   navigate(`/type/${id}`);
  };
  

  const content = () => {
    if(error)
      return(
        <Row className='h-100 d-flex align-content-center'>
          <Col>
            <h1 className='text-center m-0'>
                Failed to load Pokémon Type.
            </h1>
          </Col>
        </Row>
      )
    else if(isLoading || isFetching)
      return(
        <div className='h-100 d-flex align-items-center justify-content-center'>
          <Image src={loader} fluid />
        </div>
      )
    else if(isSuccess && data)
      return (
        <>
          <Row>
            <Col>
              <h1 className='display-1 text-center mb-4'>
                <strong>
                  <Badge
                    pill
                    className={data?.name + ' mx-1'}
                  >
                    {formatName(data?.name)}
                  </Badge>
                </strong>
              </h1>
            </Col>
          </Row>
          <Row>
            <Col>
              <h5><strong>Strong against:</strong><br/>
                {data?.damage_relations?.double_damage_to?.map(type =>{
                  return(
                    <Badge
                      pill
                      key={getType(type?.url)}
                      className={type?.name + ' mx-1 pointer'}
                      onClick={() => handleTypeClick(getType(type?.url))}
                    >
                      {formatName(type?.name)}
                    </Badge>
                  )
                })}
              </h5>
            </Col>
            <Col>
              <h5><strong>Weak against:</strong><br/>
                {data?.damage_relations?.double_damage_from?.map(type =>{
                  return(
                    <Badge
                      pill
                      key={getType(type?.url)}
                      className={type?.name + ' mx-1 pointer'}
                      onClick={() => handleTypeClick(getType(type?.url))}
                    >
                      {formatName(type?.name)}
                    </Badge>
                  )
                })}
              </h5>
            </Col>
          </Row>
          <Row>
              {data?.pokemon?.map(poke => 
                <Col
                  key={getPokemonId(poke.pokemon.url)}
                  xs={6}
                  lg={3}
                  className='py-2'
                >
                  <PokemonList
                    id={getPokemonId(poke.pokemon.url)}
                    name={formatName(poke.pokemon.name)}
                    url={getPokemonImg(getPokemonId(poke.pokemon.url))}
                  />
                </Col>
              )}
          </Row>
        </>
      )
  }



  return (
    <>
      <Header />
      <Bookmarks/>
      <div className='pokemon container py-3 h-100 overflow-auto'>
        {content()}
      </div>
      <Footer/>
    </>
  )
}

export default Type