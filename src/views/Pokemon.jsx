import React from 'react'
import { useParams, useNavigate } from 'react-router';
import { useState, useEffect } from 'react';
import { usePokemonDetailQuery } from '../redux/api';
import { Row, Col, Image, Badge, ProgressBar, Card, Button, ToggleButtonGroup, ToggleButton } from 'react-bootstrap';
import { formatName, formatNumber, handleImg, handleErrorImg, getType, getSpeciesId, setFavorites, isInFavorites } from '../features/format';
import Header from '../components/Header';
import Bookmarks from '../components/Bookmarks';
import Footer from '../components/Footer';
import PokemonSpecies from '../components/PokemonSpecies';
import loader from '../assets/loading.gif'
import weight from '../assets/weight.png'
import ruler from '../assets/ruler.png'
import female from '../assets/female.svg'
import male from '../assets/male.svg'
import female_shiny from '../assets/female_shiny.svg'
import male_shiny from '../assets/male_shiny.svg'

const Pokemon = () => {
  const { id } = useParams()
  const {data, isLoading, isSuccess, isFetching, error} = usePokemonDetailQuery(id)
  const [isFav, setIsFav] = useState(false)
  const [count, setCount] = useState(0);
  const [image, setImage] = useState(null);
  const [forms, setForms] = useState([])
  const [active, setActive] = useState(0)
  useEffect(() => {
    setIsFav(isInFavorites(data?.id))
    setImage(handleImg(data?.sprites?.other?.home?.front_default))
    setForms(getForms(data?.sprites?.other?.home))
  }, [data]);
  const getForms = (forms = {}) => {
    const types = Object.keys(forms)
    const arr = []
    let i = 0
    types.forEach(type => {
      if(forms[type]){
        arr.push({id:i,name:type,value:forms[type]})
        i++
      }
    });
    return arr
  }
  const getIcon = (type) => {
    let icon = null
    switch (type){
      case 'front_default':
        icon = male
        break
      case 'front_female':
        icon = female
        break
      case 'front_shiny':
        icon = male_shiny
        break
      case 'front_shiny_female':
        icon = female_shiny
        break
      default:
        icon = null
        break
      }
    return icon
  }
  const handleChangeImage = (form) => {
    setImage(form.value)
    setActive(form.id)
  }
  const handleFavorites = (add) => {
    const poke = {id: data.id, name: formatName(data.name)}
    setIsFav(setFavorites(poke,add))
    setCount(count+1)
  }
  const handleChild = () => {
    setIsFav(isInFavorites(data?.id))
    setCount(count+1)
  }
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
                Failed to load Pokémon.
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
          <Row className='name'>
            <Col>
              <h1 className='display-1 text-center mb-4'>
                <strong>
                  {formatName(data.name)}{' '}
                </strong>
                <span className='display-6 text-secondary'>
                  <strong>
                    {formatNumber(data.id)}
                  </strong>
                </span>
              </h1>
            </Col>
          </Row>
          <Row className='content'>
            <Col xs={12} lg={6} className='img'>
              <div
                className={data?.types[0]?.type?.name + '-bg h-100 d-flex flex-column justify-content-between'}
              >
                <Image
                  className='p-3'
                  src={image}
                  onError={handleErrorImg}
                  fluid
                />
                <ToggleButtonGroup type='radio' name='forms'>
                  {forms.map(form =>
                    <ToggleButton
                      variant='dark'
                      size='sm'
                      checked={form.id === active}
                      onClick={() => handleChangeImage(form)}
                      onChange={(e) => setActive(e.currentTarget.value)}
                      value={form.id}
                      type='radio'
                      key={form.id}
                    >
                    <p className='m-0 p-1'><Image src={getIcon(form.name)}/></p>
                    </ToggleButton>
                  )}
                </ToggleButtonGroup>
              </div>
            </Col>
            <Col xs={12} lg={6}>
              <Row className='favorites my-3'>
                <Col>
                  <Button className='d-flex btn btn-danger' onClick={() => handleFavorites(!isFav)}>
                    <span>{isFav ? 'Remove from' : 'Add to'} favorites</span>
                  </Button>
                </Col>
              </Row>
              <Row className='height-weight my-3 justify-content-center justify-content-lg-start'>
                <Col xs={4} lg={3}>
                  <Card text='dark' border='0'>
                    <Card.Img src={ruler}/>
                    <Card.ImgOverlay className='d-flex align-items-center justify-content-center'>
                      <Card.Text as='span'><strong>{data?.height * 10}cm</strong></Card.Text>
                    </Card.ImgOverlay>
                  </Card>
                </Col>
                <Col xs={4} lg={3}>
                  <Card text='white'border='0'>
                    <Card.Img src={weight}/>
                    <Card.ImgOverlay className='d-flex align-items-end justify-content-center'>
                      <Card.Text as='span'><strong>{data?.weight / 10}kg</strong></Card.Text>
                    </Card.ImgOverlay>
                  </Card>
                </Col>
              </Row>
              <Row className='types my-3'>
                <Col>
                  <p className='mb-0'><strong>Types</strong><br/>
                    {data?.types?.map(type =>{
                      return(
                        <Badge
                          pill
                          key={type.slot}
                          className={type.type.name + ' mx-1 pointer'}
                          onClick={() => handleTypeClick(getType(type.type.url))}
                        >
                          {formatName(type.type.name)}
                        </Badge>
                      )
                    })}
                  </p>
                </Col>
              </Row>
              <Row className='stats my-3'>
                <Col>
                  <p className='mb-0'><strong>Stats</strong></p>
                    {data?.stats?.map(stat =>{
                      return(
                        <div key={stat.stat.name}>
                          <strong>{formatName(stat.stat.name)}</strong>
                          <ProgressBar
                            now={stat.base_stat / 2}
                            label={stat.base_stat}
                            variant='info'
                          />
                        </div>
                      )
                    })}
                </Col>
              </Row>
            </Col>
          </Row>
          <PokemonSpecies id={getSpeciesId(data?.species.url)} change={count} />
        </>
      )
  }



  return (
    <>
      <Header />
      <Bookmarks change={isFav} parentChange={handleChild}/>
      <div className='pokemon container py-3 h-100 overflow-auto'>
        {content()}
      </div>
      <Footer/>
    </>
  )
}

export default Pokemon