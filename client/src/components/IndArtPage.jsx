// import { Link } from 'react-router-dom'
import axios from "axios"
import { useLoaderData, useOutletContext } from 'react-router-dom';

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { useState } from 'react'
// import { buttonBaseClasses } from "@mui/material";

export default function IndArtPage() {
    //! STATES
    const indArt = useLoaderData()

    const {
        _id: artId,
        artImage,
        artName,
        artist,
        type,
        description,
        movement,
        media,
        year,
        width,
        height,
        availability,
        price } = indArt

    const [userData, setUserData] = useOutletContext()
    const [availableToRent, setavailableToRent] = useState(availability)
    const isUserLoggedIn = userData && userData.token

    console.log(userData)

    async function updateUserRented() {
        console.log('NEW LOG', artId, availableToRent, userData.token)
        try {
            const res = await axios.put(`/api/art/rent/${artId}`, { availability: !availableToRent }, {
                headers: {
                    Authorization: `Bearer ${userData.token}`,
                },
            })
            setavailableToRent(!availableToRent)
            setUserData({ ...res.data[1], token: userData.token })
        } catch (error) {
            console.error(error)
        }
    }


    //! JSX
    return (
        <main>
            <Container className='indArtContainer' fluid={true}>
                <Row className='indArtSection'>
                    <Col className='indArtImageColumn' sm={6}>
                        <div className="poster-container">
                            <div className="poster" style={{ backgroundImage: `url(${artImage})` }}><></></div>
                        </div>
                    </Col>
                    <Col className='indArtTextColumn'>
                        <Row>
                            <h2>{artName}</h2>
                            <h4>{artist}, {year}</h4>
                        </Row>
                        <Row>{description}</Row>
                        <Row>
                            <Col>Type</Col>
                            <Col>{type}</Col>
                        </Row>
                        <Row>
                            <Col>Movement</Col>
                            <Col>{movement}</Col>
                        </Row>
                        <Row>
                            <Col>Media</Col>
                            <Col>{media}</Col>
                        </Row>
                        <Row>
                            <Col>Measurements</Col>
                            <Col>{width} x {height}cm</Col>
                        </Row>
                        <Row>
                            <Col>Price</Col>
                            <Col>£{price}</Col>
                        </Row>
                        <Row>
                            {(isUserLoggedIn) ?
                                availableToRent ? <button
                                    className='rent-button'
                                    onClick={() => {
                                        updateUserRented()
                                    }}>
                                    Click to Rent
                                </button> :
                                    userData.rented.includes(artId) ? (
                                        <button
                                            className='rent-button'
                                            onClick={() => {
                                                updateUserRented()
                                            }}>
                                            Return Art
                                        </button>
                                    ) : (<p>Not Available</p>)
                                :
                                (
                                    <>
                                        <p className="logInMessage">Log in to rent art</p>
                                    </>
                                )
                            }
                        </Row>
                    </Col>
                </Row>
            </Container>
        </main>
    )
}