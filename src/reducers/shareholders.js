import {
  preferredAndCommonStock,
  processCappedShareholders,
  processUnCappedShareholders
} from "../utils";

export function reducer(state, action) {
  switch (action.type) {
    case "reset": {
      return action.payload;
    }
    case "exitValue": {
      return {
        ...state,
        exitValue: action.payload
      };
    }
    case "preferredStock": {
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
    case "shareholders": {
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
