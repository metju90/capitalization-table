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
      totalShares += shareholders[key].shares;
      return shareholders[key];
    })
    .map(s => {
      s.sharesInPercentage = 100 * (s.shares / totalShares).toFixed(4);
      return s;
    });
};
