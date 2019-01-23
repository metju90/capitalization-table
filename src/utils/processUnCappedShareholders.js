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

    const doesExceedCap =
      balance * (sharesInPercentage / 100) > invested * (cap - 1);

    if (doesExceedCap) {
      const isWorth = isWorthConverting(
        participation + liquidationPreference,
        getProfitsWithoutCapping(
          cappedInvestors,
          balance,
          uncappedParticipationPercentage
        )
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

    if (investorsWhichExceedsCap.includes(currentShareholder.title)) {
      return balance;
    }

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
