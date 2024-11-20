import React from 'react'
import { Row, Col, Form, Button } from 'react-bootstrap'
import { useState } from 'react';
import { useNavigate } from 'react-router';

const Searchbar = ({param = ''}) => {
  const navigate = useNavigate()
  const [search, setSearch] = useState(param)
  const [isDisabled, setIsDisabled] = useState(param.length >= 3 ? false : true)
  const handleInputChange = ({ target: { value }}) => {
    setSearch(value);
    if(value.length >= 3)
      setIsDisabled(false)
    else setIsDisabled(true)
  };
  const handleKeyDown = ({key}) => {
    if(key === 'Enter' && search.length >= 3){
      handleSearchClick()
    }
  }
  const handleSearchClick = () => {
    navigate(`/search/${search.trim().toLowerCase()}`);
  };



  return (
    <Row className='searchbar pb-4 pb-lg-5'>
      <Col>
        <Form.Control
          type='text'
          placeholder='Search for a Pokemon'
          value={search}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
        />
      </Col>
      <Col
        xs='auto'
      >
        <Button
          variant='danger'
          onClick={handleSearchClick}
          disabled={isDisabled}
        >
          Search
        </Button>
      </Col>
    </Row>
  )
}

export default Searchbar