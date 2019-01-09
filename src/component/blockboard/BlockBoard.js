import React from 'react';
import styled from 'styled-components';
import {connect} from 'react-redux';

import {Cell} from '../block/Cell';
import {Block} from '../block/Block';

import theme from '../../theme/index'
import {BLOCK} from '../../model/Tetromino';

const StyledDiv = styled.div`
  position: absolute;
  box-sizing: border-box;
  top: 10px;
  left: 10px;
  background-color: ${({theme}) => theme.background};
  width: 150px;
  height: 300px;
  ${({hidden}) => `
  display: ${hidden ? 'none' : 'block'}
  `}
`;

StyledDiv.defaultProps = {
  theme: theme.BASE.blackboard.BlackBoard
};

const Row = styled.div`
  width: 150px;
  height: 15px;
  line-height: 0px;
`;

export const BlockBoard = connect(
    ({block, game}) => ({
      board: block.board,
      now: block.now,
      paused: game.paused,
      playing: game.playing,
    })
)(
    ({board: t, now: block, paused, playing}) => {
      return (
          <StyledDiv hidden={paused}>
            {
              t.map((row, y) => (
                  <Row key={y}>
                    {row.map((type, x) => <Cell key={x} type={!playing && type !== BLOCK.X ? BLOCK.D : type}/>)}
                  </Row>
              ))
            }
            {
              block.type && <Block {...block} />
            }
          </StyledDiv>
      )
    }
);

export default BlockBoard;