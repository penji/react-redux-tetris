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
  top: 80px;
  left: 20px;
  width: 130px;
  display: block;
  text-align: CENTER;
  font-size: 1.9em;
  font-family: ARCADECLASSIC;
  font-weight: 700;
  animation: ${blink} 2.5s linear infinite;
`;

export const StartMessage = connect(
    ({game}) => game
)(
    game => {
      if (game.state === 'READY') {
        return (
            <Label>
              PRESS<br/>SPACE<br/>OR<br/>RED<br/>BUTTON
            </Label>
        );
      }

      return (null);
    }
);

export default StartMessage;