import React from 'react';
import styled from 'styled-components';

import {HighScore, LastScore, NowScore, Speed} from './components';
import NextBlock from './NextBlock';

const StyledDiv = styled.div`
  position: absolute;
  box-sizing: border-box;
  top: 10px;
  right: 10px;
  background: palegreen;
  padding: 10px 10px 10px 10px;
  width: 140px;
  height: 300px;
`;

const InfoBoard = ({gameOn = false}) => (
    <StyledDiv>
      <HighScore/>
      {gameOn ? <NowScore/> : <LastScore/>}
      <Speed/>
      <NextBlock/>
    </StyledDiv>
);

export default InfoBoard;