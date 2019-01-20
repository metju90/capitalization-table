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
const twentyFiveMillion = 25000000;
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
      // Giving the venture investor their preference
      // from the exit money.
      Object.keys(shareholders)
        .reverse() // To start from the latest investors
        .reduce((balance, currentInvestorKey) => {
          const {
            invested,
            multiplier,
            payout: { participation },
            sharesInPercentage,
            hasConvertedToCommonShare
          } = shareholders[currentInvestorKey];
          // If an investor opted to convert to common stocks,
          // Do nothing and go to the next investor.
          if (hasConvertedToCommonShare) {
            console.log("ok!!!! convertedd", currentInvestorKey);
            shareholders[currentInvestorKey].payout = {
              participation,
              liquidationPreference: 0
            };
            return balance;
          }

          // If no more money left from the exit sum
          if (balance === 0) {
            shareholders[currentInvestorKey].payout = {
              liquidationPreference: 0,
              participation
            };
          }
          // if there is less balance than investment
          if (balance <= invested * multiplier) {
            shareholders[currentInvestorKey].payout = {
              participation: 0,
              liquidationPreference: balance
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
            shareholders[currentInvestorKey].payout = {
              participation,
              liquidationPreference:
                shareholders[currentInvestorKey].invested *
                shareholders[currentInvestorKey].multiplier
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
        Object.keys(shareholders).reduce((balance, currentInvestorKey) => {
          const {
            payout: { participation, liquidationPreference },
            sharesInPercentage,
            invested,
            cap,
            isParticipating,
            hasConvertedToCommonShare,
            multiplier
          } = shareholders[currentInvestorKey];

          if (hasConvertedToCommonShare) {
            return balance;
          }
          const doesExceedCap =
            (liquidationPreference + balance) * (sharesInPercentage / 100) >
            invested * (cap - 1);
          console.log("current capped investors>???? ", doesExceedCap, balance);

          if (doesExceedCap) {
            shareholders[currentInvestorKey].payout = {
              liquidationPreference,
              // cap - 1 because liquidation preference is considered as x1.
              // Therefore adding I am reducing the preferrenced stock from
              // the cap.
              participation: isParticipating ? invested * (cap - 1) : 0,
              isCapReached: true
            };
            // cappedInvestors.push(shareholders[currentInvestorKey]);
            const isInvestorAlreadyCapped = cappedInvestors.find(
              i => i.title === shareholders[currentInvestorKey].title
            );
            console.log("how many times here??? ----");
            if (!isInvestorAlreadyCapped) {
              setCappedInvestors([
                shareholders[currentInvestorKey],
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
            investorsWhichExceedsCap.push(currentInvestorKey);
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
        Object.keys(shareholders).reduce((balance, currentInvestorKey) => {
          const {
            payout: { participation, liquidationPreference },
            sharesInPercentage,
            invested,
            cap,
            isParticipating,
            hasConvertedToCommonShare
          } = shareholders[currentInvestorKey];
          if (investorsWhichExceedsCap.includes(currentInvestorKey))
            return balance;
          // Check for any capped investors and change the shareholding
          if (investorsWhichExceedsCap.length && !hasConvertedToCommonShare) {
            investorsWhichExceedsCap.forEach(cappedInvestor => {
              // console.log("looping through capped investors");
              // shareholders[currentInvestorKey].sharesInPercentage +=
              //   shareholders[cappedInvestor].sharesInPercentage *
              //   (sharesInPercentage / 100);
            });
          }
          console.log(
            "hi ther!!!",
            currentInvestorKey,
            isParticipating,
            shareholders[currentInvestorKey].sharesInPercentage
          );
          shareholders[currentInvestorKey].payout = {
            liquidationPreference,
            participation: isParticipating
              ? balance *
                (shareholders[currentInvestorKey].sharesInPercentage / 100)
              : 0
          };
          if (!isParticipating) {
            balance =
              balance *
              (shareholders[currentInvestorKey].sharesInPercentage / 100);
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
