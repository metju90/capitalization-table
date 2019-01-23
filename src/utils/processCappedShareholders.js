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
      payout: { liquidationPreference, participation },
      sharesInPercentage,
      invested,
      cap,
      hasConvertedToCommonShare
    } = currentShareholder;
    console.log(
      "checking for capped ?!?!?!?!?!",
      currentShareholder.title,
      invested * cap - 1,
      participation
    );
    // if (hasConvertedToCommonShare) {
    //   return balance;
    // }

    // const participationWithoutConversion =
    /**
     *
     * To check whether or not its worth for the investor to
     * keep the preferred stock or to convert
     *
     */

    // currentShareholder.payout = {
    //   liquidationPreference,
    //   // cap - 1 because liquidation preference is considered as x1.
    //   // Therefore adding I am reducing the preferred stock from
    //   // the cap.
    //   participation: invested * (cap - 1),
    //   isCapReached: true
    // };
    console.log("does he exceed the cap????", currentShareholder.title);

    //}

    // if (doesExceedCap || hasConvertedToCommonShare) {
    //   investorsWhichExceedsCap.push(currentShareholder.title);
    // }
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
