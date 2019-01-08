import React from 'react';
import {Title} from './components';
import styled from 'styled-components';

import {NextBlock} from '../block/NextBlock';
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

const Table = styled.table`
  width: 100%;
  height: 100%;
`;

const NextBlocks = connect(
    ({block}) => ({next: block.next})
)(
    ({next}) => {
      const nextArr = next.slice(0, 3);
      return (
          <Div>
            <Title>NEXT</Title>
            <Board>
              <Table>
                <tbody>
                {
                  nextArr.map(({type}, i) => (
                      <tr key={i}>
                        <td>
                          <NextBlock type={type}/>
                        </td>
                      </tr>
                  ))
                }
                </tbody>
              </Table>
            </Board>
          </Div>
      )
    }
);

export default NextBlocks;