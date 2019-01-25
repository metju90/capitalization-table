import React, { useEffect, useReducer } from "react";
import { Row } from "styled-bootstrap-grid";
import uuid from "uuid";
import { ResetData, Input, ContentCenter, Container } from "./skin";
import Tile from "./components/Tile";
import Footer from "./components/Footer";
import Summary from "./components/Summery";
import { shareholdersReducer as reducer } from "./reducers";
import {
  DEFAULT_SHAREHOLDERS_DATA,
  INITIAL_STATE,
  DEFAULT_EXIT_VALUE,
  PREFERRED_STOCK
} from "./constants";
import Dispatch from "./context";
import { mainCalculator } from "./actions";

const App = () => {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
  const {
    exitValue,
    cappedInvestors,
    commonStockSum,
    shareholders,
    reCalculate
  } = state;

  // to be executed when component mounts and when `reCalculate` changes
  useEffect(
    () => {
      mainCalculator(dispatch, { shareholders, exitValue });
    },
    [reCalculate]
  );

  const uncappedStock =
    cappedInvestors.reduce((accumulatedCap, i) => {
      return accumulatedCap + i.payout.participation;
    }, 0) - commonStockSum;

  return (
    <Dispatch.Provider value={dispatch}>
      <Container>
        <ContentCenter alignItem="center">
          <Input
            value={exitValue}
            step={1.0e6}
            type="number"
            onChange={e =>
              mainCalculator(dispatch, {
                shareholders,
                exitValue: e.target.value
              })
            }
            placeholder="Exit value"
          />
          <ResetData
            onClick={() =>
              mainCalculator(dispatch, {
                shareholders: DEFAULT_SHAREHOLDERS_DATA,
                exitValue: DEFAULT_EXIT_VALUE
              })
            }
          >
            Reset
          </ResetData>
        </ContentCenter>
        <ContentCenter>
          <Summary
            exitValue={exitValue}
            commonStockSum={commonStockSum}
            uncappedStock={uncappedStock}
          />
        </ContentCenter>
        <Row>
          <ContentCenter>
            {shareholders.map(s => (
              <Tile key={uuid()} {...s} />
            ))}
          </ContentCenter>
        </Row>
      </Container>
      <Footer />
    </Dispatch.Provider>
  );
};

export default App;
