import React, { useEffect, useState } from 'react'
import { Container, InfoContainer } from './style'
import ImageCard from '../../components/ImageCard/ImageCard'
import DetailCard from '../../components/DetailCard/DetailCard'
import Navbar from '../../components/Navbar/Navbar';
import axios from 'axios';
import { useLocation, useParams } from 'react-router-dom';
import { Divider } from '@mui/material';

const Room = () => {
  const {id} = useParams();

  const [room , setRoom] = useState(null);
  const [loading , setLoading] = useState(false);
 

  useEffect(()=>{
    async function getRoom(){
      try {
        setLoading(true);
        const response = await axios.get(`http://localhost:5000/api/room/get-room/${id}`);
        console.log(response); 
        console.log("single room data ",response.data.data);
        setRoom(response.data.data);
        setLoading(false)
      } catch (error) {
        console.log(error)
      }
      finally{
        setLoading(false)
      }
    }
    getRoom();
  },[id]);

  

  return (
    <>
    <Navbar/>{
      loading?
      <div>Loading</div>
      :
    <Container>
            <ImageCard images={room?.images}/>
           <InfoContainer >
           <DetailCard room={room} />
           </InfoContainer>
    </Container>}
    </>
  )
}

export default Room