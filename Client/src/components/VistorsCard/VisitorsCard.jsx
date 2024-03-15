import React, { useContext } from 'react'
import { CancelButton, Wrapper, Container, DetailWrapper, Details, Email, Head, Heading, Left, Options, Right, Value, AcceptButton } from './style'
import { Link } from 'react-router-dom'
import axios from 'axios';
import toast from 'react-hot-toast';
import { userContext } from '../../context/userContext';

const VisitorsCard = ({visitor}) => {
    console.log("visitors",visitor);
    const { isLoggedIn } = useContext(userContext);

    const handleCancelClick = async()=>{
        try{
            const response = await axios.put(`http://localhost:5000/api/user/cancel-visit/${visitor._id}/${isLoggedIn._id}/${visitor.roomId._id}`);

            console.log(response.data.data);

            if(response.status === 200){
                toast.success("Visit Canceled Successfully");
            }
        }catch(error){
            console.log(error);
        }
    }

    const handleInviteVisiteClick = async()=>{
        try{
            const response = await axios.post(`http://localhost:5000/api/invitation/sent-invitation/${isLoggedIn._id}/${visitor.roomId._id}/${visitor.visitorId._id}`);

            console.log(response.data.data);

            if(response.status === 201){
                toast.success(response.data.message);
            }
        }catch(error){
            console.log(error);
        }
    }
    return (

        <Wrapper>
            <Container>
                <Right>
                    <Heading>Visitor Details</Heading>
                    <Details>
                        <DetailWrapper>
                            <Head>Name : </Head>
                            <Value>{visitor.visitorId.username}</Value>
                        </DetailWrapper>
                        <DetailWrapper>
                            <Head>Email : </Head>
                            <Value>{visitor.visitorId.email}</Value>
                        </DetailWrapper>
                    </Details>

                </Right>
                <Link to={`/room/${visitor.roomId._id}`}>
                    <Left >
                        <Heading>Room Details</Heading>
                        <Details>
                            <DetailWrapper>
                                <Head>Room : </Head>
                                <Value>{visitor.roomId.roomType} {visitor.roomId.residentType}</Value>
                            </DetailWrapper>
                            <DetailWrapper>
                                <Head>Price : </Head>
                                <Value>{visitor.roomId.rent}</Value>
                            </DetailWrapper>
                            <DetailWrapper>
                                <Head>Address : </Head>
                                <Value>{visitor.roomId.address.area}, {visitor.roomId.address.district}, {visitor.roomId.address.state}</Value>
                            </DetailWrapper>
                        </Details>
                    </Left>
                </Link>
            </Container>
            <Options>
                <CancelButton onClick={handleCancelClick}>Cancel Visit</CancelButton>
                <AcceptButton onClick={handleInviteVisiteClick}>Invite for Visit</AcceptButton>
            </Options>
        </Wrapper>
    )
}

export default VisitorsCard