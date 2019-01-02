import React from 'react';

import styled from 'styled-components';

const Base = styled.button`
  position: absolute;
  box-sizing: border-box;
  display: inline-block;
  font-size: 24px;
  cursor: pointer;
  text-align: center;
  text-decoration: none;
  outline: none;
  color: #fff;
  border: none;
  border-radius: 6px;
  box-shadow: 0 5px #999;
  
  &.active, :active {
    box-shadow: 0 3px #666;
    transform: translateY(2px);
  }
`;

const Move = styled(Base)`
  color: #fff;
  background-color: #5bc0de;
  border-color: #46b8da;
  width: 30px;
  height: 30px;
  padding-top: 2px;
  
  &.active, :active {
    background-color: #269abc;
    border-color: #1b6d85;
  }
`;

const SpaceBtn = styled(Base)`
  padding: 45px 45px;
  border-radius: 100%;
  background-color: #d9534f;
  top: 31px;
  left: 28px;
  
  &.active, :active {
    background-color: #ac2925;
    border-color: #1b6d85;
  }
`;

const UpBtn = styled(Move)`
  top: 27px;
  left: 230px;
`;

const DownBtn = styled(Move)`
  top: 95px;
  left: 230px;
`;

const LeftBtn = styled(Move)`
  top: 61px;
  left: 198px;
`;

const RightBtn = styled(Move)`
  top: 61px;
  left: 261px;
`;

export const Up = ({ type,
                     pressed,
                     onMouseTouchEvent }) => (
    <UpBtn
        className={pressed ? 'active' : ''}
        onMouseDown={() => onMouseTouchEvent(type, true)}
        onMouseUp={() => onMouseTouchEvent(type, false)}
        onTouchStart={() => onMouseTouchEvent(type, true)}
        onTouchEnd={() => onMouseTouchEvent(type, false)}
    />
);

export const Down = ({ type,
                     pressed,
                     onMouseTouchEvent }) => (
    <DownBtn
        className={pressed ? 'active' : ''}
        onMouseDown={() => onMouseTouchEvent(type, true)}
        onMouseUp={() => onMouseTouchEvent(type, false)}
        onTouchStart={() => onMouseTouchEvent(type, true)}
        onTouchEnd={() => onMouseTouchEvent(type, false)}
    />
);

export const Left = ({ type,
                     pressed,
                     onMouseTouchEvent }) => (
    <LeftBtn
        className={pressed ? 'active' : ''}
        onMouseDown={() => onMouseTouchEvent(type, true)}
        onMouseUp={() => onMouseTouchEvent(type, false)}
        onTouchStart={() => onMouseTouchEvent(type, true)}
        onTouchEnd={() => onMouseTouchEvent(type, false)}
    />
);

export const Right = ({ type,
                     pressed,
                     onMouseTouchEvent }) => (
    <RightBtn
        className={pressed ? 'active' : ''}
        onMouseDown={() => onMouseTouchEvent(type, true)}
        onMouseUp={() => onMouseTouchEvent(type, false)}
        onTouchStart={() => onMouseTouchEvent(type, true)}
        onTouchEnd={() => onMouseTouchEvent(type, false)}
    />
);

export const Space = ({ type,
                     pressed,
                     onMouseTouchEvent }) => (
    <SpaceBtn
        className={pressed ? 'active' : ''}
        onMouseDown={() => onMouseTouchEvent(type, true)}
        onMouseUp={() => onMouseTouchEvent(type, false)}
        onTouchStart={() => onMouseTouchEvent(type, true)}
        onTouchEnd={() => onMouseTouchEvent(type, false)}
    />
);