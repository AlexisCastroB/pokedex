import React from 'react'
import { useState, useEffect } from 'react';
import { Card, Image } from 'react-bootstrap'
import { handleImg, handleErrorImg, isInFavorites, formatNumber } from '../features/format';
import { useNavigate } from "react-router";
import bookmark from '../assets/bookmark.svg'

const PokemonList = ({name, id, url, change}) => {
  const [isFav, setIsFav] = useState(isInFavorites(id));
  useEffect(() => {
    setIsFav(isInFavorites(id))
  }, [change,id]);
  const navigate = useNavigate()
  const handleListClick = (id) => {
   navigate(`/pokemon/${id}`);
  };

  return (
    <Card
      className='pointer'
      onClick={() => handleListClick(id)}
      bg='light'
      text='dark'
    >
      <Card.Header
        className='text-center d-flex align-items-end justify-content-center'
      >
        <p className='m-0'>
        <span className='h4'>
          {name}{' '}
        </span>
        <span className='h6'>
          
          <small className='text-muted'>
            {formatNumber(id)}
          </small>
        </span>
        </p>
      </Card.Header>
      <Card.Body
        className='d-flex position-relative'
      >
        <Image
          src={handleImg(url)}
          loading='lazy'
          onError={handleErrorImg}
          fluid
        />
        {isFav && <div className='book'>
          <Image src={bookmark} fluid />
        </div>}
      </Card.Body>
    </Card>
  )
}

export default PokemonList