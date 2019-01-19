/**
 *
 * Function which calculates the shares of investors/founders in percentage
 *
 * @param {Object} shareholders - Static data of the share holders
 *
 * @returns {Object} - The same object which is passed as param with the a new key `sharesInPercentage`
 */
export default shareholders => {
  let totalShares = 0;
  return Object.keys(shareholders)
    .map(key => {
      // omit capped investors
      if (shareholders[key].isCapReached) return shareholders[key];
      totalShares += shareholders[key].shares;
      return shareholders[key];
    })
    .map(s => {
      s.sharesInPercentage =
        Math.round(((100 * s.shares) / totalShares).toFixed(2) * 100) / 100;

      //   console.log("wtf??? ", s.sharesInPercentage);
      return s;
    });
};
