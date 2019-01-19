import React, { useState, useEffect, Fragment } from "react";
import { Col, Row } from "styled-bootstrap-grid";
import {
  ResetData,
  Input,
  ExitValueTitle,
  ContentCenter,
  SmallText,
  Container
} from "./skin";
import { cloneDeep } from "lodash";
import {
  toShortNumber,
  getShareholdersDefaultData,
  calculateSharesinPercentage
} from "./utils";
import Tile from "./components/Tile";
import uuid from "uuid";
import Footer from "./components/Footer";

const oneMillion = 1000000;
const twentyFiveMillion = 25000000;
const defaultShareHoldersData = getShareholdersDefaultData();

const App = () => {
  const [exitValue, setExitValue] = useState(twentyFiveMillion);
  const [toggle, setToggle] = useState(false);
  const [cappedInvestors, setCappedInvestors] = useState();
  const [shareholders, setShareholders] = useState(
    cloneDeep(defaultShareHoldersData)
  );

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
      // console.log("testing!!!");
      if (exitValue != "aaaaa") {
        // console.log("xi zobb", exitValue);
        let balanceFromExit;

        // Giving the venture investor their preference
        Object.keys(shareholders)
          .reverse() // To start from the latest Series
          .reduce((balance, currentInvestor) => {
            const {
              invested,
              multiplier,
              payout: { participation }
            } = shareholders[currentInvestor];

            if (currentInvestor === "founders") {
              shareholders[currentInvestor].payout.participation = 0;
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
                liquidationPreference: balance
              };
              balance = 0;
            }
            if (balance > invested * multiplier) {
              shareholders[currentInvestor].payout = {
                participation,
                liquidationPreference:
                  shareholders[currentInvestor].invested *
                  shareholders[currentInvestor].multiplier
              };
              console.log("suppost hawn...");
              balance = balance - invested * multiplier;
            }

            balanceFromExit = balance;
            return balance;
          }, exitValue);

        setShareholders(shareholders);

        // ugly hack to reset founders payout if there is no balance left
        if (!balanceFromExit) {
          // console.log(shareholders, shareholders.founders);
          shareholders[0].payout.participation = 0;
        }
        // console.log("!!!!", balanceFromExit);
        // Sharing the remaing balance between all shareholders
        // (assuming all share holders are participants without cap)
        if (balanceFromExit) {
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
              isParticipating
            } = shareholders[currentInvestor];
            const doesExceedCap =
              liquidationPreference + balance * (sharesInPercentage / 100) >
              invested * cap;

            if (doesExceedCap) {
              shareholders[currentInvestor].payout = {
                liquidationPreference,
                participation: isParticipating ? invested * (cap - 1) : 0,
                isCapReached: true
              };
              // cappedInvestors.push(shareholders[currentInvestor]);
              console.log("current capped investors>???? ", cappedInvestors);
              setCappedInvestors([
                shareholders[currentInvestor],
                { ...cappedInvestors }
              ]);
              calculateSharesinPercentage(shareholders);
            }

            if (doesExceedCap || !isParticipating) {
              investorsWhichExceedsCap.push(currentInvestor);
            }

            if (!isParticipating) {
              return (balance = balance * (sharesInPercentage / 100));
            }
            return balance;
          }, balanceFromExit);

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
              isParticipating
            } = shareholders[currentInvestor];
            if (investorsWhichExceedsCap.includes(currentInvestor))
              return balance;
            // Check for any capped investors and change the shareholding
            if (investorsWhichExceedsCap.length) {
              investorsWhichExceedsCap.forEach(cappedInvestor => {
                console.log("looping through capped investors");
                shareholders[currentInvestor].sharesInPercentage +=
                  shareholders[cappedInvestor].sharesInPercentage *
                  (sharesInPercentage / 100);
              });
            }
            console.log(
              currentInvestor,
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
          }, balanceFromExit);
          //console.log("hey there", investorsWhichExceedsCap);
          investorsWhichExceedsCap = [];
          setShareholders(shareholders);
        }
      } else {
        setShareholders(cloneDeep(defaultShareHoldersData));
      }
    },
    [exitValue, toggle]
  );

  return (
    <Fragment>
      <Container>
        <SmallText>Seniority Structure: Standard</SmallText>
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
              setExitValue(twentyFiveMillion);
              setToggle(!toggle);
            }}
          >
            Reset
          </ResetData>
        </ContentCenter>
        <ContentCenter>
          <ExitValueTitle>
            Exit value <big>{toShortNumber(exitValue)}</big>
          </ExitValueTitle>
        </ContentCenter>
        <Row>
          <ContentCenter>
            {Object.keys(shareholders).map(key => (
              <Tile
                key={uuid()}
                toggle={toggle}
                setToggle={setToggle}
                currentStakeholder={key}
                {...shareholders[key]}
                shareholders={shareholders}
                setShareholders={setShareholders}
              />
            ))}
          </ContentCenter>
        </Row>
      </Container>
      <Footer />
    </Fragment>
  );
};

export default App;
