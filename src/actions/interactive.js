import {
  CHANGE_CAP,
  CHANGE_MULTIPLIER,
  ADDITION,
  SUBTRACT
} from "../constants";

export const handleCapAddition = (dispatch, title) => {
  dispatch({
    type: CHANGE_CAP,
    payload: { operation: ADDITION, title }
  });
};

export const handleCapSubtract = (dispatch, title) => {
  dispatch({
    type: CHANGE_CAP,
    payload: { operation: SUBTRACT, title }
  });
};

export const handleMultiplierAddition = (dispatch, title) => {
  dispatch({
    type: CHANGE_MULTIPLIER,
    payload: { operation: ADDITION, title }
  });
};

export const handleMultiplierSubtract = (dispatch, title) => {
  dispatch({
    type: CHANGE_MULTIPLIER,
    payload: { operation: SUBTRACT, title }
  });
};
