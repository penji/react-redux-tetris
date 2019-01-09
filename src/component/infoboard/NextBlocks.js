import React from 'react';
import {Title} from './components';
import styled from 'styled-components';

import {NextBlock} from '../block/NextBlock';
import {connect} from 'react-redux';

import theme from '../../theme/index'

const Div = styled.div`
  background: transparent;
  height: 184px;
`;

const Board = styled.div`
  position: relative;
  width: 75px;
  height: 150px;
  top: 7.5px;
  left: 19px;
  background-color: transparent;
  border: 3px dotted ${({theme}) => theme.borderColor};
`;

Board.defaultProps = {
  theme: theme.BASE.infoboard.NextBlocks
};

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