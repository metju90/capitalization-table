import { PREFERRED_STOCK } from "../constants";
import {
  preferredAndCommonStock,
  processUnCappedShareholders,
  processCappedShareholders
} from "../utils";

export default (dispatch, payload) => {
  const [firstProcessedShareholders, commonStockSum] = preferredAndCommonStock({
    ...payload
  });

  let investorsWhichExceedsCap = [];

  const { shareholders, cappedInvestors } = processUnCappedShareholders({
    commonStockSum,
    cappedInvestors: [],
    shareholders: firstProcessedShareholders,
    investorsWhichExceedsCap
  });

  dispatch({
    type: PREFERRED_STOCK,
    payload: {
      commonStockSum,
      shareholders,
      cappedInvestors,
      exitValue: payload.exitValue > 0 ? payload.exitValue : 0
    }
  });
};
