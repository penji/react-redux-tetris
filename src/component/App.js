import lifecycle from 'page-lifecycle/dist/lifecycle.es5';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import './App.css';

import {changeAppScale} from '../action/changeAppScale';
import {changePageLifecycleState} from '../action/changePageLifecycleState';

class App extends Component {

  componentDidMount() {
    lifecycle.addEventListener(
        'statechange', this.props.onChangePageLifecycleState);
    window.addEventListener("resize", this.props.onResize);
  };

  componentWillUnmount() {
    lifecycle.removeEventListener(
        'statechange', this.props.onChangePageLifecycleState);
    window.removeEventListener("resize", this.props.onResize);
  };

  render() {
    const {appScale} = this.props.global;
    return (
        <div className="App" style={{
          transform: appScale,
        }}>

        </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    global: {
      appScale: `scale(${state.global.appScale})`,
      pageState: state.global.pageState
    }
  }
};

const mapDispatchToProps = dispatch => {
  return {
    onResize: () => dispatch(changeAppScale()),
    onChangePageLifecycleState: ({newState, oldState}) =>
        dispatch(changePageLifecycleState(newState, oldState))
  }
};

App = connect(mapStateToProps, mapDispatchToProps)(App);

export default App;
