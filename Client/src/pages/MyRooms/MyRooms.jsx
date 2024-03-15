import React, { useEffect, useState } from 'react'
import Navbar from '../../components/Navbar/Navbar'
import { Container, Wrapper } from './style'
import NoResult from '../../components/utils/NoResultMatched/NoResult';
import RoomCart from '../../components/RoomCart/RoomCart';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const MyRooms = () => {
    const {id} = useParams();
    const [myRooms, setMyRooms] = useState([]);

    useEffect(()=>{
        async function getUsersRooms(){
            try{
                const response = await axios.get(`http://localhost:5000/api/user/users-rooms/${id}`);
                console.log("myrooms",response.data.data)
                setMyRooms(response.data.data)
            }catch(error){
                console.log(error)
            }
        }
        getUsersRooms();
    },[id])
    return (
        <>
            <Navbar />
            <Container>
                <Wrapper>
                    {myRooms.length === 0 ? (
                        <NoResult />
                    ) : (
                        myRooms.map((room) => {
                            return <RoomCart page="myrooms" key={room._id} room={room}></RoomCart>;
                        })
                    )}
                </Wrapper>
            </Container>
        </>
    )
}

export default MyRooms