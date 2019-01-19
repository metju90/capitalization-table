import React, { Fragment } from "react";
import { toShortDollar } from "../../utils";
import {
  ShareHolder,
  AddButton,
  RemoveButton,
  Variable,
  VariablesWrapper,
  DataRow,
  Data,
  Title,
  UserInputNumber,
  UserInteractionWrapper,
  ConvertButton,
  GreyOverlay
} from "./skin";
import { SmallText, Input } from "../../skin";

const Tile = ({
  title,
  sharesInPercentage,
  payout: { liquidationPreference, participation, isCapReached },
  invested,
  cap,
  multiplier,
  isParticipating,
  shareholders,
  setShareholders,
  currentStakeholder,
  toggle,
  setToggle,
  hasConvertedToCommonShare
}) => {
  const isFounders = title === "Founders";
  return (
    <ShareHolder>
      <Title>{title}</Title>
      <DataRow>
        <span>Shareholding:</span> <Data>{sharesInPercentage}%</Data>
      </DataRow>

      <DataRow>
        <span>Investment:</span> <Data>{toShortDollar(invested)}</Data>
      </DataRow>
      {!isFounders && (
        <DataRow>
          <span style={{ paddingRight: "5px" }}>Liquidation Preference:</span>
          <Data
            color={
              liquidationPreference < invested && !hasConvertedToCommonShare
                ? "danger"
                : "success"
            }
          >
            {toShortDollar(liquidationPreference)}
          </Data>
        </DataRow>
      )}
      <DataRow>
        <span>Participation:</span>
        <Data>{toShortDollar(participation)}</Data>
      </DataRow>
      {!isFounders && (
        <VariablesWrapper>
          {hasConvertedToCommonShare && <GreyOverlay />}
          <Variable>
            <span>Cap:</span>
            <UserInteractionWrapper>
              <RemoveButton
                isDisabled={cap < 2}
                onClick={() => {
                  shareholders[currentStakeholder].cap = cap - 1;
                  setShareholders(shareholders);
                  setToggle(!toggle);
                }}
              >
                -
              </RemoveButton>
              <UserInputNumber>{cap}</UserInputNumber>
              <AddButton
                onClick={() => {
                  shareholders[currentStakeholder].cap = cap + 1;
                  setShareholders(shareholders);
                  setToggle(!toggle);
                }}
              >
                +
              </AddButton>
            </UserInteractionWrapper>
          </Variable>
          <Variable>
            <span>multiplier:</span>
            <UserInteractionWrapper>
              <RemoveButton
                isDisabled={multiplier < 2}
                onClick={() => {
                  shareholders[currentStakeholder].multiplier = multiplier - 1;
                  setShareholders(shareholders);
                  setToggle(!toggle);
                }}
              >
                -
              </RemoveButton>
              <UserInputNumber>{multiplier}</UserInputNumber>
              <AddButton
                onClick={() => {
                  shareholders[currentStakeholder].multiplier = multiplier + 1;
                  setShareholders(shareholders);
                  setToggle(!toggle);
                }}
              >
                +
              </AddButton>
            </UserInteractionWrapper>
          </Variable>
          <Variable>
            <span>Participation:</span>
            <div>
              <input
                type="radio"
                onChange={e => {
                  shareholders[currentStakeholder].isParticipating = true;
                  setShareholders(shareholders);
                  setToggle(!toggle);
                }}
                name={`isParticipating-${currentStakeholder}`}
                checked={isParticipating}
              />
              <label>Yes</label>
              <input
                type="radio"
                onChange={e => {
                  console.log("aaa");
                  shareholders[currentStakeholder].isParticipating = false;
                  setShareholders(shareholders);
                  setToggle(!toggle);
                }}
                name={`isParticipating-${currentStakeholder}`}
                checked={!isParticipating}
              />
              <label>No</label>
            </div>
          </Variable>
          <Variable />

          <div>
            <SmallText minHeight="52px">
              {!hasConvertedToCommonShare && (
                <Fragment>
                  <strong>Capped limited Reached.</strong>
                  <div>
                    You can either retain your preferred stock or convert them
                    to common.
                  </div>
                </Fragment>
              )}
            </SmallText>
            <ConvertButton
              hasConverted={hasConvertedToCommonShare}
              onClick={() => {
                shareholders[
                  currentStakeholder
                ].hasConvertedToCommonShare = !hasConvertedToCommonShare;
                shareholders[
                  currentStakeholder
                ].payout.isCapReached = !hasConvertedToCommonShare;
                setShareholders(shareholders);
                setToggle(!toggle);
              }}
            >
              {hasConvertedToCommonShare ? "Switch back" : "Convert Now!"}
            </ConvertButton>
          </div>
        </VariablesWrapper>
      )}
    </ShareHolder>
  );
};

export default Tile;
