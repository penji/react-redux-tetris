import React from 'react';
import styled from 'styled-components';
import {connect} from 'react-redux';

import {Cell} from '../block/Cell';

const StyledDiv = styled.div`
  position: absolute;
  box-sizing: border-box;
  top: 10px;
  left: 10px;
  background-color: palegoldenrod;
  width: 150px;
  height: 300px;
`;
const Row = styled.div`
  width: 150px;
  height: 15px;
  line-height: 0px;
`;

export const BlockBoard = connect(
    ({block}) => ({board: block.board})
)(
    ({board: t}) => (
        <StyledDiv>
          {
            t.map((row, y) => (
                <Row key={y}>
                  {row.map((type, x) => <Cell key={x} type={type}/>)}
                </Row>
            ))
          }
        </StyledDiv>
    )
);

export default BlockBoard;