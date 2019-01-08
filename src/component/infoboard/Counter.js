import React, {Component} from 'react';
import CountUp from 'react-countup';

import styled from 'styled-components';

const StyledCountUp = styled(CountUp)`
  display: block;
  font-weight: 700;
  font-family: ARCADECLASSIC;
  text-align: right;
  font-size: 17px;
  bottom: 0px;
  right: 0px;
  line-height: 1;
`;

export default class Counter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      begin: 0,
    };
  }

  render() {
    return (
        <StyledCountUp
            start={this.state.begin}
            end={this.props.value}
            useEasing={false}
            separator=","
            duration={0.5}
        />
    );
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.value !== this.props.value) {
     this.setState({
       begin: prevProps.value
     })
    }
  }
}