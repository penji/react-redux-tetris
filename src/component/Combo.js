import React, {Component} from 'react';
import styled, {keyframes} from 'styled-components';
import {connect} from 'react-redux';
import theme from '../theme/index';
import {GAME_IS_ON, RESUMED} from '../action/game';

const move = keyframes`
  0%   { top: 160px; }
  80% { 
    top: 130px;
    opacity: 1;
  }
  100% {
    top: 130px;
    opacity: 0;
  }
`;

const StyledDiv = styled.label`
  display: none;
  position: absolute;
  box-sizing: border-box;
  top: 160px;
  left: 10px;
  background-color: transparent;
  width: 150px;
  text-align: center;
  color: ${({theme}) => theme.color};
  font-size: ${({theme}) => theme.fontSize}px;
  font-family: Lato;
  font-weight: 700;
  
  &.show {
    display: block;
    animation: ${move} 0.5s ease-out 1 forwards;
  }
`;

StyledDiv.defaultProps = {
  theme: theme.BASE.Combo
};

class Combo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false
    };
    this.timer = null;
  }
  render() {
    return (
        <StyledDiv className={this.state.show? 'show' : ''}>
          {this.props.combo}<br/>
          COMBO
        </StyledDiv>
    );
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const {state, combo} = this.props;
    if (state === GAME_IS_ON || state === RESUMED) {
      if (combo > 0 && prevProps.combo !== combo) {
        if (this.timer !== null) {
          clearTimeout(this.timer);
        }
        this.setState({
          show: true
        });
        this.timer = setTimeout(() => this.setState({
          show: false
        }), 600);
      }
    }
  }
}

Combo = connect(
    ({game}) => ({state: game.state, combo: game.line.last})
)(Combo);

export default Combo;