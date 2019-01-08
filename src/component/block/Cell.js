import React from 'react';
import styled from 'styled-components';

const mapTypeToColor = {
  X: 'transparent',
  D: 'grey',
  I: 'red',
  O: 'orange',
  T: 'yellow',
  J: 'green',
  L: 'blue',
  S: 'navy',
  Z: 'purple',
};

export const Cell = styled.div`
  display: inline-block;
  width: 15px;
  height: 15px;
  background-color: ${props => mapTypeToColor[props.type]};
`;

/*
export const BorderCell = styled.div`
  display: inline-block;
  width: 15px;
  height: 15px;
  border: 0.5px solid black;
  box-sizing: border-box;
  background-color: ${props => mapTypeToColor[props.type]};
`;
*/

