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
import { SmallText } from "../Summery/skin";
import ToolTip from "../Summery/tooltip";

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
  participationPercentage,
  setCappedInvestors,
  cappedInvestors
}) => {
  const isFounder = title === "Founders";
  return (
    <ShareHolder>
      <Title>{title}</Title>
      <DataRow>
        <ToolTip message="Shares held by the shareholder" />
        <span>Shares:</span>
        <Data textAlign="right">
          <SmallText>({sharesInPercentage}%)</SmallText>
          {shortNumber(shares)}
        </Data>
      </DataRow>
      <DataRow>
        <ToolTip message="Investment made" />
        <span>Investment:</span> <Data>${shortNumber(invested)}</Data>
      </DataRow>
      {!isFounder && (
        <DataRow>
          <ToolTip message="Liquidation preferred - the Preferred stock" />
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
        <ToolTip message="Money the investor will take from the common or uncapped stocks. (% is referred to the uncapped)" />
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
                  title={"Convert back to preferred stocks"}
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
                  Switch back
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
