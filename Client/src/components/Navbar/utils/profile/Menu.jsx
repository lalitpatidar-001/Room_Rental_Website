import React, { useContext } from 'react'
import { Container, Option, Text, Wrapper } from './style'
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import NotificationsActiveOutlinedIcon from '@mui/icons-material/NotificationsActiveOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import PowerSettingsNewOutlinedIcon from '@mui/icons-material/PowerSettingsNewOutlined';
import { Link } from 'react-router-dom';
import { userContext } from '../../../../context/userContext';
import HomeWorkOutlinedIcon from '@mui/icons-material/HomeWorkOutlined';
import LocalPostOfficeOutlinedIcon from '@mui/icons-material/LocalPostOfficeOutlined';

const Menu = ({ profileOpen, setProfileOpen ,handleLogoutClick}) => {
  const {isLoggedIn} = useContext(userContext)
  return (
    <Container onMouseEnter={() => (setProfileOpen(true))} onMouseLeave={() => (setProfileOpen(false))}>
      {/* <Option><Wrapper><AccountCircleOutlinedIcon style={{ fontSize: 18 }} /><Text>Profile</Text></Wrapper></Option> */}

      <Link to={`/invitations/${isLoggedIn?._id}`} style={{textDecoration:"none" , color:"inherit"}}>
      <Option><Wrapper><LocalPostOfficeOutlinedIcon style={{ fontSize: 18 }} /><Text>Invitations</Text></Wrapper></Option>
      </Link>
      <Link to={`/wishlist/${isLoggedIn?._id}`} style={{textDecoration:"none" , color:"inherit"}}>
      <Option><Wrapper><Inventory2OutlinedIcon style={{ fontSize: 18 }} /><Text>Wishlist</Text></Wrapper></Option>
      </Link>
      
      <Link to={`/my-rooms/${isLoggedIn?._id}`} style={{textDecoration:"none" , color:"inherit"}}>
      <Option><Wrapper><HomeWorkOutlinedIcon style={{ fontSize: 18 }} /><Text>Your Rooms</Text></Wrapper></Option>
      </Link>
      {/* <Option><Wrapper><SettingsOutlinedIcon style={{ fontSize: 18 }} /><Text>Settings</Text></Wrapper></Option> */}
      <Option onClick={handleLogoutClick}><Wrapper><PowerSettingsNewOutlinedIcon style={{ fontSize: 18 }} /><Text>Logout</Text></Wrapper></Option>
    </Container>
  )
}

export default Menu