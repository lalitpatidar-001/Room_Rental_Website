import React, { useEffect, useState } from 'react'
import Navbar from '../../components/Navbar/Navbar'
import { Container, Wrapper } from './style'
import NoResult from '../../components/utils/NoResultMatched/NoResult';
import RoomCart from '../../components/RoomCart/RoomCart';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Loader from '../../components/Loader/Loader';
import { useDispatch, useSelector } from 'react-redux';
import { addAllMyRooms } from '../../redux/slices/roomSlice';

const MyRooms = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const {myRooms} = useSelector(state=>state.room);
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        async function getUsersRooms() {
            try {
                setIsLoading(true)
                const response = await axios.get(`http://localhost:5000/api/user/users-rooms/${id}`);
                console.log("myrooms", response.data.data)
                // setMyRooms(response.data.data)
                if(response.status===200){
                    dispatch(addAllMyRooms({data:response.data.data}))
                }
                
            } catch (error) {
                console.log(error)
            } finally {
                setIsLoading(false)
            }
        }
        getUsersRooms();
    }, [id])
    return (
        <>
            <Navbar />
            <Container>
                <Wrapper>
                    {isLoading ? <Loader text="loading your rooms..." /> :
                        <>
                            {
                                myRooms?.length === 0 ? (
                                    <NoResult text="You have not posted any room yet!" />
                                ) : (
                                    myRooms?.map((room) => {
                                        return <RoomCart page="myrooms" key={room?._id} room={room}></RoomCart>;
                                    })
                                )
                            }
                        </>
                    }
                </Wrapper>
            </Container>
        </>
    )
}

export default MyRooms