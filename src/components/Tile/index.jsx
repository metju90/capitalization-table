import React, { Fragment } from "react";
import { shortNumber } from "../../utils";
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
  shares,
  payout: { liquidationPreference, participation, isCapReached },
  invested,
  cap,
  multiplier,
  shareholders,
  setShareholders,
  currentStakeholder,
  toggle,
  setToggle,
  hasConvertedToCommonShare,
  participationPercentage
}) => {
  const isFounder = title === "Founders";
  return (
    <ShareHolder>
      <Title>{title}</Title>
      <DataRow>
        <span>Shares:</span>
        <Data textAlign="right">
          <SmallText>({sharesInPercentage}%)</SmallText>
          {shortNumber(shares)}
        </Data>
      </DataRow>
      <DataRow>
        <span>Investment:</span> <Data>${shortNumber(invested)}</Data>
      </DataRow>
      {!isFounder && (
        <DataRow>
          <span style={{ paddingRight: "5px" }}>Liquidation Preference:</span>
          <Data
            color={
              liquidationPreference < invested && !hasConvertedToCommonShare
                ? "danger"
                : "success"
            }
          >
            ${shortNumber(liquidationPreference)}
          </Data>
        </DataRow>
      )}
      <DataRow>
        <span>Participation:</span>
        <Data textAlign="right">
          {!isCapReached && <SmallText>({participationPercentage}%)</SmallText>}
          ${shortNumber(participation)}
        </Data>
      </DataRow>
      {!isFounder && (
        <VariablesWrapper>
          {hasConvertedToCommonShare && <GreyOverlay />}
          <Variable>
            <span>Cap:</span>
            <UserInteractionWrapper>
              <RemoveButton
                isDisabled={cap < 3}
                onClick={() => {
                  shareholders[currentStakeholder].cap = cap - 1;
                  setShareholders(shareholders);
                  setToggle(!toggle);
                }}
              >
                -
              </RemoveButton>
              <UserInputNumber>x{cap}</UserInputNumber>
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
            <span>Multiplier:</span>
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
              <UserInputNumber>x{multiplier}</UserInputNumber>
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
          <div>
            {!hasConvertedToCommonShare && isCapReached && (
              <Fragment>
                <SmallText isCappMessaged>
                  <strong>Capped limited Reached.</strong>
                  <div>
                    You can either retain your preferred stock or convert them
                    to common.
                  </div>
                </SmallText>
                <ConvertButton
                  title={
                    hasConvertedToCommonShare
                      ? "Convert back to preferred stocks"
                      : " Convert to common stocks"
                  }
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
              </Fragment>
            )}
          </div>
        </VariablesWrapper>
      )}
    </ShareHolder>
  );
};

export default Tile;
