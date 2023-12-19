/* eslint-disable react/prop-types */
import { useState, useEffect } from "react"
import { getIndArt } from "../utils/loaders/artLoader"
import { Link, useOutletContext } from 'react-router-dom'
import axios from "axios"


import Col from 'react-bootstrap/Col'

export default function ArtListDiv({ id, crossDisplay, heartDisplay }) {
  const [painting, setPainting] = useState('')
  const [userData, setUserData] = useOutletContext()

  const isUserLoggedIn = userData && userData.token

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
  
  async function updateArtistCollection(updatedCollection) {
    try {
      const userRes = await axios.put('/api/profile', { personal_collection: updatedCollection }, {
        headers: {
          Authorization: `Bearer ${userData.token}`,
        },
      })
      const newData = { ...userRes.data, token: userData.token }
      setUserData(newData)
      const artRes = await axios.delete(`/api/art/${id}`, {
        headers: {
          Authorization: `Bearer ${userData.token}`,
        },
      })
      setPainting(artRes.data)
    } catch (error) {
      console.log(error)
    }
  }
  const [arts, setArts] = useState([])
  const idAll = []
  const idSet = [... new Set(arts.map(art => art._id))]
  idSet.forEach(id => {
    idAll.push(id)
  })

  async function updateUserFavourites(newFavourite) {
    try {
      const favouritesValidity = idAll.filter((value) => newFavourite.includes(value))
      const res = await axios.put('/api/profile', { favourites: favouritesValidity }, {
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

  useEffect(() => {
    async function artworkRetrieve() {
      const artwork = await getIndArt(id)
      setPainting(artwork)
    }
    artworkRetrieve()
  }, [id])

  return (
    <Col
      className='single-art-container'
      // Link helps the individual art page function
      as={Link}
      xs={12}
      s={6}
      md={4}
      lg={3}
      xl={2}
      to={`/art/${painting._id}`}
    >

      <div className="rails" style={{ height: '200px', paddingBottom: '3em' }}>
        <div className="thumbnail" to={`/art/${painting._id}`}
          style={{ backgroundImage: `url(${painting.artImage})` }}>
          <p className='favorite'
            style={{ display: crossDisplay }}
            onClick={(e) => {
              e.preventDefault()
              if (isUserLoggedIn) {
                const { personal_collection, favourites } = userData
                const updatedCollection = personal_collection.filter(value => value !== painting._id)
                const newFavourite = favourites.filter(value => value !== painting._id)
                updateArtistCollection(updatedCollection)
                updateUserFavourites(newFavourite)
              }
            }}
          >
            {'❌'}
          </p>
          <p className='favorite'
            style={{ display: heartDisplay }}
            onClick={(e) => {
              e.preventDefault()
              if (isUserLoggedIn) {
                const { favourites } = userData
                const newFavourite = favourites.filter(value => value !== painting._id)
                updateUserFavourites(newFavourite)
              }
            }}
          >
            {'♥️'}
          </p>
        </div>
        <div className="art-title">
          <h5>{painting.artName}</h5>
          <p>{painting.artist}</p>
        </div>
      </div>
    </Col>
  )
}