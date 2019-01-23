/**
 *
 * Function which calculates the investors preferred stock and the
 * common stock from a given exit value.
 *
 * @param {Object} shareholders - Shareholders data
 * @param {number} exitValue - The exit price
 *
 * @returns {Array} Array of two, the common stock and shareholders
 */

export default ({ shareholders, exitValue }) => {
  let commonStockSum = 0;

  // Working on the preferred stock for investors.
  // Also also setting the balance for the common stock.
  shareholders
    .reverse() // To start from the last investors
    .reduce((balance, currentShareholder) => {
      const {
        invested,
        multiplier,
        payout: { participation },
        hasConvertedToCommonShare
      } = currentShareholder;

      // This does not apply for founders.
      // And if there is no exit value, there is nothing to work out.
      if (currentShareholder.title === "Founders" || exitValue < 0) {
        return balance;
      }

      // If investors converted to Common stock, exclude
      // them from the preferred stock separa
      if (hasConvertedToCommonShare) {
        currentShareholder.payout = {
          participation,
          liquidationPreference: 0
        };
        return balance;

        // Is the following needed??

        // if  converted, remove from capped list (if they are capped)
        // const isInvestorAlreadyCapped = cappedInvestors.find(
        //   i => i.title === currentShareholder.title
        // );

        // if (isInvestorAlreadyCapped) {
        //   newCappedInvestors.push(currentShareholder);
        // }
      }

      // if there is less balance than investment,
      // give all the remaining balance to the current investor
      if (balance <= invested * multiplier) {
        currentShareholder.payout = {
          participation: 0,
          liquidationPreference: balance
        };
        balance = 0;
        commonStockSum = balance;
        return balance;
      }

      // At this point, there is enough balance to cover the
      // Investor preferred stock.
      currentShareholder.payout = {
        participation,
        liquidationPreference: invested * multiplier
      };

      balance -= invested * multiplier;
      commonStockSum = balance;
      return balance;
    }, exitValue);

  return [shareholders.reverse(), commonStockSum];
};
