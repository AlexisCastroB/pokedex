import React from 'react'
import { usePokemonSpeciesQuery } from '../redux/api'
import { Row, Col, Image } from 'react-bootstrap'
import { getEvolutionId, getPokemonId, getPokemonImg,formatName } from '../features/format'
import loader from '../assets/loading.gif'
import PokemonEvolution from './PokemonEvolution'
import PokemonList from './PokemonList'

const PokemonSpecies = ({id, change}) => {
  const {data, isLoading, isSuccess, isFetching} = usePokemonSpeciesQuery(id)
  
  const getDescription = (entries) => {
    const english = entries.filter(entry => entry.language.name === 'en')
    return english[english.length - 1].flavor_text
  }
  
  const getTitle = (genera) => {
    const english = genera.filter(gen => gen.language.name === 'en')
    return english[0].genus
  }
  
  const content = () => {
    if(isLoading || isFetching)
      return(
        <Row className='pokemon-species'>
          <Col className='mt-3'>
            <div className='h-100 d-flex align-items-center justify-content-center'>
              <Image src={loader} fluid />
            </div>
          </Col>
        </Row>
      )
    else if(isSuccess && data)
      return(
        <>
          <Row className='pokemon-species'>
            <Col className='mt-3'>
              <h5>
                <strong>{getTitle(data.genera)}</strong><br/>
                {getDescription(data.flavor_text_entries)}
              </h5>
            </Col>
          </Row>
          <PokemonEvolution id={getEvolutionId(data.evolution_chain.url)} change={change} />
          <Row className='pokemon-varieties'>
            <Col className='mt-3'>
              <h4>
                Ohter varieties
              </h4>
              <Row>
                {data?.varieties?.map(poke => 
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
                      change={change}
                    />
                  </Col>
                )}
              </Row>
            </Col>
          </Row>
        </>
      )
    else return false
  }

  
  
  return (
    <>
      {content()}
    </>
  )
}

export default PokemonSpecies