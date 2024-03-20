import React from 'react'
import { Container, Image } from './style';
import MenuIcon from '@mui/icons-material/Menu';

const ProfileToggle = ({profileOpen , setProfileOpen}) => {
  return (
    <Container onMouseEnter={()=>setProfileOpen(true)} onMouseLeave={()=>setProfileOpen(false)}>
      <MenuIcon/>
    </Container>
  )
}

export default ProfileToggle