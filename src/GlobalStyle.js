import { createGlobalStyle } from 'styled-components';
import ARCADECLASSIC from './resource/ARCADECLASSIC.TTF';

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: ARCADECLASSIC;
    src: url(${ARCADECLASSIC});
  }
`;

export default GlobalStyle;