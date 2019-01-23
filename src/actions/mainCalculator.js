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

  // the following two function might
  // be possible to merge them into one.
  const [
    secondProcessedShareholders,
    cappedInvestors
  ] = processCappedShareholders({
    shareholders: firstProcessedShareholders,
    commonStockSum,
    cappedInvestors: [],
    investorsWhichExceedsCap
  });

  console.log("hey there! capped investor", cappedInvestors);

  const { shareholders } = processUnCappedShareholders({
    commonStockSum,
    cappedInvestors,
    shareholders: secondProcessedShareholders,
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
