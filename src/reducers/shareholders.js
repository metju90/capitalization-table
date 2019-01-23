import {
  PREFERRED_STOCK,
  CHANGE_CAP,
  CHANGE_MULTIPLIER,
  ADDITION
} from "../constants";

export function reducer(state, action) {
  switch (action.type) {
    case "reset": {
      return action.payload;
    }
    case "CONVERT_INVESTOR": {
      const investorToConvert = state.shareholders.find(
        s => s.title === action.payload
      );
      
      return {
        ...state
      };
    }

    case CHANGE_MULTIPLIER: {
      const { title, operation } = action.payload;
      const { shareholders: UnprocessedShareholders, reCalculate } = state;
      const shareholders = UnprocessedShareholders.map(s => {
        if (s.title === title) {
          if (operation === ADDITION) s.multiplier++;
          else s.multiplier--;
        }
        return s;
      });
      return {
        ...state,
        shareholders,
        reCalculate: !reCalculate
      };
    }

    case CHANGE_CAP: {
      const { title, operation } = action.payload;
      const { shareholders: UnprocessedShareholders, reCalculate } = state;
      const shareholders = UnprocessedShareholders.map(s => {
        if (s.title === title) {
          if (operation === ADDITION) s.cap++;
          else s.cap--;
        }
        return s;
      });
      return {
        ...state,
        shareholders,
        reCalculate: !reCalculate
      };
    }

    case PREFERRED_STOCK: {
      return {
        ...state,
        ...action.payload
      };
    }

    default: {
      return state;
    }
  }
}
