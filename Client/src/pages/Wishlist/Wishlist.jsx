import React, { useContext, useEffect, useState } from 'react'
import Navbar from '../../components/Navbar/Navbar'
import { Container, Wrapper } from './style'
import { userContext } from '../../context/userContext';
import axios from 'axios';
import NoResult from '../../components/utils/NoResultMatched/NoResult';
import RoomCart from '../../components/RoomCart/RoomCart';

const Wishlist = () => {
    const {isLoggedIn, setIsLoggedIn} = useContext(userContext);
    const [wishlistRooms , setWishlistRooms] = useState([]);

     useEffect(() => {
    // Fetch all mobiles when the component render first time
    const fetchAllRooms = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/user/wishlist/${isLoggedIn._id}`);
        console.log("wishlist",response.data.data)
        setWishlistRooms(response.data.data);
      } catch (error) {
        console.error('Error fetching all mobiles:', error);
      }
    };
    fetchAllRooms();
},[isLoggedIn]);

  return (
    <>
        <Navbar/>
        <Container>
            <Wrapper>
            {wishlistRooms.length === 0 ? (
          <NoResult />
        ) : (
            wishlistRooms.map((room) => {
            return <RoomCart page="wishlist" key={room._id} room={room}></RoomCart>;
          })
        )}
            </Wrapper>
        </Container>
    </>
  )
}

export default Wishlist