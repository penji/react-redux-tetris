import lifecycle from 'page-lifecycle/dist/lifecycle.es5';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import './App.css';

const BASE_SIZE = {
  width: 320,
  height: 480,
  ratio: 480/320,
};

let resizeTimer;
const resizeDelay = 100;

class App extends Component {
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
        <div className="App" style={{
          transform: `scale(${this.state.scale})`,
        }}>

        </div>
    );
  }
}

const mapStateToProps = state => state;

const mapDispatchToProps = dispatch => ({});

App = connect(mapStateToProps, mapDispatchToProps)(App);

export default App;
