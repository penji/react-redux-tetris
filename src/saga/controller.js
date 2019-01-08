import { eventChannel } from 'redux-saga';
import { call, take, cancelled, put } from 'redux-saga/effects';

const keyboardEvents = ['keydown', 'keyup'];

const KEYCODE_BUTTON_MAP = {
  38: 'UP',
  40: 'DOWN',
  37: 'LEFT',
  39: 'RIGHT',
  32: 'SPACE',
  13: 'ENTER',
};

const makeKeyboardChannel = () => eventChannel(emit => {

  let throttled = false;
  let throttleDelay = 20;

  const handler = e => {
    if (e.type === 'keydown') {
      if (throttled) return;
      throttled = true;
      setTimeout(() => {
        throttled = false;
      }, throttleDelay);
    }

    throttledHandler(e);
  };

  const throttledHandler = ({type, keyCode, which}) => {
    let key = keyCode || which || null;
    if (!key) return;

    const pressed = type === 'keydown'?
        true
        : type === 'keyup'?
            false
            : null;

    if (pressed === null) return;

    key = KEYCODE_BUTTON_MAP[key];
    if (typeof key === 'string') {
      emit({key, pressed});
    }
  };

  for (const eventName of keyboardEvents) {
    window.addEventListener(eventName, handler);
  }

  const unsubscribe = () => {
    for (const eventName of keyboardEvents) {
      window.removeEventListener(eventName, handler);
    }
  };

  return unsubscribe;
});

export function* keyboardSaga() {
  const chan = yield call(makeKeyboardChannel);
  try {
    while (true) {
      const {key, pressed} = yield take(chan);
      const action = {type: `${key}_${pressed ? 'TRUE' : 'FALSE'}`};
      yield put(action);
    }
  } finally {
    if (yield cancelled()) {
      chan.close();
    }
  }
}