import React, { useState, useEffect, useReducer, Fragment } from "react";
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
  SHAREHOLDERS,
  EXIT_VALUE,
  PREFERRED_STOCK
} from "./constants";

const App = () => {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
  const [callPreferredStock, setCallPreferredStock] = useState(false);
  const { exitValue, cappedInvestors, commonStockSum, shareholders } = state;
  console.log(">>> RETURN FROM DISPATCH ", { ...state });

  useEffect(
    () => {
      dispatch({
        type: PREFERRED_STOCK,
        payload: { shareholders, exitValue }
      });
    },
    [exitValue]
  );

  useEffect(
    () => {
      dispatch({
        type: SHAREHOLDERS,
        payload: { shareholders, cappedInvestors, commonStockSum }
      });
    },
    [commonStockSum]
  );

  console.log("capped pariticpation ", cappedInvestors);
  const cappedParticipation = cappedInvestors.reduce((accumlator, i) => {
    return accumlator + i.payout.participation;
  }, 0);

  return (
    <Fragment>
      <Container>
        <ContentCenter alignItem="center">
          <Input
            value={exitValue}
            step={1.0e6}
            type="number"
            onChange={e =>
              dispatch({ type: EXIT_VALUE, payload: e.target.value })
            }
            placeholder="Exit value"
          />
          <ResetData
            onClick={() => {
              dispatch({
                type: "shareholders",
                payload: DEFAULT_SHAREHOLDERS_DATA
              });
              dispatch({
                type: "cappedInvestors",
                payload: []
              });
              dispatch({
                type: "exitValue",
                payload: DEFAULT_EXIT_VALUE
              });
            }}
          >
            Reset
          </ResetData>
        </ContentCenter>
        <ContentCenter>
          <Summary
            exitValue={exitValue}
            commonStockSum={commonStockSum}
            cappedParticipation={cappedParticipation}
          />
        </ContentCenter>
        <Row>
          <ContentCenter>
            {shareholders.map(s => {
              // If there are any capped investor, to disable
              // all but the capped ones.
              console.log("hey there!!!! ", s);
              const props = {
                currentShareHolder: s,
                cappedInvestors,
                dispatch,
                callPreferredStock,
                setCallPreferredStock
              };
              return <Tile key={uuid()} {...props} />;
            })}
          </ContentCenter>
        </Row>
      </Container>
      <Footer />
    </Fragment>
  );
};

export default App;
