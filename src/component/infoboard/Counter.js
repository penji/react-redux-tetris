import React, {Component} from 'react';
import {Value} from './components';

export default class Counter extends Component {
  static comma(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  static get fps() {
    return 60;
  }

  static get duration() {
    return 500;
  }

  static get period() {
    return Math.floor(1000 / Counter.fps);
  }

  static get tick() {
    const tick = Counter.duration / Counter.period;

    // 높은 fps에서 duration을 준수하기 위한 보정
    if (Counter.fps > 30) {
      return Math.floor(tick * 0.9);
    } else {
      return Math.floor(tick);
    }

  }

  constructor(props) {
    super(props);
    this.state = {
      now: 0,
      begin: 0,
    };
    this.timerId = null;
    this.tickCount = 0;
  }

  render() {
    return <Value>{Counter.comma(this.state.now)}</Value>
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.value === this.state.now) {
      this.clearTimer();
    } else if (this.timerId === null) {
      this.startTimer();
    }

    if (prevProps.value !== this.props.value) {
      this.clearTimer(true);
      this.startTimer(true);
    }
  }

  componentDidMount() {
    this.startTimer();
  }


  clearTimer(valueChanged = false) {
    if (!valueChanged) {
      this.tickCount = 0;
    }
    clearInterval(this.timerId);
    this.timerId = null;
  }

  startTimer(valueChanged = false) {
    let next, _delta;

    const {value} = this.props;
    const {begin, now} = this.state;

    if (valueChanged) {
      _delta = Math.ceil((value - now) / (Counter.tick - this.tickCount));
    } else {
      _delta = Math.ceil((value - begin) / Counter.tick);
    }

    this.timerId = setInterval(() => {

      const {value} = this.props;
      const {now} = this.state;
      this.tickCount++;

      if (this.tickCount === Counter.tick) {
        next = value;
      } else {
        next = now + _delta;
      }

      this.setState({
        ...this.state,
        now: next,
      });

    }, Counter.period);
  }
}