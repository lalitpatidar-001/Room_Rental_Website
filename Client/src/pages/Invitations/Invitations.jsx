import React, { useContext, useEffect, useState } from 'react'
import Navbar from '../../components/Navbar/Navbar'
import { Container, Wrapper } from './style'
import InvitationCard from '../../components/InvitationCard/InvitationCard'
import axios from "axios"
import { userContext } from '../../context/userContext'
import Loader from '../../components/Loader/Loader'
import NoResult from '../../components/utils/NoResultMatched/NoResult'
const Invitations = () => {
    const { isLoggedIn } = useContext(userContext);
    const [invitations, setInvitaions] = useState([]);
    const [isLoading , setIsLoading] = useState(false)

    useEffect(() => {
        async function getAllInvitaions() {
            try {
                setIsLoading(true)
                const response = await axios.get(`http://localhost:5000/api/invitation/invitations/${isLoggedIn?._id}`);
                console.log(response)
                console.log("Invitations", response.data.data);
                setInvitaions(response.data.data)
            } catch (error) {
                console.log(error)
            }finally{
                setIsLoading(false)
            }
        }
        getAllInvitaions();
    }, [isLoggedIn])

    return (
        <>
            <Navbar />
            <Container>
                <Wrapper>
                {
                    isLoading?
                    <Loader text="loading invitations"/>:
                    <>
                    {
                        invitations.length<=0 ?<NoResult text="No invitations Yet!"/>:
                        invitations.map((invitation) => {
                             return <InvitationCard invitation={invitation}  />
                    })
                    }
                    </>
                }
                    
                </Wrapper>
            </Container>
        </>
    )
}

export default Invitations