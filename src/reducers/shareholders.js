import { calculateSharesinPercentage, preferredAndCommonStock } from "../utils";

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
      const [updatedShareholders, commonStockSum] = preferredAndCommonStock(
        shareholders,
        exitValue
      );

      return {
        ...state,
        commonStockSum,
        // Reverse back to the default order
        shareholders: updatedShareholders,
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
          uncappedParticipationPercentage
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
            getCommonShareAfterCappers() * (uncappedParticipationPercentage / 100)
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
