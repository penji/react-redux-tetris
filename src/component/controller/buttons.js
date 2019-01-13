import React from 'react';

import styled from 'styled-components';
import theme from '../../theme/index';

import SwitchPNG from '../../resource/switch.png';
import PausePNG from '../../resource/pause.png';
import PlayPNG from '../../resource/play.png';

const Base = styled.button`
  -webkit-tap-highlight-color: rgba(255,255,255,0);
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
  
  &.active {
    box-shadow: 0 3px #666;
    transform: translateY(2px);
  }
`;

const Move = styled(Base)`
  color: #fff;
  background-color: ${({theme}) => theme.normal};
  box-shadow: 0 5px ${({theme}) => theme.shadowNormal};
  width: 45px;
  height: 45px;
  padding-top: 3px;
  
  &.active {
    background-color: ${({theme}) => theme.active};
    box-shadow: 0 3px ${({theme}) => theme.shadowActive};
  }
`;

Move.defaultProps = {
  theme: theme.BASE.controller.buttons.Move
};

const SpaceBtn = styled(Base)`
  padding: 60px 60px;
  border-radius: 100%;
  background-color: ${({theme}) => theme.normal};
  box-shadow: 0 5px ${({theme}) => theme.shadowNormal};
  top: 19px;
  left: 15px;
  left: ${({inversed}) => inversed ? 185 : 15}px;
  
  &.active {
    background-color: ${({theme}) => theme.active};
    box-shadow: 0 3px ${({theme}) => theme.shadowActive};
  }
`;

SpaceBtn.defaultProps = {
  theme: theme.BASE.controller.buttons.SpaceBtn
};

const UpBtn = styled(Move)`
  top: 8px;
  left: ${({inversed}) => 215 - (inversed ? 154 : 0)}px;
`;

const DownBtn = styled(Move)`
  top: 105px;
  left: ${({inversed}) => 215 - (inversed ? 154 : 0)}px;
`;

const LeftBtn = styled(Move)`
  top: 58px;
  left: ${({inversed}) => 169 - (inversed ? 154 : 0)}px;
`;

const RightBtn = styled(Move)`
  top: 58px;
  left: ${({inversed}) => 260 - (inversed ? 154 : 0)}px;
`;

const SwitchBtn = styled(Move)`
  border-radius: 90%;
  background: url(${SwitchPNG}) no-repeat;
  padding: 5px;
  background-size: cover;
  top: 8px;
  left: 151.5px;
  width: 25px;
  height: 25px;
  background-origin: content-box;
  background-color: #F1C40F;
  box-shadow: 0 3px #F39C12;
  
  &.active {
    background-color: #F39C12;
    box-shadow: 0 3px #E67E22;
  }
`;

const PauseResumeToggleBtn = styled(Move)`
  border-radius: 90%;
  background: url(${({paused}) => paused ? PlayPNG : PausePNG}) no-repeat;
  padding: 5px;
  background-size: cover;
  top: 8px;
  left: 151.5px;
  width: 25px;
  height: 25px;
  background-origin: content-box;
  background-color: #F1C40F;
  box-shadow: 0 3px #F39C12;
  
  &.active {
    background-color: #F39C12;
    box-shadow: 0 3px #E67E22;
  }
`;

let touch = false;
export const Up = ({ type,
                     pressed,
                     onMouseTouchEvent,
                     inversed
                   }) => {
  console.error(`up className = ${pressed ? 'active' : ''}`);
  return (
      <UpBtn
          inversed={inversed}
          className={pressed ? 'active' : ''}
          onMouseDown={() => !touch && onMouseTouchEvent(type, true)}
          onMouseUp={() => !touch && onMouseTouchEvent(type, false)}
          onTouchStart={() => {touch = true; onMouseTouchEvent(type, true);}}
          onTouchEnd={() => {touch = true; onMouseTouchEvent(type, false);}}
      />
  );
}

export const Down = ({ type,
                       pressed,
                       onMouseTouchEvent,
                       inversed
                     }) => (
    <DownBtn
        inversed={inversed}
        className={pressed ? 'active' : ''}
        onMouseDown={() => !touch && onMouseTouchEvent(type, true)}
        onMouseUp={() => !touch && onMouseTouchEvent(type, false)}
        onTouchStart={() => {touch = true; onMouseTouchEvent(type, true);}}
        onTouchEnd={() => {touch = true; onMouseTouchEvent(type, false);}}
    />
);

export const Left = ({ type,
                       pressed,
                       onMouseTouchEvent,
                       inversed
                     }) => (
    <LeftBtn
        inversed={inversed}
        className={pressed ? 'active' : ''}
        onMouseDown={() => !touch && onMouseTouchEvent(type, true)}
        onMouseUp={() => !touch && onMouseTouchEvent(type, false)}
        onTouchStart={() => {touch = true; onMouseTouchEvent(type, true);}}
        onTouchEnd={() => {touch = true; onMouseTouchEvent(type, false);}}
    />
);

export const Right = ({ type,
                        pressed,
                        onMouseTouchEvent,
                        inversed
                      }) => (
    <RightBtn
        inversed={inversed}
        className={pressed ? 'active' : ''}
        onMouseDown={() => !touch && onMouseTouchEvent(type, true)}
        onMouseUp={() => !touch && onMouseTouchEvent(type, false)}
        onTouchStart={() => {touch = true; onMouseTouchEvent(type, true);}}
        onTouchEnd={() => {touch = true; onMouseTouchEvent(type, false);}}
    />
);

export const Space = ({ type,
                        pressed,
                        onMouseTouchEvent,
                        inversed
                      }) => (
    <SpaceBtn
        inversed={inversed}
        className={pressed ? 'active' : ''}
        onMouseDown={() => !touch && onMouseTouchEvent(type, true)}
        onMouseUp={() => !touch && onMouseTouchEvent(type, false)}
        onTouchStart={() => {touch = true; onMouseTouchEvent(type, true);}}
        onTouchEnd={() => {touch = true; onMouseTouchEvent(type, false);}}
    />
);

export const Switch = ({ type,
                        pressed,
                        onMouseTouchEvent,
                       }) => (
    <SwitchBtn
        className={pressed ? 'active' : ''}
        onMouseDown={() => !touch && onMouseTouchEvent(type, true)}
        onMouseUp={() => !touch && onMouseTouchEvent(type, false)}
        onTouchStart={() => {touch = true; onMouseTouchEvent(type, true);}}
        onTouchEnd={() => {touch = true; onMouseTouchEvent(type, false);}}
    />
);

export const PauseResumeToggle = ({ type,
                                    pressed,
                                    onMouseTouchEvent,
                                    paused,
                                  }) => (
    <PauseResumeToggleBtn
        paused={paused}
        className={pressed ? 'active' : ''}
        onMouseDown={() => !touch && onMouseTouchEvent(type, true)}
        onMouseUp={() => !touch && onMouseTouchEvent(type, false)}
        onTouchStart={() => {touch = true; onMouseTouchEvent(type, true);}}
        onTouchEnd={() => {touch = true; onMouseTouchEvent(type, false);}}
    />
);