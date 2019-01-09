import {BLOCK} from '../model/Tetromino';

export default {
  MainFrame: {
    background: '#7F8C8D',
  },
  block: {
    Block: {

    },
    Cell: {
      mapTypeToColor: {
        [BLOCK.X]: 'transparent',
        [BLOCK.D]: '#7F8C8D',
        [BLOCK.I]: '#C0392B',
        [BLOCK.O]: '#F39C12',
        [BLOCK.T]: '#F1C40F',
        [BLOCK.J]: '#27AE60',
        [BLOCK.L]: '#2980B9',
        [BLOCK.S]: '#34495E',
        [BLOCK.Z]: '#8E44AD',
      },
    },
  },
  blackboard: {
    BlackBoard: {
      background: '#ECF0F1',
    },
  },
  controller: {
    buttons: {
      Move: {
        normal: '#3498DB',
        shadowNormal: '#2980B9',
        active: '#2980B9',
        shadowActive: '#264B81',
      },
      SpaceBtn: {
        normal: '#E74C3C',
        shadowNormal: '#C0392B',
        active: '#C0392B',
        shadowActive: '#7A2A1E',
      },
    },
    Controller: {
      background: '#BDC3C7',
    },
  },
  infoboard: {
    components: {
      Title: {
        fontSize: 10,
        color: '#34495E',
      },
      Value: {
        fontSize: 15,
        color: '#505050'
      },
    },
    Counter: {
      fontSize: 15,
      color: '#505050',
    },
    InfoBoard: {
      background: '#ECF0F1',
    },
    NextBlocks: {
      borderColor: '#7F8C8D',
    },
  },
  Message: {
    StartMessage: {
      color: '#34495E',
    },
    PauseMessage: {
      color: '#34495E',
      background: '#BDC3C7',
    },
  },
};