export function reducer(state, action) {
  switch (action.type) {
    case "reset":
      return action.payload;
    case "updateAll":
      action.payload.sort(function(a, b) {
        if (a.title < b.title) {
          return -1;
        }
        if (a.title > b.title) {
          return 1;
        }
        return 0;
      });
      return action.payload  
    case "update":
      const shareholders = state.map(s => {
        if (s.title === action.payload.title) return action.payload;
        return s;
      });
      shareholders.sort(function(a, b) {
        if (a.title < b.title) {
          return -1;
        }
        if (a.title > b.title) {
          return 1;
        }
        return 0;
      });
      // console.log("in rdecuer!! ", action.payload, shareholders);
      return shareholders;
    default:
      // A reducer must always return a valid state.
      // Alternatively you can throw an error if an invalid action is dispatched.
      return state;
  }
}
