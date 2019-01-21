/**
 *
 * Function which calculates the percentage of both the shares and
 *
 * @param {Object} shareholders - Static data of the share holders
 *
 * @returns {Object} - The same object which is passed as param with the a
 * new key(s) `sharesInPercentage` and if applicable, `uncappedParticipationPercentage`
 *
 */
export default shareholders => {
  let totalShares = 0;
  let uncappedShares = 0;

  return Object.keys(shareholders)
    .map(key => {
      // To calculate to shares
      totalShares += shareholders[key].shares;

      // omit the shares of capped investors
      if (shareholders[key].payout.isCapReached) return shareholders[key];

      uncappedShares += shareholders[key].shares;
      return shareholders[key];
    })
    .map(s => {
      s.sharesInPercentage =
        Math.round(((100 * s.shares) / totalShares).toFixed(2) * 100) / 100;

      if (!s.payout.isCapReached) {
        s.uncappedParticipationPercentage =
          Math.round(((100 * s.shares) / uncappedShares).toFixed(2) * 100) /
          100;
      }
      return s;
    });
};
