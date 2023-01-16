import noimg from '../assets/pokemon.png'


export const formatName = (name) => {
  const arr = name.split('-')
  for(let i = 0; i < arr.length; i++){
    arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1)
  }
  return name = arr.join(' ')
}


export const formatNumber =(number) => {
  if(parseInt(number) < 10) return '#00' + number
  else if(parseInt(number) < 100) return '#0' + number
  else return '#' + number
}


export const handleErrorImg = (error) => {
  error.currentTarget.onError = null
  error.currentTarget.src = noimg
}


export const handleImg = (img) => {
  if(img === null)
    return noimg
  return img
}


export const getType = (url) => {
  const u = url.split('type/')
  return u[1].replace('/','')
}


export const getPokemonId = (url) => {
  const u = url.split('pokemon/')
  return u[1].replace('/','')
}


export const getSpeciesId = (url) => {
  const u = url.split('pokemon-species/')
  return u[1].replace('/','')
}


export const getEvolutionId = (url) => {
  const u = url.split('evolution-chain/')
  return u[1].replace('/','')
}


export const getPokemonImg = (id) => {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`
}


export const getFavorites = () => {
  const favorites = JSON.parse(localStorage.getItem('favorites'))
  if (favorites)
    return favorites
  return []
}


export const isInFavorites = (id) => {
  const favorites = JSON.parse(localStorage.getItem('favorites'))
  const validate = favorites ? favorites.filter(pokemon => parseInt(pokemon.id) === parseInt(id)) : []
  if (validate.length > 0)
    return true
  return false
}


export const setFavorites = (poke,add) => {
  const favorites = getFavorites()
  if(add){
    favorites.push(poke)
    localStorage.setItem('favorites', JSON.stringify(favorites))
    return true
  }
  else{
    const newFavorites = favorites.filter(pokemon => pokemon.id !== poke.id)
    localStorage.setItem('favorites', JSON.stringify(newFavorites))
    return false
  }
}