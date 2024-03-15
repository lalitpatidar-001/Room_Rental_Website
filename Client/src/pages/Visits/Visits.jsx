import React, { useContext, useEffect, useState } from 'react'
import Navbar from '../../components/Navbar/Navbar'
import { Container } from './style'
import RoomVistorsCard from '../../components/RoomVistorsCard/RoomVistorsCard'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { userContext } from '../../context/userContext'

const Visits = () => {
    const {isLoggedIn, setIsLoggedIn} = useContext(userContext);
  const { id } = useParams();
  const [roomVisits , setRoomVisits]= useState([]);

    useEffect(() => {
      async function getAllCartItems(id) {
        try {
          const response = await axios.get(`http://localhost:5000/api/user/booked-room/${isLoggedIn._id}`);
          console.log(response);
          console.log("visits",response.data.data.bookedRooms)
          setRoomVisits(response.data.data.bookedRooms);
        //   setCartItemCount(response.data?.cartMobiles?.length)

        } catch (error) {
          console.log(error)
        }
      };
      getAllCartItems(id);
    }, []);


    return (
        <>
            <Navbar />
            <Container>
                <RoomVistorsCard roomVisits={roomVisits} />
            </Container>
        </>
    )
}

export default Visits