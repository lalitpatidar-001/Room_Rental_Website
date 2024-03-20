import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { Container, Wrapper } from './style';

export default function Loader({ text }) {
  return (
    <Container>
      <Wrapper>
        <CircularProgress />
        <span>{text?text:"loading..."}</span>
      </Wrapper>
    </Container>
  );
}