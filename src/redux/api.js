import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { formatName, getPokemonId, getPokemonImg, } from '../features/format';

export const pokemonApi = createApi({
 reducerPath: 'pokemonApi',
 baseQuery: fetchBaseQuery({ baseUrl: 'https://pokeapi.co/api/v2/' }),
 endpoints: (builder) => ({
  searchPokemon: builder.query({
   query: () => ({
    url: `/pokemon?limit=100000&offset=0`,
    method: 'GET'
   }),
   transformResponse: (response, meta, arg) => {
    const filter = response.results.filter(poke => poke.name.includes(arg))
    const data = filter.map(poke => {
      const name = formatName(poke.name)
      const id = getPokemonId(poke.url)
      const url = getPokemonImg(id)
      return {name,id,url}
    })
    return data
   }
  }),
  pokemonDetail: builder.query({
   query: (id) => ({
    url: `/pokemon/${id}/`,
    method: 'GET'
   }),
  }),
  typeDetail: builder.query({
   query: (id) => ({
    url: `/type/${id}/`,
    method: 'GET'
   }),
  }),
  pokemonSpecies: builder.query({
   query: (id) => ({
    url: `/pokemon-species/${id}/`,
    method: 'GET'
   }),
  }),
  evolution: builder.query({
   query: (id) => ({
    url: `/evolution-chain/${id}/`,
    method: 'GET'
   }),
  }),
 })
});

export const { useSearchPokemonQuery } = pokemonApi;
export const { usePokemonDetailQuery } = pokemonApi;
export const { useTypeDetailQuery } = pokemonApi;
export const { usePokemonSpeciesQuery } = pokemonApi;
export const { useEvolutionQuery } = pokemonApi;