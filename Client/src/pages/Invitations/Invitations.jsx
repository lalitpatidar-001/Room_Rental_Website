import React, { useContext, useEffect, useState } from 'react'
import Navbar from '../../components/Navbar/Navbar'
import { Container, Wrapper } from './style'
import InvitationCard from '../../components/InvitationCard/InvitationCard'
import axios from "axios"
import { userContext } from '../../context/userContext'
const Invitations = () => {
    const { isLoggedIn } = useContext(userContext);
    const [invitations, setInvitaions] = useState([]);

    useEffect(() => {
        async function getAllInvitaions() {
            try {
                const response = await axios.get(`http://localhost:5000/api/invitation/invitations/${isLoggedIn?._id}`);
                console.log(response)
                console.log("Invitations", response.data.data);
                setInvitaions(response.data.data)
            } catch (error) {
                console.log(error)
            }
        }
        getAllInvitaions();
    }, [])

    return (
        <>
            <Navbar />
            <Container>
                <Wrapper>
                    {
                        invitations.map((invitation) => {
                             return <InvitationCard invitation={invitation}  />
                    })
                    }
                </Wrapper>
            </Container>
        </>
    )
}

export default Invitations