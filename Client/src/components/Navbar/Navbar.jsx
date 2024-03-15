import React, { useContext, useEffect, useState } from 'react'
import { Button, CartBox, CartIndicator, Container, InputBox, LeftContainer, LinkTag, Links, Logo, RightContainer, SearchInput, SpanA, SpanB, Wrapper } from './navStyles'
import { Link, useNavigate } from 'react-router-dom'
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { userContext } from '../../context/userContext';
import ProfileToggle from './utils/profileToggle/ProfileToggle';
import Menu from './utils/profile/Menu';

function Navbar() {
    const { isLoggedIn, setIsLoggedIn } = useContext(userContext);
    const [profileOpen , setProfileOpen] = useState(false)
    console.log("isLoggedIn " , isLoggedIn)
    const navigate = useNavigate();

    const handleLogoutClick = () => {
        localStorage.removeItem('local-user');
        setIsLoggedIn((prevLoggedIn) => {
            prevLoggedIn = false;
        });
        navigate("/")
    }

    
   

    return (
        <Container>
            <Wrapper>
                <LeftContainer>
                   <Link to="/">
                   <Logo><SpanA className='text-[#FF5757 text-bold '>Find</SpanA><SpanB className='text-blue-500'>Room</SpanB></Logo>
                   </Link> 
                   <Link to="/new-room">
                    <LinkTag>Add Room</LinkTag>
                   </Link> 
                   <Link to={`/visits/${isLoggedIn?._id}`}>
                    <LinkTag>Visits</LinkTag>
                   </Link> 
                   <Link to={`/visitors/${isLoggedIn?._id}`}>
                    <LinkTag>Visitors</LinkTag>
                   </Link> 


                </LeftContainer>
                <RightContainer>
                    <ProfileToggle profileOpen={profileOpen} setProfileOpen={setProfileOpen}/>
                </RightContainer>
            </Wrapper>
           {profileOpen && <Menu handleLogoutClick={handleLogoutClick} profileOpen={profileOpen} setProfileOpen={setProfileOpen} />}
        </Container>
    )
}

export default Navbar