import React from 'react';
import styled, {keyframes} from 'styled-components';
import {connect} from 'react-redux';

import theme from '../theme/index';

const blink = keyframes`
  0%   { opacity: 0; }
  25%  { opacity: 1; }
  75%  { opacity: 1; }
  100% { opacity: 0; }
`;

const Label = styled.label`
  position: absolute;
  display: block;
  text-align: center;
  font-size: 1.9em;
  font-family: Lato;
  font-weight: 900;
`;

const StyledDiv = styled.div`
  position: absolute;
  box-sizing: border-box;
  top: 10px;
  left: 10px;
  background-color: ${({theme}) => theme.background};
  width: 150px;
  height: 300px;
`;

StyledDiv.defaultProps = {
  theme: theme.BASE.Message.PauseMessage
};

const StartMsgLb = styled(Label)`
  top: 55px;
  left: 20px;
  width: 130px;
  color: ${({theme}) => theme.color};
  animation: ${blink} 2.5s linear infinite;
`;

StartMsgLb.defaultProps = {
  theme: theme.BASE.Message.StartMessage
};

const PauseMsgLb = styled(Label)`
  top: 120px;
  left: 0px;
  width: 150px;
  color: ${({theme}) => theme.color};
`;

PauseMsgLb.defaultProps = {
  theme: theme.BASE.Message.PauseMessage
};

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