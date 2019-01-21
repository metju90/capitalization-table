/**
 *  Checks for capped one first
 */
export default ({
  shareholders,
  cappedInvestors,
  commonStockSum,
  investorsWhichExceedsCap
}) => {
  shareholders.reduce((balance, currentShareholder) => {
    const {
      payout: { liquidationPreference, isCapReached },
      sharesInPercentage,
      invested,
      cap,
      hasConvertedToCommonShare,
      multiplier,
      title
    } = currentShareholder;
    console.log("checking for capped ?!?!?!?!?!");
    if (hasConvertedToCommonShare) {
      return balance;
    }
    const doesExceedCap =
      balance * (sharesInPercentage / 100) > invested * (cap - 1);
    if (doesExceedCap) {
      currentShareholder.payout = {
        liquidationPreference,
        // cap - 1 because liquidation preference is considered as x1.
        // Therefore adding I am reducing the preferrenced stock from
        // the cap.
        participation: invested * (cap - 1),
        isCapReached: true
      };
      console.log("does he exceed the cap????");
      // Add investors in the capp list
      // If they aren't already.
      const isInvestorAlreadyCapped = cappedInvestors.find(
        i => i.title === currentShareholder.title
      );
      if (!isInvestorAlreadyCapped) {
        cappedInvestors.push(currentShareholder);
      }
    }

    if (doesExceedCap || hasConvertedToCommonShare) {
      investorsWhichExceedsCap.push(currentShareholder.title);
    }
    console.log(
      "hey there???commonStockSum",
      investorsWhichExceedsCap,
      cappedInvestors
    );
    commonStockSum = balance;
    return balance;
  }, commonStockSum);

  return [shareholders, cappedInvestors];
};
