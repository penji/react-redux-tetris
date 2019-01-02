import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Controller.css';
import Button from './Button';

const BUTTONS = ['UP', 'DOWN', 'LEFT', 'RIGHT', 'SPACE'];

export default class Controller extends Component {
  componentDidMount() {

  };

  componentWillUnmount() {

  };

  componentDidUpdate(prevProps,/*prevState, snapshot*/) {

  }

  render() {
    return (
        <div className="controller">
          {BUTTONS.map((type, index) => {
            if (type === this.props.button) {
              return <Button
                  key={index}
                  type={type}
                  pressed={this.props.pressed}
                  onMouseTouchEvent={this.props.changeButtonState}
              />;
            } else {
              return <Button
                  key={index}
                  type={type}
                  pressed={false}
                  onMouseTouchEvent={this.props.changeButtonState}
              />;
            }
          })}
        </div>
    );
  }
}

const mapStateToProps = state => state.controller;

const mapDispatchToProps = dispatch => ({
  changeButtonState: (type, pressed) => {
    const action = {type: `${type}_${pressed ? 'TRUE' : 'FALSE'}`};
    return dispatch(action);
  }
});

Controller = connect(mapStateToProps, mapDispatchToProps)(Controller);