import React from 'react';
import styled from 'styled-components';
import {connect} from 'react-redux';

import {HighScore, LastScore, NowScore, Speed} from './components';
import NextBlocks from './NextBlocks';

import theme from '../../theme/index';

const StyledDiv = styled.div`
  position: absolute;
  box-sizing: border-box;
  top: 10px;
  right: 10px;
  background: ${({theme}) => theme.background};
  padding: 10px 10px 10px 10px;
  width: 140px;
  height: 300px;
`;

StyledDiv.defaultProps = {
  theme: theme.BASE.infoboard.InfoBoard
};


const InfoBoard = connect(
    ({game}) => game
)(
    game => {
      return (
          <StyledDiv>
            <HighScore/>
            {!game.playing && <LastScore/>}
            {game.playing && <NowScore/>}
            <Speed/>
            <NextBlocks/>
          </StyledDiv>
      );
    }
);

export default InfoBoard;