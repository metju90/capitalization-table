import React, { useState, useEffect, Fragment } from "react";
import { Row } from "styled-bootstrap-grid";
import { ResetData, Input, ContentCenter, Container } from "./skin";
import { cloneDeep } from "lodash";
import {
  shortNumber,
  getShareholdersDefaultData,
  calculateSharesinPercentage
} from "./utils";
import uuid from "uuid";
import Tile from "./components/Tile";
import Footer from "./components/Footer";
import Summary from "./components/Summery";

const defaultExit =
  new URL(window.location.href).searchParams.get("exit") || 25000000;
const defaultShareHoldersData = getShareholdersDefaultData();

const App = () => {
  const [exitValue, setExitValue] = useState(defaultExit);
  const [toggle, setToggle] = useState(false);
  const [cappedInvestors, setCappedInvestors] = useState([]);
  const [commonStockSum, setCommonStockSum] = useState(0);
  const [shareholders, setShareholders] = useState(
    cloneDeep(defaultShareHoldersData)
  );

  useEffect(() => {
    setCappedInvestors([]);
  }, exitValue);

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
            payout: { participation, isCapReached },
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

            // if investor converted, remove from capped list (if they are capped)
            // this needs major refactor!

            const isInvestorAlreadyCapped = cappedInvestors.find(
              i => i.title === shareholders[currentInvestorKey].title
            );

            if (isInvestorAlreadyCapped) {
              setCappedInvestors(
                cappedInvestors.filter(
                  i => i.title !== shareholders[currentInvestorKey].title
                )
              );
            }
            return balance;
          }

          // if there is less balance than investment
          if (balance <= invested * multiplier) {
            shareholders[currentInvestorKey].payout = {
              participation: 0,
              liquidationPreference: balance
            };

            balance = 0;
            setShareholders(shareholders);
          }
          const currentPayout = balance * sharesInPercentage;
          // console.log("NETX PAOUT ISSS ", sharesInPercentage, currentPayout);
          if (balance > sharesInPercentage * multiplier) {
            shareholders[currentInvestorKey].payout = {
              participation,
              liquidationPreference: invested * multiplier
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
            payout: { participation, liquidationPreference, isCapReached },
            sharesInPercentage,
            invested,
            cap,
            hasConvertedToCommonShare,
            multiplier,
            title
          } = shareholders[currentInvestorKey];

          // const isInvestorAlreadyCapped = cappedInvestors.find(
          //   i => i.title === title
          // );
          // if (isInvestorAlreadyCapped) {
          //   setCappedInvestors(cappedInvestors.filter(i => i.title == title));
          // }
          if (hasConvertedToCommonShare) {
            return balance;
          }
          const doesExceedCap =
            balance * (sharesInPercentage / 100) > invested * (cap - 1);
          console.log(
            "current capped investors>???? ",
            doesExceedCap,
            shareholders[currentInvestorKey].title,
            balance
          );
          console.log(sharesInPercentage / 100, invested * (cap - 1), balance);

          if (doesExceedCap) {
            console.log(
              "GET HER EONLY IN CASE OF CAP",
              shareholders[currentInvestorKey].title
            );
            shareholders[currentInvestorKey].payout = {
              liquidationPreference,
              // cap - 1 because liquidation preference is considered as x1.
              // Therefore adding I am reducing the preferrenced stock from
              // the cap.
              participation: invested * (cap - 1),
              isCapReached: true
            };

            // Add investors in the capp list
            // If they aren't already.
            const isInvestorAlreadyCapped = cappedInvestors.find(
              i => i.title === shareholders[currentInvestorKey].title
            );
            if (!isInvestorAlreadyCapped) {
              setCappedInvestors([
                shareholders[currentInvestorKey],
                ...cappedInvestors
              ]);
            }
            console.log("before!!!!! ", shareholders[currentInvestorKey].title);
            setShareholders(calculateSharesinPercentage(shareholders));
          }
          console.log("aaaa!!!", shortNumber(balance));

          if (doesExceedCap || hasConvertedToCommonShare) {
            investorsWhichExceedsCap.push(
              shareholders[currentInvestorKey].title
            );
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
            hasConvertedToCommonShare,
            participationPercentage
          } = shareholders[currentInvestorKey];
          console.log("dafuq>? ", investorsWhichExceedsCap);
          if (
            investorsWhichExceedsCap.includes(
              shareholders[currentInvestorKey].title
            )
          ) {
            return balance;
          }
          console.log(
            "ok now here!!",
            shareholders[currentInvestorKey].title,
            sharesInPercentage,
            balance * (sharesInPercentage / 100)
          );

          // Need to substract capped investors common share!
          const getCommonShareAfterCappers = () => {
            let cappedInvesorsCommonShares = 0;
            cappedInvestors.map(
              i => (cappedInvesorsCommonShares += i.payout.participation)
            );
            // console.log(
            //   "cappedInvesorsCommonShares ",
            //   cappedInvesorsCommonShares
            // );
            return balance - cappedInvesorsCommonShares;
          };
          console.log(
            "what are the numbers here??",
            cappedInvestors,
            balance,
            shareholders[currentInvestorKey].title,
            getCommonShareAfterCappers(),
            sharesInPercentage / 100,
            getCommonShareAfterCappers() * (sharesInPercentage / 100)
          );
          shareholders[currentInvestorKey].payout = {
            liquidationPreference,
            participation:
              getCommonShareAfterCappers() * (participationPercentage / 100)
          };

          return balance;
        }, commonStockSum);

        investorsWhichExceedsCap = [];
        // To reset the shares in % on each change.
        setShareholders(calculateSharesinPercentage(shareholders));
      }
    },
    [exitValue, toggle, commonStockSum, cappedInvestors]
  );
  console.log("isInvestorAlreadyCapped ??? ", cappedInvestors);
  const cappedParticipation = cappedInvestors.reduce((accumlator, i) => {
    return accumlator + i.payout.participation;
  }, 0);
  console.log(
    "da zobb ta capped investor",
    cappedInvestors,
    cappedParticipation
  );
  return (
    <Fragment>
      <Container>
        <ContentCenter alignItem="center">
          <Input
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
              setExitValue(defaultExit);
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
            {Object.keys(shareholders).map(key => {
              // If there are any capped investor, to disable
              // all but the capped ones.
              const props = {
                toggle,
                setToggle,
                shareholders,
                setShareholders,
                ...shareholders[key],
                setCappedInvestors,
                cappedInvestors
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
