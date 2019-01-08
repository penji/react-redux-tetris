import React from 'react';
import styled, {keyframes} from 'styled-components';
import {connect} from 'react-redux';

const blink = keyframes`
  0%   { opacity: 0; }
  25%  { opacity: 1; }
  75%  { opacity: 1; }
  100% { opacity: 0; }
`;

const Label = styled.label`
  position: absolute;
  display: block;
  text-align: CENTER;
  font-size: 1.9em;
  font-family: ARCADECLASSIC;
  font-weight: 700;
`;

const StyledDiv = styled.div`
  position: absolute;
  box-sizing: border-box;
  top: 10px;
  left: 10px;
  background-color: palegoldenrod;
  width: 150px;
  height: 300px;
`;

const StartMsgLb = styled(Label)`
  top: 80px;
  left: 20px;
  width: 130px;
  animation: ${blink} 2.5s linear infinite;
`;

const PauseMsgLb = styled(Label)`
  top: 120px;
  left: 0px;
  width: 150px;
`;

export const StartMessage = connect(
    ({game}) => game
)(
    game => {
      if (game.state === 'READY') {
        return (
            <StartMsgLb>
              PRESS<br/>SPACE<br/>OR<br/>RED<br/>BUTTON
            </StartMsgLb>
        );
      }

      return (null);
    }
);

export const PauseMessage = connect(
    ({game}) => game
)(
    game => {
      if (game.state === 'PAUSED') {
        return (
            <StyledDiv>
              <PauseMsgLb>
                PAUSED
              </PauseMsgLb>
            </StyledDiv>
        );
      }

      return (null);
    }
);