export default (cappedInvestors, balance) => {
  let cappedInvesorsCommonShares = 0;
  if (cappedInvestors) {
    cappedInvestors.map(
      i => (cappedInvesorsCommonShares += i.payout.participation)
    );
  }
  // console.log("WWWWWW", cappedInvestors, cappedInvesorsCommonShares);
  return balance - cappedInvesorsCommonShares;
};
