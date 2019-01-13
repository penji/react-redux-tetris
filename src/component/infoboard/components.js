import React from 'react';
import styled from 'styled-components';
import Counter from './Counter';
import {connect} from 'react-redux';
import theme from '../../theme/index';

export const Label = styled.label`
  display: block;
  font-family: "Helvetica Neue";
`;

export const Value = styled(Label)`
  text-align: right;
  font-size: ${({theme}) => theme.fontSize}px;
  color: ${({theme}) => theme.color}
  font-weight: 700;
  bottom: 0px;
  right: 0px;
  line-height: 1;
`;

Value.defaultProps = {
  theme: theme.BASE.infoboard.components.Value
};

export const Title = styled(Label)`
  text-align: left;
  font-weight: 900;
  font-size: ${({theme}) => theme.fontSize}px;
  color: ${({theme}) => theme.color}
`;

Title.defaultProps = {
  theme: theme.BASE.infoboard.components.Title
};

export const Div = styled.div`
  background: transparent;
  height: 32px;
  margin-bottom: 0px;
`;

export const Info = props => (
    <Div>
      <Title>{props.title}</Title>
      <Value>{props.value}</Value>
    </Div>
);

export const HighScore = connect(
    ({game}) => ({value: game.score.high})
)(
    ({value}) => (
        <Div>
          <Title>HIGH SCORE</Title>
          <Counter value={value}/>
        </Div>
    )
);

export const LastScore = connect(
    ({game}) => ({value: game.score.last})
)(
    ({value}) => (
        <Div>
          <Title>LAST SCORE</Title>
          <Counter value={value}/>
        </Div>
    )
);

export const NowScore = connect(
    ({game}) => ({value: game.score.now})
)(
    ({value}) => (
        <Div>
          <Title>NOW SCORE</Title>
          <Counter value={value}/>
        </Div>
    )
);

export const Speed = connect(
    ({game}) => ({value: game.speed})
)(
    ({value}) => (
        <Div>
          <Title>SPEED</Title>
          <Value>{value}</Value>
        </Div>
    )
);