/**
 *
 * Function which calculates shareholders percentages - their shares and if
 * applicable, the percentage they will take from the uncapped stock.
 *
 * @param {Object} shareholders - Static data of the share holders
 *
 * @returns {Object} - The same object which is passed as param with the a
 * new key(s) `sharesInPercentage` and if applicable, `uncappedParticipationPercentage`
 *
 */
export default shareholders => {
  let investorsCombinedShares = 0;
  let totalSharesOfUncappedInvestors = 0;

  return Object.keys(shareholders)
    .map(key => {
      investorsCombinedShares += shareholders[key].shares;

      if (shareholders[key].payout.isCapReached) {
        return shareholders[key];
      }
      // Only if the investor is not capped.
      totalSharesOfUncappedInvestors += shareholders[key].shares;
      return shareholders[key];
    })
    .map(s => {
      s.sharesInPercentage = calculatePercentage(
        s.shares,
        investorsCombinedShares
      );

      if (!s.payout.isCapReached) {
        s.uncappedParticipationPercentage = calculatePercentage(
          s.shares,
          totalSharesOfUncappedInvestors
        );
      }
      return s;
    });
};

// this function assumes that the partial value is below than 1.
// i.e. 0.5, 0.33 or 0.067
const calculatePercentage = (partialValue, totalValue) =>
  // This is a workout to deal with Javascript's issue with float numbers
  Math.round(((100 * partialValue) / totalValue).toFixed(2) * 100) / 100;
