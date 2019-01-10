import React from 'react';
import { connect } from 'react-redux';
import {Up, Left, Right, Down, Space, Switch} from './buttons';

import theme from '../../theme';

import styled from 'styled-components';

const StyledDiv = styled.div`
  position: absolute;
  box-sizing: border-box;
  background-color: ${props => props.theme.background};
  width: 320px;
  height: 160px;
  padding: 5px;
  bottom: 0px;
`;

StyledDiv.defaultProps = {
  theme: theme.BASE.controller.Controller
};

let Controller = ({button, pressed, changeButtonState, playing, inversed}) => (
    <StyledDiv>
      <Up
          inversed={inversed}
          type={'UP'}
          pressed={button === 'UP' && pressed}
          onMouseTouchEvent={changeButtonState}
      />
      <Down
          inversed={inversed}
          type={'DOWN'}
          pressed={button === 'DOWN' && pressed}
          onMouseTouchEvent={changeButtonState}
      />
      <Left
          inversed={inversed}
          type={'LEFT'}
          pressed={button === 'LEFT' && pressed}
          onMouseTouchEvent={changeButtonState}
      />
      <Right
          inversed={inversed}
          type={'RIGHT'}
          pressed={button === 'RIGHT' && pressed}
          onMouseTouchEvent={changeButtonState}
      />
      <Space
          inversed={inversed}
          type={'SPACE'}
          pressed={button === 'SPACE' && pressed}
          onMouseTouchEvent={changeButtonState}
      />
      {
        !playing &&
        <Switch
          type={'SWITCH'}
          pressed={button === 'SWITCH' && pressed}
          onMouseTouchEvent={changeButtonState}
        />
      }
    </StyledDiv>
);

const mapStateToProps = state => ({...state.controller, ...state.game});

const mapDispatchToProps = dispatch => ({
  changeButtonState: (type, pressed) => {
    const action = {type: `${type}_${pressed ? 'TRUE' : 'FALSE'}`};
    return dispatch(action);
  }
});

Controller = connect(mapStateToProps, mapDispatchToProps)(Controller);

export default Controller;