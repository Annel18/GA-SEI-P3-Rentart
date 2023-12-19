// import * as React from 'react'
import { Link, useOutletContext } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from "axios"

//! components
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Slider from '@mui/material/Slider'
import Box from '@mui/material/Box'
import { Modal } from '@mui/material'

export default function ArtIndex() {
  //! States
  const [search, setSearch] = useState('')
  const [arts, setArts] = useState([])
  const [open, setOpen] = useState(false)
  const [userData, setUserData] = useOutletContext()
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  const isUserLoggedIn = userData && userData.token

  //! Effects
  useEffect(() => {
    async function getArtData() {
      try {
        const res = await axios.get('/api/art')
        setArts(res.data)
      } catch (error) {
        console.log(error)
      }
    }
    getArtData()
  }, [])


  //* LIST OF ARTISTS
  const [artistChoice, setArtistChoice] = useState('Artists')
  const artistAll = [... new Set(arts.map(art => art.artist))]
  artistAll.sort()
  artistAll.unshift('Artists')

  //* LIST OF MOVEMENT
  const [movementChoice, setMovementChoice] = useState('Movements')
  const movementAll = []
  const movementSets = [... new Set(arts.map(art => art.movement))]
  movementSets.forEach(listOfMovement => {
    listOfMovement.forEach(movement => {
      movementAll.push(movement)
      movementAll.sort()
      movementAll.unshift('Movements')
    })
  })
  const movementList = movementAll.filter((value, index) => movementAll.indexOf(value) === index)

  //* LIST OF MEDIA
  const [mediaChoice, setMediaChoice] = useState('Media')
  const mediaAll = []
  const mediaSets = [... new Set(arts.map(art => art.media))]
  mediaSets.forEach(listOfMedia => {
    listOfMedia.forEach(medium => {
      mediaAll.push(medium)
      mediaAll.sort()
      mediaAll.unshift('Media')
    })
  })
  const mediaList = mediaAll.filter((value, index) => mediaAll.indexOf(value) === index)

  //* WIDTH SLIDER
  const minDistance = 10
  const [artWidth, setArtWidth] = useState([0, 1000])

  const handleChangeWidth = (event, newValue, activeThumb) => {
    if (!Array.isArray(newValue)) {
      return
    }

    if (activeThumb === 0) {
      setArtWidth([Math.min(newValue[0], artWidth[1] - minDistance), artWidth[1]])
    } else {
      setArtWidth([artWidth[0], Math.max(newValue[1], artWidth[0] + minDistance)])
    }
  }

  //* HEIGHT SLIDER
  const [artHeight, setArtHeight] = useState([0, 1000])

  const handleChangeHeight = (event, newValue, activeThumb) => {
    if (!Array.isArray(newValue)) {
      return
    }

    if (newValue[1] - newValue[0] < minDistance) {
      if (activeThumb === 0) {
        const clamped = Math.min(newValue[0], 1000 - minDistance)
        setArtHeight([clamped, clamped + minDistance])
      } else {
        const clamped = Math.max(newValue[1], minDistance)
        setArtHeight([clamped - minDistance, clamped])
      }
    } else {
      setArtHeight(newValue)
    }
  }

  //* PRICE SLIDER
  const [artPrice, setArtPrice] = useState([0, 100000])

  const handleChangePrice = (event, newValue, activeThumb) => {
    if (!Array.isArray(newValue)) {
      return
    }

    if (newValue[1] - newValue[0] < minDistance) {
      if (activeThumb === 0) {
        const clamped = Math.min(newValue[0], 100000 - minDistance)
        setArtPrice([clamped, clamped + minDistance])
      } else {
        const clamped = Math.max(newValue[1], minDistance)
        setArtPrice([clamped - minDistance, clamped])
      }
    } else {
      setArtPrice(newValue)
    }
  }

  //* FAVOURITES 
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false)

  // const [ArtId, setArtId] = useState('')
  // const idAll = []
  // const idSet = [... new Set(arts.map(art => art._id))]
  // idSet.forEach(id => {
  //   idAll.push(id)
  // })
  
  // userData.favourites.filter((value) => arts.includes(value))
  
  
  
  async function updateUserFavourites(newFavourite) {
    try {
      // const favouritesValidity = idAll.filter((value) => newFavourite.includes(value))
      const res = await axios.put('/api/profile', { favourites: newFavourite }, {
        headers: {
          Authorization: `Bearer ${userData.token}`,
        },
      })
      const newData = { ...res.data, token: userData.token }
      setUserData(newData)

    } catch (error) {
      console.log(error)
    }
  }

  //! Functions
  //* VALUES FOR SLIDES
  function valuetext(value) {
    return `${value} cm`
  }

  //! JSX
  return (
    <>
      <section className='index-page'>
        <button className='side-buttons' onClick={handleOpen} /*style={{top:'9em', left:'0.5em'}}*/>Filters˯ </button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box className='modal-container'>
            <div className='modal-header'>
              <h3
                onClick={(e) => {
                  e.preventDefault()
                  if (e.target.innerText === '♡') {
                    e.target.innerText = '♥️'
                    setShowFavoritesOnly(true)
                  } else {
                    e.target.innerText = '♡'
                    setShowFavoritesOnly(false)
                  }
                }}
              >
                {isUserLoggedIn ? '♡' : ''}
              </h3>
              <h3>Filters</h3>
            </div>
            <input
              placeholder="Search Title ..."
              className="search"
              onChange={(e) => setSearch(e.target.value)}
              value={search}
            />
            <section className='filter-selection'>
              <select
                className="selection-list"
                onChange={(e) => setArtistChoice(e.target.value)}
                value={artistChoice}
              >
                {artistAll
                  .map((artistChoice, i) => {
                    return <option key={i} value={artistChoice}>{artistChoice}</option>
                  })
                }
              </select>
            </section>
            <section className='filter-selection'>
              <select
                className="selection-list"
                onChange={(e) => setMovementChoice(e.target.value)}
                value={movementChoice}
              >
                {movementList
                  .map((movementChoice, i) => {
                    return <option key={i} value={movementChoice}>{movementChoice}</option>
                  })
                }
              </select>
            </section>
            <section className='filter-selection'>
              <select
                className="selection-list"
                onChange={(e) => setMediaChoice(e.target.value)}
                value={mediaChoice}
              >
                {mediaList
                  .map((mediaChoice, i) => {
                    return <option key={i} value={mediaChoice}>{mediaChoice}</option>
                  })
                }
              </select>
            </section>
            <Box className='filter-sliders-container'>
              <label>Width Range (cm)</label>
              <Slider
                min={0}
                max={1000}
                getAriaLabel={() => 'Minimum distance'}
                value={artWidth}
                onChange={handleChangeWidth}
                valueLabelDisplay="auto"
                getAriaValueText={valuetext}
                disableSwap
              />
              <label>Height Range (cm)</label>
              <Slider
                min={0}
                max={1000}
                getAriaLabel={() => 'Minimum distance shift'}
                value={artHeight}
                onChange={handleChangeHeight}
                valueLabelDisplay="auto"
                getAriaValueText={valuetext}
                disableSwap
              />
              <label>Price Range (£)</label>
              <Slider
                min={0}
                max={100000}
                getAriaLabel={() => 'Minimum distance shift'}
                value={artPrice}
                onChange={handleChangePrice}
                valueLabelDisplay="auto"
                getAriaValueText={valuetext}
                disableSwap
              />
            </Box>
          </Box>
        </Modal>

        <Container fluid className='art-grid'>
          <Row className="artAll-list">
            {arts
              .filter(art => {
                const minWidth = artWidth[0]
                const maxWidth = artWidth[1]
                const minHeight = artHeight[0]
                const maxHeight = artHeight[1]
                const pattern = new RegExp(search, 'i')
                const isUserLoggedIn = userData && userData.token
                const userFavourites = isUserLoggedIn ? userData.favourites || [] : []
                const isFavorite = userFavourites.includes(art._id)
                const matchesFilter =
                  (minWidth < art.width &&
                    art.width < maxWidth &&
                    minHeight < art.height &&
                    art.height < maxHeight &&
                    ((artistChoice === 'Artists' && movementChoice === 'Movements' && mediaChoice === 'Media')
                      || (art.artist.includes(artistChoice) && movementChoice === 'Movements' && mediaChoice === 'Media')
                      || (art.artist.includes(artistChoice) && art.movement.includes(movementChoice) && mediaChoice === 'Media')
                      || (art.artist.includes(artistChoice) && art.movement.includes(movementChoice) && art.media.includes(mediaChoice))
                      || (art.artist.includes(artistChoice) && movementChoice === 'Movements' && art.media.includes(mediaChoice))
                      || (artistChoice === 'Artists' && art.movement.includes(movementChoice) && mediaChoice === 'Media')
                      || (artistChoice === 'Artists' && art.movement.includes(movementChoice) && mediaChoice === 'Media')
                      || (artistChoice === 'Artists' && art.movement.includes(movementChoice) && art.media.includes(mediaChoice)))
                    && pattern.test(art.artName)
                    && (showFavoritesOnly ? isFavorite : true))
                return matchesFilter
              })
              .sort((a, b) => {
                return a.artName.localeCompare(b.artName)
              }
              )
              .map((art, i) => {
                // 'indArtId' is to link to Individual Art Page
                const { _id: indArtId, artName, artImage, artist } = art
                const isFavourite = isUserLoggedIn && userData.favourites && userData.favourites.includes(indArtId)
                return (
                  <Col
                    className='single-art-container'
                    // Link helps the individual art page function
                    as={Link}
                    key={i}
                    xs={12}
                    s={8}
                    md={6}
                    lg={4}
                    xl={3}
                    to={`/art/${indArtId}`}
                  >
                    <div className="rails" style={{ height: '300px' }}>
                      <div className="thumbnail" to={`/art/${indArtId}`}
                        style={{ backgroundImage: `url(${artImage})` }}>

                        <p className='favorite'
                          onClick={(e) => {
                            e.preventDefault()
                            if (isUserLoggedIn) {
                              const { favourites } = userData
                              if (isFavourite) {
                                e.target.innerText = '🤍'
                                const newFavourite = favourites.filter(value => value !== indArtId)
                                updateUserFavourites(newFavourite)
                              }
                              else {
                                e.target.innerText = '♥️'
                                const newFavourite = [...favourites, indArtId]
                                updateUserFavourites(newFavourite)
                              }
                            }
                          }}
                        >
                          {isUserLoggedIn && (isFavourite ? '♥️' : '🤍')}
                        </p>
                      </div>
                      <div className="art-title">
                        <h5>{artName}</h5>
                        <p>{artist}</p>
                      </div>
                    </div>
                  </Col>
                )
              })}
          </Row>
        </Container>
      </section >
    </>
  )
}