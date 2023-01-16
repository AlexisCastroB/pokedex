import React from 'react'
import { useNavigate } from 'react-router';
import logo from '../assets/pokedex_logo.png'
import { Image, Row, Col } from 'react-bootstrap';
import Searchbar from '../components/Searchbar';

const Header = ({param, }) => {
  const navigate = useNavigate()
  const handleHomeClick = () => {
    navigate(`/`);
  };



  return (
    <div className='header bg-dark'>
      <div className='container'>
        <Row>
          <Col
            xs={5}
            lg={2}
            className='pt-4 pt-lg-5 pb-2 pb-lg-3'
          >
            <Image
              fluid
              src={logo}
              alt='Pokédex'
              onClick={handleHomeClick}
            />
          </Col>
        </Row>
        <Searchbar param={param} />
      </div>
    </div>
  )
}

export default Header