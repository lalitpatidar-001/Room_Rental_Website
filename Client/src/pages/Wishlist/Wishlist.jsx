import React, { useContext, useEffect, useState } from 'react'
import Navbar from '../../components/Navbar/Navbar'
import { Container, Wrapper } from './style'
import { userContext } from '../../context/userContext';
import axios from 'axios';
import NoResult from '../../components/utils/NoResultMatched/NoResult';
import RoomCart from '../../components/RoomCart/RoomCart';
import Loader from '../../components/Loader/Loader';
import { useDispatch, useSelector } from 'react-redux';
import { addAllWishlists } from '../../redux/slices/wishlistSlice';

const Wishlist = () => {
  const { isLoggedIn, setIsLoggedIn } = useContext(userContext);
  // const [wishlists, setwishlists] = useState([]);
  const dispatch  = useDispatch();
  const {wishlists} = useSelector(state=>state.wishlist);
  const [IsLoading, setIsLoading] = useState(false)

  useEffect(() => {
    // Fetch all mobiles when the component render first time
    const fetchAllRooms = async () => {
      try {
        setIsLoading(true)
        const response = await axios.get(`http://localhost:5000/api/user/wishlist/${isLoggedIn._id}`);
        console.log("wishlist", response.data.data)
        if(response.status === 200){
          dispatch(addAllWishlists({data:response.data.data}))
        }
      } catch (error) {
        console.error('Error fetching all mobiles:', error);
      } finally {
        setIsLoading(false)
      }
    };
    fetchAllRooms();
  }, [isLoggedIn]);

  return (
    <>
      <Navbar />
      <Container>
        <Wrapper>

         { IsLoading? <Loader text="Loading wishlist"/>:
          <>
            {wishlists.length === 0 ? (
              <NoResult text="you have no rooms in wishlist" />
            ) : (
              wishlists.map((room) => {
                return <RoomCart page="wishlist" key={room._id} room={room}></RoomCart>;
              })
            )}
          </>}
        </Wrapper>
      </Container>
    </>
  )
}

export default Wishlist