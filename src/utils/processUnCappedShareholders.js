import { calculateSharesinPercentage } from "../utils";

/**
 *  Uncapped, split the sharesInPercentage of the capped
 *
 */
export default ({
  shareholders,
  cappedInvestors,
  commonStockSum,
  investorsWhichExceedsCap
}) => {
  shareholders.reduce((balance, currentShareholder) => {
    const {
      payout: { participation, liquidationPreference },
      sharesInPercentage,
      invested,
      cap,
      hasConvertedToCommonShare,
      uncappedParticipationPercentage
    } = currentShareholder;
    console.log("ncapped stage ?! ", investorsWhichExceedsCap);
    if (investorsWhichExceedsCap.includes(currentShareholder.title)) {
      return balance;
    }
    console.log(
      "uncapped stage ?!?!?!?!?!",
      currentShareholder.title,
      cappedInvestors,
      investorsWhichExceedsCap,
      sharesInPercentage,
      balance * (sharesInPercentage / 100)
    );

    // Need to substract capped investors common share!
    const getCommonShareAfterCappers = () => {
      let cappedInvesorsCommonShares = 0;
      if (cappedInvestors) {
        cappedInvestors.map(
          i => (cappedInvesorsCommonShares += i.payout.participation)
        );
      }
      // console.log(
      //   "cappedInvesorsCommonShares ",
      //   cappedInvesorsCommonShares
      // );
      return balance - cappedInvesorsCommonShares;
    };
    // console.log(
    //   "what are the numbers here??",
    //   cappedInvestors,
    //   balance,
    //   currentShareholder.titl),
    //   getCommonShareAfterCappers(),
    //   sharesInPercentage / 100,
    //   getCommonShareAfterCappers() * (sharesInPercentage / 100)
    // );
    currentShareholder.payout = {
      liquidationPreference,
      participation:
        getCommonShareAfterCappers() * (uncappedParticipationPercentage / 100)
    };
    console.log("but this is not the common stock?", commonStockSum);
    return balance;
  }, commonStockSum);

  return { shareholders: calculateSharesinPercentage(shareholders) };
};
