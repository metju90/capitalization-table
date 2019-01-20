import { shortNumber } from "./index";
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
  let participationPercentage = 0;
  return Object.keys(shareholders)
    .map(key => {
      // omit the shares of capped investors
      console.log(
        "is this one capped?!?!?!",
        shareholders[key].payout.isCapReached
      );

      totalShares += shareholders[key].shares;
      if (shareholders[key].payout.isCapReached) return shareholders[key];
      participationPercentage += shareholders[key].shares;
      return shareholders[key];
    })
    .map(s => {
      s.sharesInPercentage =
        Math.round(((100 * s.shares) / totalShares).toFixed(2) * 100) / 100;
      if (!s.payout.isCapReached) {
        s.participationPercentage =
          Math.round(
            ((100 * s.shares) / participationPercentage).toFixed(2) * 100
          ) / 100;
        console.log(
          "UPDATING SHARES IN PER ",
          shortNumber(totalShares),
          s.title,
          s.sharesInPercentage,
          totalShares
        );
      }
      //   console.log("wtf??? ", s.sharesInPercentage);
      return s;
    });
};
