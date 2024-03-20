import React, { useContext, useEffect, useState } from 'react'
import './home.css'
import Navbar from '../../components/Navbar/Navbar'
import { Container, Right } from './homeStyles'
import NoResult from '../../components/utils/NoResultMatched/NoResult'
import Filters from '../../components/Filters/Filters'
import RoomCart from '../../components/RoomCart/RoomCart'
import axios from 'axios'
import Loader from '../../components/Loader/Loader'
import { useDispatch, useSelector } from "react-redux"
import { addAllRooms } from '../../redux/slices/roomSlice'
import { userContext } from '../../context/userContext'
import { addAllWishlists } from '../../redux/slices/wishlistSlice'

function Home() {
  // const [filteredRooms, setFilteredRooms] = useState([]);
  const { isLoggedIn } = useContext(userContext);
  const dispatch = useDispatch();
  const { filteredRooms } = useSelector(state => state.room);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Fetch all mobiles when the component render first time
    const fetchAllRooms = async () => {
      try {
        setIsLoading(true)
        const response = await axios.get('http://localhost:5000/api/room/all-rooms');
        console.log(response.data.data)
        // setFilteredRooms(response.data.data);
        dispatch(addAllRooms({ data: response.data.data }))
      } catch (error) {
        console.error('Error fetching all mobiles:', error);
      } finally {
        setIsLoading(false)
      }
    };

    // Calling the function to fetch all mobiles
    fetchAllRooms();
  }, []);

  useEffect(() => {
    async function getWishlists() {
      try {
        const response = await axios.get(`http://localhost:5000/api/user/wishlist/${isLoggedIn._id}`);
        console.log("wishlist",response)
        console.log("wishlist",response.data.data)
        if(response.status===200){
          dispatch(addAllWishlists({data:response.data.data}));
        }
      } catch (error) {
        console.log(error);
      }
    }
    getWishlists();
  }, [])

  return (
    <>
      <Navbar />
      <Container>

        <Filters />
        <Right>
          {
            isLoading ? <Loader /> : <>

              {filteredRooms.length === 0 ? (
                <NoResult />
              ) : (
                filteredRooms.map((room) => {
                  return <RoomCart key={room.specsId} room={room}></RoomCart>;
                })
              )}
            </>
          }
        </Right>
      </Container>
    </>

  )
}

export default Home