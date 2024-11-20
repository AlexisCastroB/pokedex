import React from 'react'
import { useEvolutionQuery } from '../redux/api'
import { Row, Col, Image } from 'react-bootstrap'
import loader from '../assets/loading.gif'
import EvolutionChain from './EvolutionChain'

const PokemonEvolution = ({id, change}) => {
  const {data, isLoading, isSuccess, isFetching} = useEvolutionQuery(id)
  
  const content = () => {
    if(isLoading || isFetching)
      return(
        <Row className='pokemon-evolution'>
          <Col className='mt-3'>
            <div className='h-100 d-flex align-items-center justify-content-center'>
              <Image src={loader} fluid />
            </div>
          </Col>
        </Row>
      )
    else if(isSuccess && data)
      return(
        <Row className='pokemon-evolution'>
          <Col className='mt-3'>
            <h4>Evolution chain</h4>
            <Row>
              <Col>
                <EvolutionChain chain={data?.chain} change={change} />
              </Col>
            </Row>
          </Col>
        </Row>
        
      )
    else return false
  }



  return (
    <>
      {content()}
    </>
  )
}

export default PokemonEvolution