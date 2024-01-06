/* eslint-disable react/prop-types */
import { useState } from 'react'

import ArtListDiv from "./ArtListDiv"
import ImageUploadSection from "./ImageUploadDiv"
import ProfileInfoUpdate from "./ProfileInfoUpdate"


import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'



export default function AppreciatorProfile({ userData, setUserData }) {
  const [show, setShow] = useState(false)
  const [toChange, setToChange] = useState('')


  function loadModal(definition) {
    setToChange(definition)
    setShow(true)
  }


  return (
    <section>
      <Container className='' fluid={true}>
        <Row className=''>
          <Col className='settings' sm={2}>
            <h3 className='modal-header' style={{justifyContent:"flex-end"}}>Settings</h3>
            <ImageUploadSection />
            <Container className="setting-fields">
              <div><p>{userData.name}</p><button className="edit-button" onClick={() => loadModal('Name')} >Edit</button></div>
              <div><p>Delivery Address</p><button className="edit-button" onClick={() => loadModal('Address')} >Edit</button></div>
              <div><p>Payment Details</p><button className="edit-button" onClick={() => loadModal('Details')} >Edit</button></div>
            </Container>
            <ProfileInfoUpdate show={show} setShow={setShow} toChange={toChange} userData={userData} setUserData={setUserData} />
          </Col>
          <Col className='user-information'>
            <Row>
              <div style={{ display: "flex" }}>
                <h2>PROFILE: {userData.name}, Art Appreciator</h2>
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
              <Col style={{ backgroundColor: 'grey', color: 'white' }}>CURRENTLY ON RENT</Col>
              <Container fluid className='art-grid'>
                <Row className="artAll-list">
                  {userData.rented
                    .map((artId) => {
                      return (
                        <ArtListDiv id={artId} key={artId} crossDisplay={'none'} heartDisplay={'none'}/>
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
                    .map((artId) => {
                      return (
                        <ArtListDiv id={artId} key={artId} crossDisplay={'none'} heartDisplay={true} />
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