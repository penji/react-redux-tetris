import React from 'react';
import styled from 'styled-components';
import {Tetromino} from '../../model/Tetromino';
import {Cell} from './Cell';


const Wrapper = styled.div`
  position: absolute;
  line-height: 1px;
  text-align: center;
  ${({x, y, w, h}) => `
  top: ${y > 0? y * 15 : 0}px;
  left: ${x * 15}px;
  width: ${w * 15}px;
  height: ${h * 15}px;
  `}
`;

const Row = styled.div`
  line-height: 1px;
`;

export const Block = ({type, rotate, x, y, style}) => {
  const {shape, w, h} = Tetromino[type].rotate[rotate];

  let targetShape = shape;

  if (y <= -h) { return (null);}
  if (y < 0) {
    targetShape = shape.slice(-y);
  }

  const blockProps = {type, x, y, w, h: targetShape.length};

  return (
      <Wrapper {...blockProps} style={style}>
        {
          targetShape.map((row, y) => (
              <Row key={y}>
                {
                  row.map((cellType, x) => (
                      <Cell key={x} type={targetShape[y][x]}/>
                  ))
                }
              </Row>
          ) )
        }
      </Wrapper>
  );
};