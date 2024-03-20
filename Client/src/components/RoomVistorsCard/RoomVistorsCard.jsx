import React from 'react'
import { Container } from './style'
import VisitorCard from '../VisitCard/VisitCard'
import NoResult from '../utils/NoResultMatched/NoResult'


function RoomVistorsCard({ roomVisits }) {


  // if(mobiles.length <= 0 ){
  //   return (
  //     <h1>no items yet in cart</h1>
  //   )
  // }
  return (
    <Container>

      {
        roomVisits?.length <= 0 ?
        <NoResult  text="No Visits Yet!"/>
      : <>
            {roomVisits.map((visit) => {
              return <VisitorCard
                visit={visit} />
            })}
          </>
      }

    </Container>
  )
}

export default RoomVistorsCard