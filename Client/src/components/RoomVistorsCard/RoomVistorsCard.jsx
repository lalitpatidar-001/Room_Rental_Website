import React from 'react'
import { Container } from './style'
import VisitorCard from '../VisitCard/VisitCard'


function RoomVistorsCard({roomVisits,}) {


  // if(mobiles.length <= 0 ){
  //   return (
  //     <h1>no items yet in cart</h1>
  //   )
  // }
  return (
    <Container>
    {roomVisits.map((visit)=>{
      return <VisitorCard
      visit={visit}/>
    })}
    </Container>
  )
}

export default RoomVistorsCard