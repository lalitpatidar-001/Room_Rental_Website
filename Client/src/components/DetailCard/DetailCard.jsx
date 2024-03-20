import React, { useContext, useEffect, useState } from 'react'
import { Container, Discount, Feature, Features, Heading, Hr, Left, ModelName, OptionBox, OriginalPrice, Price, PriceDiv, Rams, Address, Right, Storages, Wrapper, FeatureDiv, Map, FullAddress, Button, AddressValue, AddressRow, AddressHead, AddressHeading, ButtonWrapper, Button2, ButtonCancel, LoadingButton } from './style'
import GradeOutlinedIcon from '@mui/icons-material/GradeOutlined';
import CurrencyRupeeOutlinedIcon from '@mui/icons-material/CurrencyRupeeOutlined';
import { Error } from './style';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { userContext } from '../../context/userContext';
import { toast } from "react-hot-toast"
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { deleteWishlist, updateWishlist } from '../../redux/slices/wishlistSlice';
import { deleteVisit, updateVisit } from '../../redux/slices/visitsSlice';

function DetailCard({ room }) {
  const { isLoggedIn, setIsLoggedIn } = useContext(userContext);
  const { wishlists } = useSelector(state => state.wishlist);
  const { roomVisits } = useSelector(state => state.visits);
  const dispatch = useDispatch();
  const [isInWishList, setIsInWishlist] = useState(wishlists.some(item => item._id === room?._id));
  const [isInVisits, setIsInVisits] = useState(roomVisits.some(item => item._id === room?._id));
  const [inviteLoading, setInviteLoading] =
    useState(false)
  const [wishlistLoading, setWishlistLoading] =
    useState(false)



  useEffect(() => {
    setIsInWishlist(wishlists.some(item => item._id === room?._id))
  }, [wishlists]);
  useEffect(() => {
    setIsInVisits(roomVisits.some(item => item._id === room?._id))
  }, [roomVisits]);


  console.log("in wish", isInWishList)
  console.log("room", room)
  if (!room) {
    return
  }

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

  const handleInquiryVisit = async () => {
    try {
      setInviteLoading(true)
      const response = await axios.put(`http://localhost:5000/api/room/book-room/${room._id}/${isLoggedIn._id}`);
      console.log("visit dispavyh", response.data.data)
      if (response.status === 200) {
        toast.success("Room Added To Visits");
        dispatch(updateVisit({ data: response.data.data }));
      }
      //   setCartItemCount(response.data?.cartMobiles?.length)
    } catch (error) {
      console.log(error)
    } finally {
      setInviteLoading(false)
    }
  }
  const handleCancelVisit = async () => {
    try {
      setInviteLoading(true);
      const response = await axios.put(`http://localhost:5000/api/room/cancel-room/${room._id}/${isLoggedIn._id}`);
      console.log("visit dispavyh", response.data.data)
      if (response.status === 200) {
        toast.success("Canceled Room Visit");
        dispatch(deleteVisit({ data: room._id }));
      }
    } catch (error) {
      console.log(error)
    } finally {
      setInviteLoading(false);
    }
  }




  const handleToggleToWhishlist = async () => {
    try {
      setWishlistLoading(true)
      const response = await axios.put(`http://localhost:5000/api/user//update-wishlist/${room._id}/${isLoggedIn._id}`);
      if (response.status === 200) {
        toast.success(response.data.message);
        if (isInWishList) {
          dispatch(deleteWishlist({ data: room._id }));
        } else {
          dispatch(updateWishlist({ data: room }))
        }

      }


    } catch (error) {
      console.log(error)
    } finally {
      setWishlistLoading(false);
    }

  }

  return (
    <Wrapper>
      <Container>
        <Left>
          <ModelName>{room.roomType} </ModelName>
          <Address>
            <LocationOnIcon style={{ fontSize: 18, marginBottom: 3 }} /> Vilaspur, Madhya-Pradesh
          </Address>
          <PriceDiv>
            <Price><CurrencyRupeeOutlinedIcon />{room.rent}</Price>
          </PriceDiv>
          <Features>
            <Feature>{room.roomType} {room.residentType}</Feature>
            <Feature>only for {room.tenantType}</Feature>
            <Feature>On {floor} Floor</Feature>
            <Feature>Available with {room.bathroomPrivacy} bathroom</Feature>
            <Feature>{room.furnitureFacility} Room</Feature>
            {room.furnitureFacility !== "Not Furnished" && <Feature>with Furniture such {room.furnitureFacilityValues} </Feature>}

            <Feature>
              {room.waterFacilty.isFee ?
                <FeatureDiv> water : <CurrencyRupeeOutlinedIcon style={{ fontSize: 15, marginRight: -4 }} />
                  {`${room.waterFacilty.rent}/month`}
                </FeatureDiv>
                :
                "water : no extra charge"
              }
            </Feature>
            <Feature>
              {room.gasFacility.isFee ?
                <FeatureDiv> Gas : <CurrencyRupeeOutlinedIcon style={{ fontSize: 15, marginRight: -4 }} />
                  {`${room.gasFacility.rent}/month`}
                </FeatureDiv>
                :
                "Gas : no available"
              }
            </Feature>
            <Feature>
              {room.internetFacilty.isFee ?
                <FeatureDiv> Internet/Wifi : <CurrencyRupeeOutlinedIcon style={{ fontSize: 15, marginRight: -4 }} />
                  {`${room.internetFacilty.rent}/month`}
                </FeatureDiv>
                :
                " Internet/Wifi : no extra charge"
              }
            </Feature>

            <Feature>
              Parking :
              {room.accessbility.parking ?
                " Wide Parking Area" : " no parking area"}
            </Feature>
            <Feature>
              Lift :
              {room.accessbility.lift ?
                " Lift for tenant" : " no lift"}
            </Feature>
            <Feature>
              Wheelramp :
              {room.accessbility.wheelramp ?
                " wheel ramp for disabled" : " no wheel ramp"}
            </Feature>
            <Feature>
              Pets :
              {room.accessbility.petallowed ?
                " Pets are allowed" : " no pet allowed"}
            </Feature>
          </Features>
        </Left>

        <Right>
          {/* <Map /> */}
          <FullAddress>
            <AddressHeading>Address</AddressHeading>
            <AddressRow>
              <AddressHead>name : </AddressHead>
              <AddressValue>{room.address.name}</AddressValue>
            </AddressRow>
            <AddressRow>
              <AddressHead>Contact : </AddressHead>
              <AddressValue>{room.address.contact}</AddressValue>
            </AddressRow>
            <AddressRow>
              <AddressHead>city : </AddressHead>
              <AddressValue>{room.address.city}</AddressValue>
            </AddressRow>
            <AddressRow>
              <AddressHead>district : </AddressHead>
              <AddressValue>{room.address.district}</AddressValue>
            </AddressRow>
            <AddressRow>
              <AddressHead>pincode : </AddressHead>
              <AddressValue>{room.address.pincode}</AddressValue>
            </AddressRow>
          </FullAddress>

          <ButtonWrapper>
            {inviteLoading ? <LoadingButton>Updating invite...</LoadingButton>
              :
              <>
                {!isInVisits ? <Button onClick={handleInquiryVisit}>Inform Visit</Button>
                  :
                  <ButtonCancel onClick={handleCancelVisit}>Cancel Visit</ButtonCancel>}
              </>
            }
            {/* toggle whishlist button */}
            {wishlistLoading ? <LoadingButton>Updating wishlist...</LoadingButton>
            :
              <>
                {!isInWishList ?
                  <Button2 onClick={handleToggleToWhishlist}>Add To Wishlist</Button2>
                  :
                  <ButtonCancel onClick={handleToggleToWhishlist}>Remove From Wishlist</ButtonCancel>
                }
              </>}
          </ButtonWrapper>
        </Right>
      </Container>

    </Wrapper>

  )
}

export default DetailCard