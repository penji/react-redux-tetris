import React from 'react';
import styled from 'styled-components';
import {Tetromino, BLOCK} from '../../model/Tetromino';
import {Cell} from './Cell';


const Wrapper = styled.div`
  line-height: 1px;
  text-align: center;
`;
const Row = styled.div`
  line-height: 1px;
`;


export const Block = ({type = BLOCK.X, rotate = 0, style}) => {
  let shape;
  if (type === BLOCK.X) {
    shape = [[BLOCK.X]];
  } else {
    shape = Tetromino[type].rotate[rotate].shape;
  }

  return (
      <Wrapper style={style}>
        {
          shape.map((row, y) => (
              <Row key={y}>
                {
                  row.map((cellType, x) => (
                      <Cell key={x} type={shape[y][x]}/>
                  ))
                }
              </Row>
          ) )
        }
      </Wrapper>
  );
};