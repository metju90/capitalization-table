import React, { useState, useEffect } from "react";
import logo from "./logo.svg";
import { Col, Row, Container } from "styled-bootstrap-grid";
import { Investor, SmallText } from "./style";

const investorsCommonVariables = {
  cap: 2,
  multiplier: 1,
  participating: true,
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
        Object.keys(shareholders)
          .reverse() // To start from the latest Series
          .reduce((balance, key) => {
            if (key === "founders") return balance;
            // console.log("money left...", key, balance);
            balance = balance - shareholders[key].invested;
            // shareholders[key].payout =
            //   exitValue * (shareholders[key].shares / 100);
            // const
            shareholders[key].payout = {
              liquidationPreference:
                shareholders[key].invested * shareholders[key].multiplier
            };
            balanceFromExit = balance;
            return balance;
          }, exitValue);
        console.log(
          ">>>>>>  balance left after investors take init invest",
          balanceFromExit
        );
        // Sharing the remaing balance between all shareholders
        // (assuming all share holders are participants without cap)
        if (balanceFromExit) {
          const investorsWithExceededCap = [];
          Object.keys(shareholders).reduce((balance, key) => {
            const {
              payout: { paricipation, liquidationPreference },
              shares,
              invested,
              cap
            } = shareholders[key];

            const doesExceedCap =
              liquidationPreference + balance * (shares / 100) > invested * cap;
            if (doesExceedCap) {
              investorsWithExceededCap.push(shareholders[key]);
              console.log("!!!doesExceedCap ", key, doesExceedCap);
              console.log(
                "the difference is... ",
                liquidationPreference +
                  balance * (shares / 100) -
                  invested * cap
              );
              balance +=
                liquidationPreference +
                balance * (shares / 100) -
                invested * cap;
            }
            shareholders[key].payout = {
              liquidationPreference,
              paricipation: doesExceedCap
                ? invested * cap
                : balance * (shares / 100),
              isCapReached: doesExceedCap
            };
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
      <h2>Seniority Structure: Standard</h2>
      <Row>
        <Col md={5}>
          {Object.keys(shareholders).map(key => {
            const {
              title,
              shares,
              payout: { liquidationPreference, paricipation, isCapReached }
            } = shareholders[key];
            return (
              <Investor>
                {`${title}: ${shares}%`}
                {liquidationPreference && (
                  <div>Payout LP: {liquidationPreference} </div>
                )}
                {paricipation && (
                  <div>
                    Payout Par: {paricipation}{" "}
                    {isCapReached && <SmallText>(Capped)</SmallText>}{" "}
                  </div>
                )}
              </Investor>
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
