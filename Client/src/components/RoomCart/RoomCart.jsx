import React, { useContext, useEffect, useState } from 'react'
import { AddToCartButton, Container, Discount, DiscountDiv, DiscountOff, Feature, Features, GoToCartButton, Heading, Image, Left, Middle, ModelandRating, OriginalPrice, Price, PriceDiv, Address, Right, Wrapper, CancelCross, DeleteButton, NoImageDiv } from './RoomCartstyles'
import GradeOutlinedIcon from '@mui/icons-material/GradeOutlined';
import CurrencyRupeeOutlinedIcon from '@mui/icons-material/CurrencyRupeeOutlined';
import { Link } from 'react-router-dom';
import { userContext } from '../../context/userContext';
import axios from 'axios'
import LocationOnIcon from '@mui/icons-material/LocationOn';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { deleteMyRoom, deleteRoom } from '../../redux/slices/roomSlice';
import { deleteWishlist } from '../../redux/slices/wishlistSlice';

function RoomCart({ room, page }) {
  const { isLoggedIn } = useContext(userContext);
  const dispatch = useDispatch();
  

  const convertInNumber = (numberString) => {
    return parseInt(numberString, 10).toLocaleString('en-IN');
  }

  const fullPath = "http://localhost:5000/image/" + room?.images[0]
  console.log("imagePath", fullPath)

  // const discount = Math.round((1 - (room.price / room.actualPrice)) * 100);
  const displayInch = (room.display * 0.393701).toFixed(2);

  const handleAddToCartClick = (event, roomId) => {
    event.preventDefault();
    event.stopPropagation();
    addToCart(roomId); // Call the addToCart function
  };
  const addToCart = async (specId) => {
    //  try {
    //   const response = await axios.post(`http://localhost:5000/api/cart/add/${isLoggedIn._id}`,{specId});
    //   console.log(response.data)
    //   if(response.status ==201){
    //       setAdded(!added);
    //       setIsItemAdded(!isItemAdded)
    //   }
    //  } catch (error) {
    //   console.log(error);

    //  }
  };

  let floor = ""
  switch (room.floorNumber) {
    case 0:
      floor = "Ground"
      break;
    case 1:
      floor = "1st"
      break;
    case 2:
      floor = "2nd"
      break;
    case 3:
      floor = "3rd"
      break;
    default:
      floor = room.floorNumber + "th"
  }


  useEffect(() => {
    async function getCartItem(specId) {
      try {
        const response = await axios.post(`http://localhost:5000/api/cart/get/${isLoggedIn._id}`, { specId });
      } catch (error) {
        if (error.response.status === 404 && error.response.data.msg === "not added to cart") {
        }
        else {
          console.log(error)
        }
      }

    };
  }, []);

  const handleClickRemoveFromList = async (e) => {
    try {
      const response = await axios.put(`http://localhost:5000/api/user/remove-from-wishlist/${room._id}/${isLoggedIn._id}`);
      if (response.status === 200) {
        toast.success("Room removed from wishlist");
        dispatch(deleteWishlist({data:room._id}))
       
      }
    } catch (error) {
      console.log(error)
    }

  }

  const handleDeleteRoom =async () => {
    try {
      const response = await axios.delete(`http://localhost:5000/api/room/remove-room/${room._id}`);
      console.log(response.data.data);
      if (response.status === 200) {
        dispatch(deleteRoom({data:room._id}));
        dispatch(deleteMyRoom({data:room._id}))
        toast.success("Room deleted successfully");
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Container>
      <Link to={`/room/${room?._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
        <Wrapper>
          <Left>
           { !room?.images[0] ? <NoImageDiv />:
            <Image src={fullPath} />}
          </Left>
          <Middle>
            <ModelandRating>
              <Heading>{room?.roomType} {room?.residentType} for {room?.tenantType}</Heading>
              <Address>
                <LocationOnIcon style={{ fontSize: 18, marginBottom: 3 }} /> {room?.address?.city}, {room?.address?.state}
              </Address>
            </ModelandRating>
            <Features>
              <Feature>{room?.roomType} {room?.residentType}</Feature>
              <Feature>only for {room?.tenantType}</Feature>
              <Feature>On {floor} Floor</Feature>
              <Feature>Available with {room?.bathroomPrivacy} bathroom</Feature>
              <Feature>{room?.furnitureFacility} Room</Feature>
            </Features>
          </Middle>
          <Right>
            <PriceDiv>
              <Price><CurrencyRupeeOutlinedIcon style={{ fontSize: 22 }} />{convertInNumber(room?.rent)}</Price>
            </PriceDiv>

            <div></div>

          </Right>
        </Wrapper>
      </Link>
      {page === "wishlist" && <CancelCross onClick={(e) => handleClickRemoveFromList(e)}>x</CancelCross>}
      {page === "myrooms" && <DeleteButton onClick={(e) => handleDeleteRoom(e)}>Delete</DeleteButton>}

    </Container>
  )
}

export default RoomCart