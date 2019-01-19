import React, { useState, useEffect, Fragment } from "react";
import { Col, Row } from "styled-bootstrap-grid";
import {
  ResetData,
  Input,
  Summary,
  ContentCenter,
  SmallText,
  Container
} from "./skin";
import { cloneDeep } from "lodash";
import {
  toShortDollar,
  getShareholdersDefaultData,
  calculateSharesinPercentage,
  sharesInPercentage
} from "./utils";
import Tile from "./components/Tile";
import uuid from "uuid";
import Footer from "./components/Footer";

const oneMillion = 1000000;
const twentyFiveMillion = 60000000;
const defaultShareHoldersData = getShareholdersDefaultData();
const wait = ms => {
  var start = Date.now(),
    now = start;
  while (now - start < ms) {
    now = Date.now();
  }
};
const App = () => {
  const [exitValue, setExitValue] = useState(twentyFiveMillion);
  const [toggle, setToggle] = useState(false);
  const [cappedInvestors, setCappedInvestors] = useState([]);
  const [commonStockSum, setCommonStockSum] = useState(0);
  const [shareholders, setShareholders] = useState(
    cloneDeep(defaultShareHoldersData)
  );
  // wait(5000);
  useEffect(
    () => {
      if (cappedInvestors) {
        console.log("<<<<!!!!>>>>>>> CAPPED INVESTOR <<<<!!!!>>>>>>>");
        console.log(cappedInvestors);
        console.log("<<<<!!!!>>>>>>> CAPPED INVESTOR <<<<!!!!>>>>>>>");
      }
    },
    [cappedInvestors]
  );
  useEffect(
    () => {
      // console.log("xi zobb", exitValue);
      let balanceFromExit;

      // Giving the venture investor their preference
      Object.keys(shareholders)
        .reverse() // To start from the latest Series
        .reduce((balance, currentInvestor) => {
          const {
            invested,
            multiplier,
            payout: { participation },
            title,
            sharesInPercentage,
            hasConvertedToCommonShare
          } = shareholders[currentInvestor];

          if (hasConvertedToCommonShare) {
            console.log("ok!!!! convertedd", currentInvestor);
            // shareholders[currentInvestor].payout.participation = 0;
            shareholders[currentInvestor].payout = {
              participation,
              liquidationPreference: 0
            };
            return balance;
          }

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
              liquidationPreference: hasConvertedToCommonShare ? 0 : balance
            };
            balance = 0;
          }
          const currentPayout = balance * sharesInPercentage;
          // console.log("NETX PAOUT ISSS ", sharesInPercentage, currentPayout);
          if (balance > sharesInPercentage * multiplier) {
            // console.log(
            //   "wtf is hapenning here??? ",
            //   toShortDollar(invested * multiplier)
            // );
            shareholders[currentInvestor].payout = {
              participation,
              liquidationPreference:
                shareholders[currentInvestor].invested *
                shareholders[currentInvestor].multiplier
            };
            balance = balance - invested * multiplier;
          }
          console.log("wtf is the balance?!?!?!", balance);
          setCommonStockSum(balance);
          return balance;
        }, exitValue);

      setShareholders(shareholders);

      // ugly hack to reset founders payout if there is no balance left
      if (!commonStockSum) {
        // console.log(shareholders, shareholders.founders);
        shareholders[0].payout.participation = 0;
      }
      console.log("common stock is... ", commonStockSum);
      // Sharing the  common stock balance between all shareholders
      if (commonStockSum) {
        let investorsWhichExceedsCap = [];
        /**
         *  Checks for capped one first
         */
        Object.keys(shareholders).reduce((balance, currentInvestor, key) => {
          const {
            payout: { participation, liquidationPreference },
            sharesInPercentage,
            invested,
            cap,
            isParticipating,
            hasConvertedToCommonShare
          } = shareholders[currentInvestor];

          if (hasConvertedToCommonShare) {
            return balance;
          }
          const doesExceedCap =
            (liquidationPreference + balance) * (sharesInPercentage / 100) >
            invested * cap;
          console.log("current capped investors>???? ", doesExceedCap, balance);

          if (doesExceedCap) {
            shareholders[currentInvestor].payout = {
              liquidationPreference,
              participation: isParticipating ? invested * cap : 0,
              isCapReached: true
            };
            // cappedInvestors.push(shareholders[currentInvestor]);
            const isInvestorAlreadyCapped = cappedInvestors.find(
              i => i.title === shareholders[currentInvestor].title
            );
            console.log("how many times here??? ----");
            if (!isInvestorAlreadyCapped) {
              setCappedInvestors([
                shareholders[currentInvestor],
                ...cappedInvestors
              ]);
              console.log("how many times here??? ", cappedInvestors);
            }
            calculateSharesinPercentage(shareholders);
          }
          console.log("aaaa!!!", toShortDollar(balance));

          if (
            doesExceedCap ||
            (!isParticipating && !hasConvertedToCommonShare)
          ) {
            investorsWhichExceedsCap.push(currentInvestor);
          }

          if (!isParticipating) {
            return (balance = balance * (sharesInPercentage / 100));
          }
          return balance;
        }, commonStockSum);

        /**
         *  Uncapped, split the sharesInPercentage of the capped
         *
         */
        Object.keys(shareholders).reduce((balance, currentInvestor) => {
          const {
            payout: { participation, liquidationPreference },
            sharesInPercentage,
            invested,
            cap,
            isParticipating,
            hasConvertedToCommonShare
          } = shareholders[currentInvestor];
          if (investorsWhichExceedsCap.includes(currentInvestor))
            return balance;
          // Check for any capped investors and change the shareholding
          if (investorsWhichExceedsCap.length && !hasConvertedToCommonShare) {
            investorsWhichExceedsCap.forEach(cappedInvestor => {
              // console.log("looping through capped investors");
              shareholders[currentInvestor].sharesInPercentage +=
                shareholders[cappedInvestor].sharesInPercentage *
                (sharesInPercentage / 100);
            });
          }
          console.log(
            "hi ther!!!",
            currentInvestor,
            isParticipating,
            shareholders[currentInvestor].sharesInPercentage
          );
          shareholders[currentInvestor].payout = {
            liquidationPreference,
            participation: isParticipating
              ? balance *
                (shareholders[currentInvestor].sharesInPercentage / 100)
              : 0
          };
          if (!isParticipating) {
            balance =
              balance *
              (shareholders[currentInvestor].sharesInPercentage / 100);
            balanceFromExit = balance;
            setShareholders(shareholders);
          }
          return balance;
        }, commonStockSum);

        investorsWhichExceedsCap = [];
        setShareholders(shareholders);
      }
    },
    [exitValue, toggle, commonStockSum, cappedInvestors]
  );
  console.log("isInvestorAlreadyCapped ??? ", cappedInvestors);
  return (
    <Fragment>
      <Container>
        <ContentCenter alignItem="center">
          <Input
            isExitInput
            value={exitValue}
            step={1000000}
            type="number"
            onChange={e => setExitValue(e.target.value)}
            placeholder="Exit value"
          />
          <ResetData
            onClick={() => {
              setShareholders(cloneDeep(defaultShareHoldersData));
              setCappedInvestors([]);
              setExitValue(twentyFiveMillion);
              setToggle(!toggle);
            }}
          >
            Reset
          </ResetData>
        </ContentCenter>
        <ContentCenter>
          <Summary>
            <div>
              <h3>Exit value</h3> <big>{toShortDollar(exitValue)}</big>
            </div>
            <div>
              <h3>Preffered Stocks:</h3>
              <strong>{toShortDollar(exitValue - commonStockSum)}</strong>
              <SmallText>Stocks in cash:</SmallText>
            </div>
            <div>
              <h3>Common stock:</h3>
              <strong>{toShortDollar(commonStockSum)}</strong>
              <SmallText>Stocks in cash:</SmallText>
            </div>
          </Summary>
        </ContentCenter>
        <Row>
          <ContentCenter>
            {Object.keys(shareholders).map(key => {
              // If there are any capped investor, to disable
              // all but the capped ones.
              const props = {
                toggle,
                setToggle,
                shareholders,
                setShareholders,
                ...shareholders[key]
              };
              return <Tile key={uuid()} currentStakeholder={key} {...props} />;
            })}
          </ContentCenter>
        </Row>
      </Container>
      <Footer />
    </Fragment>
  );
};

export default App;
