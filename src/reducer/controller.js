import { handleAction } from 'redux-actions';
import {makeCombineActionType} from '../util/util';
import {buttonAction} from '../action/controller';

export const controller = handleAction(
    makeCombineActionType(buttonAction),
    (state, {type}) => {
      const s = type.split('_');
      return {
        button: s[0],
        pressed: s[1] === 'TRUE' ? true : false
      }
    },
    {
      button: null,
      pressed: null
    }
);