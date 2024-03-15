import React, { useContext, useEffect, useState } from 'react'
import { Container, Discount, Feature, Features, Heading, Hr, Left, ModelName, OptionBox, OriginalPrice, Price, PriceDiv, Rams, Address, Right, Storages, Wrapper, FeatureDiv, Map, FullAddress, Button, AddressValue, AddressRow, AddressHead, AddressHeading, ButtonWrapper, Button2 } from './style'
import GradeOutlinedIcon from '@mui/icons-material/GradeOutlined';
import CurrencyRupeeOutlinedIcon from '@mui/icons-material/CurrencyRupeeOutlined';
import { Error } from './style';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { userContext } from '../../context/userContext';
import {toast} from "react-hot-toast"
import axios from 'axios';

function DetailCard({ room }) {
  const {isLoggedIn, setIsLoggedIn} = useContext(userContext);
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

  const handleInquiryVisit = async() => {
      try {
        const response = await axios.put(`http://localhost:5000/api/room/book-room/${room._id}/${isLoggedIn._id}`);
       if(response.status === 200){
        toast.success("Room Added To Visits")
       }
        
        //   setCartItemCount(response.data?.cartMobiles?.length)

      } catch (error) {
        console.log(error)
      }
    
}
  const handleToggleToWhishlist = async() => {
      try {
        const response = await axios.put(`http://localhost:5000/api/user//update-wishlist/${room._id}/${isLoggedIn._id}`);
       if(response.status === 200){
        toast.success(response.data.message)
       }
        

      } catch (error) {
        console.log(error)
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
            <Button onClick={handleInquiryVisit}>Inform Visit</Button>
            <Button2 onClick={handleToggleToWhishlist}>Add To Wishlist</Button2>
          </ButtonWrapper>
        </Right>
      </Container>

    </Wrapper>

  )
}

export default DetailCard