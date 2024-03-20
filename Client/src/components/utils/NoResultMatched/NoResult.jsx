import React from 'react'
import { Container, Message } from './noResultStyles'

function NoResult({text}) {
  return (
    
    <Container>
        <Message>{text?text:"No Result"}</Message>
    </Container>
  )
}

export default NoResult