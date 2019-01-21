import { calculateSharesinPercentage } from "../utils";

export function reducer(state, action) {
  switch (action.type) {
    case "reset": {
      return action.payload;
    }
    case "exitValue": {
      return {
        ...state,
        exitValue: action.payload
      };
    }
    case "preferredStock": {
      const { shareholders, cappedInvestors, exitValue } = action.payload;
      console.log("the state is?? ", state);
      const newCappedInvestors = [];
      let x = 0;

      shareholders
        // .reverse() // To start from the latest investors
        .reduce((balance, currentShareholder) => {
          const {
            invested,
            multiplier,
            payout: { participation, isCapReached },
            sharesInPercentage,
            hasConvertedToCommonShare
          } = currentShareholder;
          if (hasConvertedToCommonShare) {
            console.log("ok!!!! convertedd", currentShareholder);
            currentShareholder.payout = {
              participation,
              liquidationPreference: 0
            };

            // if investor converted, remove from capped list (if they are capped)
            // this needs major refactor!

            const isInvestorAlreadyCapped = cappedInvestors.find(
              i => i.title === currentShareholder.title
            );

            if (isInvestorAlreadyCapped) {
              newCappedInvestors.push(currentShareholder);
            }
            return balance;
          }

          // if there is less balance than investment
          if (balance <= invested * multiplier) {
            currentShareholder.payout = {
              participation: 0,
              liquidationPreference: balance
            };

            balance = 0;
            // setShareholders(shareholders);
          }
          const currentPayout = balance * sharesInPercentage;
          // console.log("NETX PAOUT ISSS ", sharesInPercentage, currentPayout);
          if (balance > sharesInPercentage * multiplier) {
            currentShareholder.payout = {
              participation,
              liquidationPreference: invested * multiplier
            };
            balance = balance - invested * multiplier;
          }
          // setCommonStockSum(balance);
          x = balance;
          return balance;
        }, exitValue);
      console.log("before turn ", x, {
        ...state,
        commonStockSum: x,
        shareholders,
        cappedInvestors: newCappedInvestors,
        exitValue
      });
      return {
        ...state,
        commonStockSum: x,
        shareholders,
        cappedInvestors: newCappedInvestors,
        exitValue
      };
    }
    case "shareholders":
    case "theThree": {
      const shareholders = state.shareholders.map(s => {
        if (s.title === action.payload.title) {
          return action.payload;
        }
        return s;
      });
      let { commonStockSum } = action.payload;
      const { cappedInvestors } = action.payload;
      console.log("test!!!  in secon one!", action.payload);

      let investorsWhichExceedsCap = [];
      /**
       *  Checks for capped one first
       */
      shareholders.reduce((balance, currentShareholder) => {
        const {
          payout: { participation, liquidationPreference, isCapReached },
          sharesInPercentage,
          invested,
          cap,
          hasConvertedToCommonShare,
          multiplier,
          title
        } = currentShareholder;

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

      /**
       *  Uncapped, split the sharesInPercentage of the capped
       *
       */
      shareholders.reduce((balance, currentShareholder) => {
        const {
          payout: { participation, liquidationPreference },
          sharesInPercentage,
          invested,
          cap,
          hasConvertedToCommonShare,
          participationPercentage
        } = currentShareholder;
        // console.log("dafuq>? ", investorsWhichExceedsCap);
        if (investorsWhichExceedsCap.includes(currentShareholder.title)) {
          return balance;
        }
        console.log(
          "uncapped stage",
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
            getCommonShareAfterCappers() * (participationPercentage / 100)
        };
        console.log("but this is not the common stock?", commonStockSum);
        return balance;
      }, commonStockSum);
      return {
        ...state,
        shareholders: calculateSharesinPercentage(action.payload.shareholders)
      };
    }
    default: {
      return state;
    }
  }
}
