import React, { useEffect, useState } from 'react'
import './home.css'
import Navbar from '../../components/Navbar/Navbar'
import { Container, Right } from './homeStyles'
import NoResult from '../../components/utils/NoResultMatched/NoResult'
import Filters from '../../components/Filters/Filters'
import RoomCart from '../../components/RoomCart/RoomCart'
import axios from 'axios'

function Home() {
  const [filteredRooms, setFilteredRooms] = useState([]);

  useEffect(() => {
    // Fetch all mobiles when the component render first time
    const fetchAllRooms = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/room/all-rooms');
        console.log(response.data.data)
        setFilteredRooms(response.data.data);
      } catch (error) {
        console.error('Error fetching all mobiles:', error);
      }
    };

    // Calling the function to fetch all mobiles
    fetchAllRooms();
  }, []);

  return (
    <>
      <Navbar />
      <Container>

        <Filters
          filteredRooms={filteredRooms} 
          setFilteredRooms={setFilteredRooms}
        />
        <Right>

          {filteredRooms.length === 0 ? (
            <NoResult />
          ) : (
            filteredRooms.map((room) => {
              return <RoomCart key={room.specsId} room={room}></RoomCart>;
            })
          )}
        </Right>
      </Container>
    </>

  )
}

export default Home