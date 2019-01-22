import {
  preferredAndCommonStock,
  processCappedShareholders,
  processUnCappedShareholders
} from "../utils";

import { EXIT_VALUE, PREFERRED_STOCK, SHAREHOLDERS } from "../constants";

export function reducer(state, action) {
  switch (action.type) {
    case "reset": {
      return action.payload;
    }
    case EXIT_VALUE: {
      return {
        ...state,
        exitValue: action.payload > 0 ? action.payload : 0
      };
    }
    case PREFERRED_STOCK: {
      const [shareholders, commonStockSum] = preferredAndCommonStock({
        ...action.payload
      });

      return {
        ...state,
        commonStockSum,
        shareholders,
        cappedInvestors: []
      };
    }
    case SHAREHOLDERS: {
      const { payload } = action;
      let investorsWhichExceedsCap = [];

      // the following two function might
      // be possible to merge them into one.
      const [
        processedShareholders,
        cappedInvestors
      ] = processCappedShareholders({
        ...payload,
        investorsWhichExceedsCap
      });

      const { shareholders } = processUnCappedShareholders({
        ...payload,
        cappedInvestors,
        shareholders: processedShareholders,
        investorsWhichExceedsCap
      });

      return {
        ...state,
        shareholders
      };
    }
    default: {
      return state;
    }
  }
}
