export const BLOCK = {
  X:'X', D:'D', I:'I', O:'O', T:'T', J:'J', L:'L', S:'S', Z:'Z'
};
export const NORMAL_TYPES = [
    BLOCK.I, BLOCK.O, BLOCK.T, BLOCK.J, BLOCK.L, BLOCK.S, BLOCK.Z,
];

export const Tetromino = {
  [BLOCK.I]: {
    maxRotate: 3,
    rotate: {
      0: {
        shape: [
          [BLOCK.I,BLOCK.I,BLOCK.I,BLOCK.I]
        ],
        w: 4,
        h: 1,
        dx: -1,
        dy: 1
      },
      1: {
        shape: [
          [BLOCK.I],
          [BLOCK.I],
          [BLOCK.I],
          [BLOCK.I],
        ],
        w: 1,
        h: 4,
        dx: 2,
        dy: -1
      },
      2: {
        shape: [
          [BLOCK.I,BLOCK.I,BLOCK.I,BLOCK.I]
        ],
        w: 4,
        h: 1,
        dx: -2,
        dy: 2
      },
      3: {
        shape: [
          [BLOCK.I],
          [BLOCK.I],
          [BLOCK.I],
          [BLOCK.I],
        ],
        w: 1,
        h: 4,
        dx: 1,
        dy: -2
      },
    }
  },
  [BLOCK.O]: {
    maxRotate: 0,
    rotate: {
      0: {
        shape: [
          [BLOCK.O,BLOCK.O],
          [BLOCK.O,BLOCK.O],
        ],
        w: 2,
        h: 2,
        dx: 0,
        dy: 0
      }
    }
  },
  [BLOCK.T]: {
    maxRotate: 3,
    rotate: {
      0: {
        shape: [
          [BLOCK.X,BLOCK.T,BLOCK.X],
          [BLOCK.T,BLOCK.T,BLOCK.T]
        ],
        w: 3,
        h: 2,
        dx: 0,
        dy: 0
      },
      1: {
        shape: [
          [BLOCK.T,BLOCK.X],
          [BLOCK.T,BLOCK.T],
          [BLOCK.T,BLOCK.X]
        ],
        w: 2,
        h: 3,
        dx: 1,
        dy: 0
      },
      2: {
        shape: [
          [BLOCK.T,BLOCK.T,BLOCK.T],
          [BLOCK.X,BLOCK.T,BLOCK.X],
        ],
        w: 3,
        h: 2,
        dx: -1,
        dy: 1
      },
      3: {
        shape: [
          [BLOCK.X,BLOCK.T],
          [BLOCK.T,BLOCK.T],
          [BLOCK.X,BLOCK.T]
        ],
        w: 2,
        h: 3,
        dx: 0,
        dy: -1
      }
    }
  },
  [BLOCK.J]: {
    maxRotate: 3,
    rotate: {
      0: {
        shape: [
          [BLOCK.J,BLOCK.X,BLOCK.X],
          [BLOCK.J,BLOCK.J,BLOCK.J]
        ],
        w: 3,
        h: 2,
        dx: 0,
        dy: 0
      },
      1: {
        shape: [
          [BLOCK.J,BLOCK.J],
          [BLOCK.J,BLOCK.X],
          [BLOCK.J,BLOCK.X]
        ],
        w: 2,
        h: 3,
        dx: 1,
        dy: 0
      },
      2: {
        shape: [
          [BLOCK.J,BLOCK.J,BLOCK.J],
          [BLOCK.X,BLOCK.X,BLOCK.J]
        ],
        w: 3,
        h: 2,
        dx: -1,
        dy: 1
      },
      3: {
        shape: [
          [BLOCK.X,BLOCK.J],
          [BLOCK.X,BLOCK.J],
          [BLOCK.J,BLOCK.J]
        ],
        w: 2,
        h: 3,
        dx: 0,
        dy: -1
      }
    }
  },
  [BLOCK.L]: {
    maxRotate: 3,
    rotate: {
      0: {
        shape: [
          [BLOCK.X,BLOCK.X,BLOCK.L],
          [BLOCK.L,BLOCK.L,BLOCK.L]
        ],
        w: 3,
        h: 2,
        dx: 0,
        dy: 0
      },
      1: {
        shape: [
          [BLOCK.L,BLOCK.X],
          [BLOCK.L,BLOCK.X],
          [BLOCK.L,BLOCK.L]
        ],
        w: 2,
        h: 3,
        dx: 1,
        dy: 0
      },
      2: {
        shape: [
          [BLOCK.L,BLOCK.L,BLOCK.L],
          [BLOCK.L,BLOCK.X,BLOCK.X]
        ],
        w: 3,
        h: 2,
        dx: -1,
        dy: 1
      },
      3: {
        shape: [
          [BLOCK.L,BLOCK.L],
          [BLOCK.X,BLOCK.L],
          [BLOCK.X,BLOCK.L]
        ],
        w: 2,
        h: 3,
        dx: 0,
        dy: -1
      }
    }
  },
  [BLOCK.S]: {
    maxRotate: 3,
    rotate: {
      0: {
        shape: [
          [BLOCK.X,BLOCK.S,BLOCK.S],
          [BLOCK.S,BLOCK.S,BLOCK.X]
        ],
        w: 3,
        h: 2,
        dx: 0,
        dy: 0
      },
      1: {
        shape: [
          [BLOCK.S,BLOCK.X],
          [BLOCK.S,BLOCK.S],
          [BLOCK.X,BLOCK.S]
        ],
        w: 2,
        h: 3,
        dx: 1,
        dy: 0
      },
      2: {
        shape: [
          [BLOCK.X,BLOCK.S,BLOCK.S],
          [BLOCK.S,BLOCK.S,BLOCK.X]
        ],
        w: 3,
        h: 2,
        dx: -1,
        dy: 1
      },
      3: {
        shape: [
          [BLOCK.S,BLOCK.X],
          [BLOCK.S,BLOCK.S],
          [BLOCK.X,BLOCK.S]
        ],
        w: 2,
        h: 3,
        dx: 0,
        dy: -1
      }
    }
  },
  [BLOCK.Z]: {
    maxRotate: 3,
    rotate: {
      0: {
        shape: [
          [BLOCK.Z,BLOCK.Z,BLOCK.X],
          [BLOCK.X,BLOCK.Z,BLOCK.Z]
        ],
        w: 3,
        h: 2,
        dx: 0,
        dy: 0
      },
      1: {
        shape: [
          [BLOCK.X,BLOCK.Z],
          [BLOCK.Z,BLOCK.Z],
          [BLOCK.Z,BLOCK.X]
        ],
        w: 2,
        h: 3,
        dx: 1,
        dy: 0
      },
      2: {
        shape: [
          [BLOCK.Z,BLOCK.Z,BLOCK.X],
          [BLOCK.X,BLOCK.Z,BLOCK.Z]
        ],
        w: 3,
        h: 2,
        dx: -1,
        dy: 1
      },
      3: {
        shape: [
          [BLOCK.X,BLOCK.Z],
          [BLOCK.Z,BLOCK.Z],
          [BLOCK.Z,BLOCK.X]
        ],
        w: 2,
        h: 3,
        dx: 0,
        dy: -1
      },
    }
  }
};