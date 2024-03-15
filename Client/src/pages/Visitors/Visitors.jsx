import React, { useContext, useEffect, useState } from 'react'
import Navbar from '../../components/Navbar/Navbar'
import { Container, Wrapper } from './style'
import VisitorsCard from '../../components/VistorsCard/VisitorsCard'
import { userContext } from '../../context/userContext'
import axios from 'axios'

const Visitors = () => {
    const {isLoggedIn} = useContext(userContext);
    const [visitors, setVisitors] = useState(null);

    useEffect(() => {
        async function getVisitors(){
            const response = await axios.get(`http://localhost:5000/api/user/visitors/${isLoggedIn._id}`);
            console.log("dataaaa",response.data.data)
            setVisitors(response.data.data.visitors);
        }
        getVisitors();
    }, [isLoggedIn])

    return (
        <>
            <Navbar />
            <Container>
                <Wrapper>
                {
                    visitors?.map((visitor)=>(
                    <VisitorsCard visitor={visitor} />
                    )) 
                }
                </Wrapper>
            </Container>
        </>
    )
}

export default Visitors