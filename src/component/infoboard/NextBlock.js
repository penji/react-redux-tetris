import React from 'react';
import {Title, Value} from './components';
import styled from 'styled-components';

import {X, I, O, T, J, L, S, Z} from '../block/Cell';
import {connect} from 'react-redux';

const Div = styled.div`
  background: yellow;
  height: 100px;
`;

const Board = styled.div`
  position: relative;
  width: 75px;
  height: 30px;
  top: 30px;
  left: 22.5px;
  background-color: grey;
`;

const Row = styled.div`
  width: 75px;
  height: 15px;
  line-height: 0px;
`;

const boardMap = {
  'X': (<React.Fragment>
          <Row>
            <X/><X/><X/><X/><X/>
          </Row>
          <Row>
            <X/><X/><X/><X/><X/>
          </Row>
      </React.Fragment>),

  'I': (<React.Fragment>
    <Row>
      <X/><X/><X/><X/><X/>
    </Row>
    <Row>
      <I/><I/><I/><I/><X/>
    </Row>
  </React.Fragment>),

  'O': (<React.Fragment>
    <Row>
      <X/><O/><O/><X/><X/>
    </Row>
    <Row>
      <X/><O/><O/><X/><X/>
    </Row>
  </React.Fragment>),

  'T': (<React.Fragment>
    <Row>
      <X/><X/><T/><X/><X/>
    </Row>
    <Row>
      <X/><T/><T/><T/><X/>
    </Row>
  </React.Fragment>),

  'J': (<React.Fragment>
    <Row>
      <X/><X/><X/><J/><X/>
    </Row>
    <Row>
      <X/><J/><J/><J/><X/>
    </Row>
  </React.Fragment>),

  'L': (<React.Fragment>
    <Row>
      <X/><L/><X/><X/><X/>
    </Row>
    <Row>
      <X/><L/><L/><L/><X/>
    </Row>
  </React.Fragment>),

  'S': (<React.Fragment>
    <Row>
      <X/><X/><S/><S/><X/>
    </Row>
    <Row>
      <X/><S/><S/><X/><X/>
    </Row>
  </React.Fragment>),

  'Z': (<React.Fragment>
    <Row>
      <X/><Z/><Z/><X/><X/>
    </Row>
    <Row>
      <X/><X/><Z/><Z/><X/>
    </Row>
  </React.Fragment>),
};

const NextBlock = connect(
    ({info}) => ({type: info.next})
)(
    ({type}) => (
        <Div>
          <Title>NEXT</Title>
          <Board>
            {boardMap[type]}
          </Board>
        </Div>
    )
);

export default NextBlock;