import React, { Component } from 'react';
import styled from 'styled-components';

import Controller from './controller/Controller';

const Scalable = styled.div`
  position: absolute;
  background: black;
  top:50%;
  left:50%;
  ${({frameWidth, frameHeight, frameScale}) => `
    width: ${frameWidth}px;
    height: ${frameHeight}px;
    margin: ${- frameHeight / 2}px 0 0 ${- frameWidth / 2}px;
    transform: scale(${frameScale});
  `}
`;

const BASE_SIZE = {
  width: 320,
  height: 480,
  ratio: 480/320,
};

let resizeTimer;
const resizeDelay = 100;

export default class MainFrame extends Component {
  constructor(props) {
    super(props);
    this.onResize = this.onResize.bind(this);
    this.onResizeDebounced = this.onResizeDebounced.bind(this);
    this.state = {
      scale: this.onResizeDebounced(false)
    };
  }

  componentDidMount() {
    window.addEventListener("resize", this.onResize);
  };

  componentWillUnmount() {
    window.removeEventListener("resize", this.onResize);
  };

  onResize() {
    //Debouncing window.onresize
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(this.onResizeDebounced, resizeDelay);
  }

  onResizeDebounced(changeState = true) {
    const {width, height, ratio} = BASE_SIZE;
    const {innerWidth, innerHeight} = window;

    const windowRatio = innerHeight / innerWidth;
    let newScale;
    if (windowRatio <= ratio) {
      newScale = innerHeight / height;
    } else {
      newScale = innerWidth / width;
    }

    if (changeState) {
      this.setState({
        scale: newScale
      });
    } else {
      return newScale;
    }
  }

  render() {
    return (
        <Scalable
          frameWidth={BASE_SIZE.width}
          frameHeight={BASE_SIZE.height}
          frameScale={this.state.scale}
        >
          <Controller/>
        </Scalable>
    );
  }
}


