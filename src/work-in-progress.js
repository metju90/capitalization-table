// Giving the venture investor the preference
const workoutInvestorsPreferences = ({ shareholders, setShareholders }) =>
  Object.keys(shareholders)
    .reverse() // To start from the latest Series
    .reduce((balance, currentInvestor) => {
      if (currentInvestor === "founders") return balance;
      const {
        invested,
        multiplier,
        payout: { participation }
      } = shareholders[currentInvestor];

      if (balance === 0) {
        shareholders[currentInvestor].payout = {
          liquidationPreference: 0,
          participation
        };
      }
      // if there is less balance than investment
      if (balance <= invested * multiplier) {
        shareholders[currentInvestor].payout = {
          participation: 0,
          liquidationPreference: balance
        };
        balance = 0;
      }
      if (balance > invested * multiplier) {
        shareholders[currentInvestor].payout = {
          participation,
          liquidationPreference:
            shareholders[currentInvestor].invested *
            shareholders[currentInvestor].multiplier
        };
        console.log("suppost hawn...");
        balance = balance - invested * multiplier;
      }

      balanceFromExit = balance;
      return balance;
    }, exitValue);

setShareholders(shareholders);
