const investorsCommonVariables = {
  cap: 2,
  multiplier: 1,
  participating: true,
  payout: {
    liquidationPreference: 0,
    paricipation: 0
  }
};

export default {
  founders: {
    title: "Founders",
    shares: 33.33,
    participating: true,
    payout: {
      paricipation: 0
    }
  },
  serie_a: {
    title: "Serie A",
    shares: 6.67,
    invested: 900000,
    ...investorsCommonVariables
  },
  serie_b: {
    title: "Serie B",
    shares: 10,
    invested: 2100000,
    ...investorsCommonVariables
  },
  serie_c: {
    title: "Serie C",
    shares: 50,
    invested: 15000000,
    ...investorsCommonVariables
  }
};
