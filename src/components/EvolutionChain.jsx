import React from 'react'
import { Image } from 'react-bootstrap'
import { formatName, getSpeciesId, getPokemonImg } from '../features/format'
import PokemonList from './PokemonList'
import arrow from '../assets/arrow.svg'

const EvolutionChain = ({chain, change}) => {
  const buildPokemon = (species) => {
    const name = formatName(species.name)
    const id = getSpeciesId(species.url)
    const url = getPokemonImg(id)
    return {name,id,url}
  }

  const renderPokemon = (chain) => {
    return (
      <>
          <div className='evo-wrap'>
            <div className='evo-card m-2'>
              <PokemonList {...buildPokemon(chain.species)} change={change}/>
            </div>
          </div>
          {chain.evolves_to.length > 0 && <>
            <div className='arrow'>
              <Image src={arrow} fluid />
            </div>
            <div className='evo-wrap'>
                {chain.evolves_to.map(poke =>
                  <div className='evo-wrapper' key={buildPokemon(poke.species).id}>
                    {renderPokemon(poke)}
                  </div>
                )}
            </div>
          </>}
      </>
    )
  }

  return (
    <div className='evo-wrapper'>
      {renderPokemon(chain)}
    </div>
  )
}

export default EvolutionChain