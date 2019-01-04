import React from 'react';
import {Title} from './components';
import styled from 'styled-components';

import {Block} from '../block/Block';
import {connect} from 'react-redux';

const Div = styled.div`
  background: yellow;
  height: 184px;
`;

const Board = styled.div`
  position: relative;
  width: 75px;
  height: 150px;
  top: 7.5px;
  left: 22.5px;
  background-color: grey;
`;

const NextBlock = connect(
    ({block}) => ({next: block.next})
)(
    ({next}) => {
      const nextArr = next.slice(0, 3);

      return (
          <Div>
            <Title>NEXT</Title>
            <Board>
              <table style={{width:'100%', height:'100%'}}>
                <tbody>
                {
                  nextArr.map(({type}, i) => (
                      <tr>
                        <td>
                          <Block key={i} type={type}/>
                        </td>
                      </tr>
                  ))
                }
                </tbody>
              </table>
            </Board>
          </Div>
      )
    }
);

export default NextBlock;