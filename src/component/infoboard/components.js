import React from 'react';
import styled from 'styled-components';
import Counter from './Counter';
import {connect} from 'react-redux';

export const Label = styled.label`
  display: block;
  font-weight: 700;
  font-family: ARCADECLASSIC;
`;

export const Value = styled(Label)`
  text-align: right;
  font-size: 17px;
  bottom: 0px;
  right: 0px;
  line-height: 1;
`;

export const Title = styled(Label)`
  text-align: left;
  font-weight: bold;
  font-size: 14px;
`;

export const Div = styled.div`
  background: yellow;
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
    ({info}) => ({value: info.highScore})
)(
    ({value}) => (
        <Div>
          <Title>HIGH SCORE</Title>
          <Counter value={value}/>
        </Div>
    )
);

export const LastScore = connect(
    ({info}) => ({value: info.lastScore})
)(
    ({value}) => (
        <Div>
          <Title>LAST SCORE</Title>
          <Counter value={value}/>
        </Div>
    )
);

export const NowScore = connect(
    ({info}) => ({value: info.nowScore})
)(
    ({value}) => (
        <Div>
          <Title>NOW SCORE</Title>
          <Counter value={value}/>
        </Div>
    )
);

export const Speed = connect(
    ({info}) => ({value: info.speed})
)(
    ({value}) => (
        <Div>
          <Title>SPEED</Title>
          <Value>{value}</Value>
        </Div>
    )
);