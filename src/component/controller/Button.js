import React, { Component } from 'react';
import './Button.css';

const Button = ({ type,
                  pressed,
                  onMouseTouchEvent }) => (
  <button className={
    `button ${type || ''} ${pressed ? 'active' : ''}`.trim()
  }
    onMouseDown={() => onMouseTouchEvent(type, true)}
    onMouseUp={() => onMouseTouchEvent(type, false)}
    onTouchStart={() => onMouseTouchEvent(type, true)}
    onTouchEnd={() => onMouseTouchEvent(type, false)}
  />
);

export default Button;