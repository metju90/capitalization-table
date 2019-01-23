import {
  calculateSharesinPercentage,
  getInvestorsParticipationAfterCapping
} from "../utils";

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
      payout: { liquidationPreference, participation },
      sharesInPercentage,
      uncappedParticipationPercentage,
      invested,
      cap,
      title,
      hasConvertedToCommonShare
    } = currentShareholder;

    // if (hasConvertedToCommonShare) {
    //   console.log("WWWWW CONERTED!!!!", title);
    //   currentShareholder.payout = {
    //     liquidationPreference,
    //     participation:
    //       getInvestorsParticipationAfterCapping(cappedInvestors, balance) *
    //       (uncappedParticipationPercentage / 100)
    //   };
    //   return balance;
    // }
    const doesExceedCap =
      balance * (sharesInPercentage / 100) > invested * (cap - 1);
    // console.log("WWWWWWWW does exced cap", doesExceedCap);
    if (doesExceedCap) {
      const isWorth = isWorthConverting(
        participation + liquidationPreference,
        getProfitsWithoutCapping(
          cappedInvestors,
          balance,
          uncappedParticipationPercentage
        )
      );

      console.log(
        "WWWWWWWW",
        uncappedParticipationPercentage,
        title,
        participation + liquidationPreference,
        getProfitsWithoutCapping(
          cappedInvestors,
          balance,
          uncappedParticipationPercentage
        ),
        isWorth,
        invested * (cap - 1)
      );

      if (isWorth) {
        currentShareholder.hasConvertedToCommonShare = true;
        currentShareholder.payout = {
          isCapReached: false,
          liquidationPreference: 0,
          participation:
            getInvestorsParticipationAfterCapping(cappedInvestors, balance) *
            (uncappedParticipationPercentage / 100)
        };
      } else {
        const isInvestorAlreadyCapped = cappedInvestors.find(
          i => i.title === currentShareholder.title
        );
        if (!isInvestorAlreadyCapped) {
          cappedInvestors.push(currentShareholder);
        }
        currentShareholder.hasConvertedToCommonShare = false;
        currentShareholder.payout = {
          isCapReached: true,
          liquidationPreference,
          participation: invested * (cap - 1)
        };
      }
    } else {
      currentShareholder.payout = {
        isCapReached: false,
        liquidationPreference,
        participation:
          getInvestorsParticipationAfterCapping(cappedInvestors, balance) *
          (uncappedParticipationPercentage / 100)
      };
    }

    // Add investors in the capp list
    // If they aren't already.

    console.log("ncapped stage ?! ", investorsWhichExceedsCap);
    if (investorsWhichExceedsCap.includes(currentShareholder.title)) {
      return balance;
    }
    // console.log(
    //   "uncapped stage ?!?!?!?!?!",
    //   currentShareholder.title,
    //   cappedInvestors,
    //   investorsWhichExceedsCap,
    //   sharesInPercentage,
    //   balance * (sharesInPercentage / 100)
    // );

    // Need to substract capped investors common share!
    // const xxx = () => {
    //   let cappedInvesorsCommonShares = 0;
    //   if (cappedInvestors) {
    //     cappedInvestors.map(
    //       i => (cappedInvesorsCommonShares += i.payout.participation)
    //     );
    //   }
    // console.log(
    //   "cappedInvesorsCommonShares ",
    //   cappedInvesorsCommonShares
    // );
    //   return balance - cappedInvesorsCommonShares;
    // };

    // console.log(
    //   "what are the numbers here??",
    //   cappedInvestors,
    //   balance,
    //   currentShareholder.titl),
    //   getInvestorsParticipationAfterCapping(),
    //   sharesInPercentage / 100,
    //   getInvestorsParticipationAfterCapping() * (sharesInPercentage / 100)
    // );

    // if (
    //   isWorthConverting(
    //     currentShareholder.payout.participation,
    //     invested * (cap - 1)
    //   )
    // ) {
    //   console.log(
    //     "its worth converting!!!!!!!!! WWWWWWWW",
    //     currentShareholder.title
    //   );
    // }
    // console.log(
    //   "but this is not the common stock?",
    //   getInvestorsParticipationAfterCapping(cappedInvestors, balance)
    // );
    return balance;
  }, commonStockSum);

  return {
    shareholders: calculateSharesinPercentage(shareholders),
    cappedInvestors
  };
};

const isWorthConverting = (profitsWithCapping, profitsWithoutCapping) =>
  profitsWithoutCapping > profitsWithCapping;

const getProfitsWithoutCapping = (
  cappedInvestors,
  balance,
  uncappedParticipationPercentage
) =>
  getInvestorsParticipationAfterCapping(cappedInvestors, balance) *
  (uncappedParticipationPercentage / 100);
