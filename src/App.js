import React, { useState, useEffect } from "react";
import logo from "./logo.svg";
import { Col, Row, Container } from "styled-bootstrap-grid";

const investorsCommonVariables = {
  cap: null,
  multiplier: 1,
  participating: false,
  payout: {
    liquidationPreference: null,
    paricipation: null
  }
};

const defaultShareHolders = {
  founders: {
    title: "Founders",
    shares: 33.33,
    ...investorsCommonVariables // temporary
  },
  serie_a: {
    title: "Serie A",
    shares: 6.67,
    invested: 0.9,
    ...investorsCommonVariables
  },
  serie_b: {
    title: "Serie B",
    shares: 10,
    invested: 2.1,
    ...investorsCommonVariables
  },
  serie_c: {
    title: "Serie C",
    shares: 50,
    invested: 15,
    ...investorsCommonVariables
  }
};

const roundTwoDec = num => Math.round(num * 100) / 100;

const App = () => {
  const [exitValue, setExitValue] = useState("");
  const [shareholders, setShareholders] = useState(defaultShareHolders);
  useEffect(
    () => {
      if (exitValue) {
        let balanceFromExit;

        // Giving the venture investor their inital investment
        Object.keys(shareholders).reduce((balance, key) => {
          if (key === "founders") return balance;
          console.log("money left...", balance);
          balance = balance - shareholders[key].invested;
          // shareholders[key].payout =
          //   exitValue * (shareholders[key].shares / 100);
          shareholders[key].payout = {
            liquidationPreference:
              shareholders[key].invested * shareholders[key].multiplier
          };
          balanceFromExit = balance;
          return balance;
        }, exitValue);

        // Sharing the remaing balance between all shareholders
        // (assuming all share holders are participants without cap)
        if (balanceFromExit) {
          Object.keys(shareholders).reduce((balance, key) => {
            const {
              payout: { paricipation, liquidationPreference },
              shares
            } = shareholders[key];
            shareholders[key].payout = {
              liquidationPreference,
              paricipation: balance * (shares / 100)
            };
            console.log(
              "the final balance is.. ",
              key,
              balance * (shares / 100)
            );
            return balance;
          }, balanceFromExit);
        }
        setShareholders(shareholders);
      }
    },
    [exitValue]
  );

  return (
    <Container>
      <Row>
        <Col md={5}>
          {Object.keys(shareholders).map(key => {
            const {
              title,
              shares,
              payout: { liquidationPreference, paricipation }
            } = shareholders[key];
            return (
              <div>
                {`${title}: ${shares}%`}
                {liquidationPreference && (
                  <span>Payout LP: {liquidationPreference} </span>
                )}
                {paricipation && <span>Payout Par: {paricipation} </span>}
              </div>
            );
          })}
        </Col>
        <Col md={3}>
          <input
            value={exitValue}
            type="number"
            onChange={e => setExitValue(e.target.value)}
            placeholder="Exit value"
          />
        </Col>
      </Row>
    </Container>
  );
};

export default App;
