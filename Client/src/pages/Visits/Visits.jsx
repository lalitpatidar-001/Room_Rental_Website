import React, { useContext, useEffect, useState } from 'react'
import Navbar from '../../components/Navbar/Navbar'
import { Container } from './style'
import RoomVistorsCard from '../../components/RoomVistorsCard/RoomVistorsCard'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { userContext } from '../../context/userContext'
import Loader from '../../components/Loader/Loader'
import NoResult from '../../components/utils/NoResultMatched/NoResult'
import {useSelector,useDispatch} from "react-redux"
import { addAllVisits } from '../../redux/slices/visitsSlice'
const Visits = () => {
  const { isLoggedIn, setIsLoggedIn } = useContext(userContext);
  const { id } = useParams();
  // const [roomVisits, setRoomVisits] = useState([]);
  const {roomVisits} = useSelector(state=>state.visits);
  const dispatch= useDispatch();
  const [IsLoading, setIsLoading] = useState(false)

  useEffect(() => {
    async function getAllCartItems(id) {
      try {
        setIsLoading(true)
        const response = await axios.get(`http://localhost:5000/api/user/booked-room/${isLoggedIn._id}`);
        console.log("response",response);
        console.log("visits", response.data.data)
        // setRoomVisits(response.data.data.bookedRooms);
        dispatch(addAllVisits({data: response.data.data}));

      } catch (error) {
        console.log(error)
      } finally {
        setIsLoading(false)
      }
    };
    getAllCartItems(id);
  }, []);


  return (
    <>
      <Navbar />
      <Container>
        {IsLoading ? <Loader text="Loading visits" /> : 
    
            < RoomVistorsCard roomVisits={roomVisits} />
      
        }
      </Container>
    </>
  )
}

export default Visits