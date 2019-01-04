const Tetromino = {
  I: {
    maxRotate: 1,
    rotate: {
      0: {
        shape: [
          ['I','I','I','I']
        ],
        w: 4,
        h: 1,
        dx: 1,
        dy: 1
      },
      1: {
        shape: [
          ['I'],
          ['I'],
          ['I'],
          ['I'],
        ],
        w: 1,
        h: 4,
        dx: -1,
        dy: -1
      }
    }
  },
  O: {
    maxRotate: 0,
    rotate: {
      0: {
        shape: [
          ['O','O'],
          ['O','O'],
        ],
        w: 2,
        h: 2,
        dx: 0,
        dy: 0
      }
    }
  },
  T: {
    maxRotate: 3,
    rotate: {
      0: {
        shape: [
          ['X','T','X'],
          ['T','T','T']
        ],
        w: 3,
        h: 2,
        dx: 1,
        dy: 1
      },
      1: {
        shape: [
          ['T','X'],
          ['T','T'],
          ['T','X']
        ],
        w: 2,
        h: 3,
        dx: 1,
        dy: 0
      },
      2: {
        shape: [
          ['T','T','T'],
          ['X','T','X'],
        ],
        w: 3,
        h: 2,
        dx: -1,
        dy: 1
      },
      3: {
        shape: [
          ['X','T'],
          ['T','T'],
          ['X','T']
        ],
        w: 2,
        h: 3,
        dx: 0,
        dy: -1
      }
    }
  },
  J: {
    maxRotate: 3,
    rotate: {
      0: {
        shape: [
          ['J','X','X'],
          ['J','J','J']
        ],
        w: 3,
        h: 2,
        dx: 1,
        dy: 1
      },
      1: {
        shape: [
          ['J','J'],
          ['J','X'],
          ['J','X']
        ],
        w: 2,
        h: 3,
        dx: -1,
        dy: 0
      },
      2: {
        shape: [
          ['J','J','J'],
          ['X','X','J']
        ],
        w: 3,
        h: 2,
        dx: 0,
        dy: 0
      },
      3: {
        shape: [
          ['X','J'],
          ['X','J'],
          ['J','J']
        ],
        w: 2,
        h: 3,
        dx: 0,
        dy: -1
      }
    }
  },
  L: {
    maxRotate: 3,
    rotate: {
      0: {
        shape: [
          ['X','X','L'],
          ['L','L','L']
        ],
        w: 3,
        h: 2,
        dx: 1,
        dy: 1
      },
      1: {
        shape: [
          ['L','X'],
          ['L','X'],
          ['L','L']
        ],
        w: 2,
        h: 3,
        dx: -1,
        dy: 0
      },
      2: {
        shape: [
          ['L','L','L'],
          ['L','X','X']
        ],
        w: 3,
        h: 2,
        dx: 0,
        dy: 0
      },
      3: {
        shape: [
          ['L','L'],
          ['X','L'],
          ['X','L']
        ],
        w: 2,
        h: 3,
        dx: 0,
        dy: -1
      }
    }
  },
  S: {
    maxRotate: 1,
    rotate: {
      0: {
        shape: [
          ['X','S','S'],
          ['S','S','X']
        ],
        w: 3,
        h: 2,
        dx: 0,
        dy: 1
      },
      1: {
        shape: [
          ['S','X'],
          ['S','S'],
          ['X','S']
        ],
        w: 2,
        h: 3,
        dx: 0,
        dy: -1
      }
    }
  },
  Z: {
    maxRotate: 1,
    rotate: {
      0: {
        shape: [
          ['Z','Z','X'],
          ['X','Z','Z']
        ],
        w: 3,
        h: 2,
        dx: 1,
        dy: 1
      },
      1: {
        shape: [
          ['X','Z'],
          ['Z','Z'],
          ['Z','X']
        ],
        w: 2,
        h: 3,
        dx: -1,
        dy: -1
      }
    }
  }
};

export default Tetromino;