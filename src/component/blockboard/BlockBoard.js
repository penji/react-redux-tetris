import React from 'react';
import styled from 'styled-components';
import {connect} from 'react-redux';

import {Cell} from '../block/Cell';
import {Block} from '../block/Block';

const StyledDiv = styled.div`
  position: absolute;
  box-sizing: border-box;
  top: 10px;
  left: 10px;
  background-color: palegoldenrod;
  width: 150px;
  height: 300px;
  ${({hidden}) => `
  display: ${hidden ? 'none' : 'block'}
  `}
`;
const Row = styled.div`
  width: 150px;
  height: 15px;
  line-height: 0px;
`;

export const BlockBoard = connect(
    ({block, game}) => ({board: block.board, now: block.now, paused: game.paused})
)(
    ({board: t, now: block, paused}) => (
        <StyledDiv hidden={paused}>
          {
            t.map((row, y) => (
                <Row key={y}>
                  {row.map((type, x) => <Cell key={x} type={type}/>)}
                </Row>
            ))
          }
          {
            block.type && <Block {...block} />
          }
        </StyledDiv>
    )
);

export default BlockBoard;