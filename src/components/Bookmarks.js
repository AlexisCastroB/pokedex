import React from 'react'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Card, CloseButton, Image } from 'react-bootstrap'
import { getFavorites,setFavorites } from '../features/format'
import bookmark from '../assets/bookmark.svg'
import minus from '../assets/minus.svg'

const Bookmarks = ({change, parentChange}) => {
  const [favorites, setFavs] = useState(getFavorites());
  useEffect(() => {
    setFavs(getFavorites)
  }, [change]);
  const [open, setOpen] = useState(false)
  const handleOpen = () => {
    setOpen(!open)
  }
  const removeFavorite = (poke) => {
    setFavorites(poke,false)
    setFavs(getFavorites)
    parentChange()
  }
  const navigate = useNavigate()
  const handleListClick = (id) => {
   navigate(`/pokemon/${id}`);
  };
  return (
    <div className={open ? 'open-bookmarks' : 'close-bookmarks'}>
      {!open && <Image
        src={bookmark}
        fluid
        onClick={() => handleOpen()}
        className='pointer'
      />}
      {open && <Card bg='danger' text='white' className='mh-100 h-100'>
        <Card.Header className='d-flex justify-content-between bg-danger'>
          <h5 className='m-0'>Favorites</h5>
          <CloseButton variant='white' onClick={() => handleOpen()} />
        </Card.Header>
        <Card.Body className='overflow-auto h-100 mh-100'>
          {favorites.map(fav =>
          <div className='d-flex align-items-center' key={fav.id}>
            <Button variant='danger' onClick={() => removeFavorite(fav)}>
              <Image src={minus} className='minus-icon'/>
            </Button>
            <p
              className='m-0 pointer w-100'
              onClick={() => handleListClick(fav.id)}
            >
              {fav.name}
            </p>
          </div>
          )}
        </Card.Body>
      </Card>}
    </div>
  )
}

export default Bookmarks