import React from 'react'
import { Address, DetailsWrapper, InviteText, RoomInfoButton, Wrapper } from './style'
import { Link } from 'react-router-dom'

const InvitationCard = ({ invitation }) => {

    return (
        <Wrapper>
            <DetailsWrapper>
                <InviteText>You are invited to visit {invitation?.room?.roomType} {invitation?.room?.residentType} by {invitation.user.username}</InviteText>
                <Address>Address : {invitation?.room?.address?.area}, {invitation?.room?.address?.city}, {invitation?.room?.address?.district}, {invitation?.room?.address?.state} - {invitation?.room?.address?.pincode}</Address>
            </DetailsWrapper>
            <Link to={`/room/${invitation?.room?._id}`}>
                <RoomInfoButton>View Room Details</RoomInfoButton>
            </Link>
        </Wrapper>
    )
}

export default InvitationCard