import React, { useContext, useEffect, useState } from 'react'
import { AddToCartButton, CancelVisitButton, Container, Discount, DiscountDiv, DiscountOff, Feature, Features, Heading, Image, Left, Middle, ModelandRating, Options, OriginalPrice, Price, PriceDiv, RamSpan, Rating, Right, Wrapper } from './style.js';
import GradeOutlinedIcon from '@mui/icons-material/GradeOutlined';
import CurrencyRupeeOutlinedIcon from '@mui/icons-material/CurrencyRupeeOutlined';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { userContext } from '../../context/userContext.js';
import toast from 'react-hot-toast';
import { deleteVisit } from '../../redux/slices/visitsSlice.js';
import { useDispatch } from 'react-redux';


function VisitCard({visit}) {
  console.log("visists",visit)
  const {isLoggedIn} = useContext(userContext);
  const dispatch= useDispatch();
const convertInNumber = (numberString)=>{
  return parseInt(numberString, 10).toLocaleString('en-IN');
}

const handleCancelVisit = async()=>{
  try{
    const response = await axios.put(`http://localhost:5000/api/room/cancel-room/${visit?._id}/${isLoggedIn?._id}`);
    if(response.status === 200){
      toast.success("Visit canceled successfully");
      dispatch(deleteVisit({data:visit?._id}))
    }
    console.log(response.data.data)
  }catch(error){
    console.log(error);
  }
}

const staticPath =  "http://localhost:5000/image/"+visit?.images[0]
  return (
    <Container>
   
      <Wrapper>
        <Left>
          <Image src={staticPath} />
        </Left>
        <Middle>
          <ModelandRating>
            <Link to={`/room/${visit._id}`} style={{color:"inherit", textDecoration:"none"}}>
              <Heading>{visit.roomType}</Heading>
            </Link>
            <RamSpan>{visit.address.city},{visit.address.state}</RamSpan>
            
          </ModelandRating>
          <PriceDiv>
            <Price><CurrencyRupeeOutlinedIcon style={{ fontSize: 22 }} />{convertInNumber(visit.rent)}</Price>
          </PriceDiv>
        </Middle>
        <Right>
        <CancelVisitButton onClick={handleCancelVisit}>Cancel Visit</CancelVisitButton>
        </Right>
      </Wrapper>
         
    </Container>
  )
}

export default VisitCard