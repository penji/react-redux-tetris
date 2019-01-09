import React from 'react';
import styled from 'styled-components';
import theme from '../../theme/index';

export const Cell = styled.div`
  box-sizing: border-box;
  display: inline-block;
  width: 15px;
  height: 15px;
  background-color: ${props => props.theme.mapTypeToColor[props.type]}};
`;

Cell.defaultProps = {
  theme: theme.BASE.block.Cell,
};

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

