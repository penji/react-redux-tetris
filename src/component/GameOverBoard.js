import React from 'react';
import styled, {keyframes} from 'styled-components';
import {connect} from 'react-redux';
import theme from '../theme/index';
import {GAME_OVER} from '../action/game';

import CountUp from 'react-countup';

const StyledDiv = styled.div`
  position: absolute;
  box-sizing: border-box;
  top: 10px;
  left: 10px;
  background-color: transparent;
  width: 150px;
  height: 300px;
`;

StyledDiv.defaultProps = {
  theme: theme.BASE.GameOverBoard
};

const GameOverTitle = styled.label`
  position: relative;
  display: block;
  text-align: center;
  font-size: 1.9em;
  font-family: Lato;
  font-weight: 900;
  margin-top: 20px;
  width: 100%;
  color: ${({theme}) => theme.color};
`;

GameOverTitle.defaultProps = {
  theme: theme.BASE.GameOverBoard.Title,
};

const Score = styled(CountUp)`
  display: block;
  font-weight: 700;
  font-family: "Helvetica Neue";
  text-align: center;
  font-size: 20px;
  color: ${({theme}) => theme.color}
  width: 100%;
  margin-top: 20px;
`;

Score.defaultProps = {
  theme: theme.BASE.GameOverBoard.Score,
};

const blink = keyframes`
  0%   { opacity: 0; }
  25%  { opacity: 1; }
  75%  { opacity: 0; }
  100% { opacity: 1; }
`;

const HighScore = styled.label`
  display: block;
  margin-top: 20px;
  color: #E74C3C;
  text-align: center;
  font-size: 20px;
  font-family: Lato;
  font-weight: 900;
  text-align: center;
  width: 100%;
  animation: ${blink} 2s step-start 0s infinite;
`;

const GameOverBoard = connect(
    ({game}) => ({game})
)(
    ({
       game: {state, highScoreUpdated, score: {now}},
     }) => (
        state === GAME_OVER && (
            <StyledDiv>
              <GameOverTitle>
                GAME<br/>OVER
              </GameOverTitle>
              {highScoreUpdated && (
                  <HighScore>
                    NEW<br/>
                    HIGH SCORE!!
                  </HighScore>
              )}
              <Score
                  start={0}
                  end={now}
                  useEasing={true}
                  separator=","
                  duration={2}
              />

            </StyledDiv>
        )
    )
);

export default GameOverBoard;