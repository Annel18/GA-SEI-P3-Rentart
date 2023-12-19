import ArtListDiv from "./ArtListDiv"
import ImageUploadSection from "./ImageUploadDiv"
// import { useEffect, useState } from 'react'
// import axios from "axios"
// import ArtworkUploadSection from "./ArtistWorkUploadDiv"

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

export default function ArtistProfile({ userData }) {
  // const [arts, setArts] = useState([])
  // const idAll = []
  // const idSet = [... new Set(arts.map(art => art._id))]
  // idSet.forEach(id => {
  //   idAll.push(id)
  // })

  // const { favourites } = userData
  // const favouritesValidity = idAll.filter((value) => favourites.includes(value))
  // console.log(favouritesValidity)

  // useEffect(() => {
  //   async function getArtData() {
  //     try {
  //       const res = await axios.get('/api/art')
  //       setArts(res.data)
  //     } catch (error) {
  //       console.log(error)
  //     }
  //   }
  //   getArtData()
  // }, [])



  // async function checkRentalValidity() {
  //   try {
  //     const rentalValidity = idAll.filter((value) => userData.rented.includes(value))
  //     // const favouritesValidity = idAll.filter((value) => userData.favourites.includes(value))
  //     const resUser = await axios.put('/api/profile', { rented: rentalValidity }, {
  //       headers: {
  //         Authorization: `Bearer ${userData.token}`,
  //       },
  //     })
  //     const newData = { ...resUser.data, token: userData.token }
  //     setUserData(newData)

  //   } catch (error) {
  //     console.log(error)
  //   }
  // }



  // useEffect(() => {
  //   console.log(favouritesValidity)
  //   async function checkFavouriteValidity(favouritesValidity) {
  //     try {
  //       // const favouritesValidity = idAll.filter((value) => userData.favourites.includes(value))
  //       const resUser = await axios.put('/api/profile', { favourites: favouritesValidity }, {
  //         headers: {
  //           Authorization: `Bearer ${userData.token}`,
  //         },
  //       })
  //       const newData = { ...resUser.data, token: userData.token }
  //       setUserData(newData)

  //     } catch (error) {
  //       console.log(error)
  //     }
  //   }

  //   checkFavouriteValidity(favouritesValidity)
  // }, [])


  return (
    <section>
      <Container className='' fluid={true}>
        <Row className=''>
          <Col className='settings' sm={2}>
            <h3 className='modal-header' style={{ justifyContent: "flex-end" }}>Settings</h3>
            <ImageUploadSection />
            <Container className="setting-fields">
              <div><p>{userData.name}</p><button>Edit</button></div>
              <div><p>Delivery Address</p><button>Edit</button></div>
              <div><p>Payment Details</p><button>Edit</button></div>
            </Container>
          </Col>
          <Col className='user-information'>
            <Row>
              <div style={{ display: "flex" }}>
                <h2>PROFILE: {userData.name}, Artist</h2>
              </div>

              <div style={{ display: "flex" }}>
                <h4>Username: {userData.username}</h4>
              </div>
            </Row>
            <Row>
              <Col></Col>
              <Col></Col>
            </Row>
            <Row >
              <Col style={{ backgroundColor: 'grey', color: 'white' }}>MY OWN ART COLLECTION</Col>
              <Container fluid className='art-grid'>
                <Row className="artAll-list">
                  {userData.personal_collection
                    .map((artId) => {
                      return (
                        <ArtListDiv id={artId} key={artId} crossDisplay={true} heartDisplay={'none'}/>
                      )
                    })}
                </Row>
              </Container>
            </Row>
            <Row >
              <Col style={{ backgroundColor: 'grey', color: 'white' }}>CURRENTLY ON RENT</Col>
              <Container fluid className='art-grid'>
                <Row className="artAll-list">
                  {userData.rented
                    // .filter(artId => {
                    //   artId === undefined
                    // })
                    .map((artId) => {
                      // checkRentalValidity()
                      return (
                        <ArtListDiv id={artId} key={artId} crossDisplay={'none'} heartDisplay={'none'} />
                      )
                    })}
                </Row>
              </Container>
            </Row>
            <Row >
              <Col style={{ backgroundColor: 'grey', color: 'white' }}>FAVOURITES</Col>
              <Container fluid className='art-grid'>
                <Row className="artAll-list">
                  {userData.favourites
                    // .filter(artId => artId === undefined)
                    .map((artId) => {
                      // checkFavouriteValidity(favouritesValidity)
                      return (
                        <ArtListDiv id={artId} key={artId} crossDisplay={'none'} heartDisplay={true}/>
                      )
                    })}
                </Row>
              </Container>
            </Row>
          </Col>
        </Row>
      </Container>
    </section>
  )
}