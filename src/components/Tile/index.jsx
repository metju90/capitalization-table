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
  OverLayer
} from "./skin";
import { SmallText } from "../Summery/skin";
import ToolTip from "../Summery/tooltip";

const Tile = ({
  currentShareHolder,
  dispatch,
  setCallPrefferedStock,
  callPrefferedStock
}) => {
  const {
    title,
    sharesInPercentage,
    shares,
    payout: { liquidationPreference, participation, isCapReached },
    invested,
    cap,
    multiplier,
    hasConvertedToCommonShare,
    participationPercentage
  } = currentShareHolder;
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
          <SmallText>
            ({isCapReached ? "Capped" : `${participationPercentage}%`})
          </SmallText>
          ${shortNumber(participation)}
        </Data>
      </DataRow>
      {!isFounder && (
        <VariablesWrapper>
          {hasConvertedToCommonShare && <OverLayer />}
          <Variable>
            <span>Cap:</span>
            <UserInteractionWrapper>
              <RemoveButton
                isDisabled={cap < 3}
                onClick={() => {
                  currentShareHolder.cap = cap - 1;
                  dispatch({
                    type: "shareholders",
                    payload: currentShareHolder
                  });
                }}
              >
                -
              </RemoveButton>
              <UserInputNumber>x{cap}</UserInputNumber>
              <AddButton
                onClick={() => {
                  currentShareHolder.cap = cap + 1;
                  dispatch({
                    type: "shareholders",
                    payload: currentShareHolder
                  });
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
                  currentShareHolder.multiplier = multiplier - 1;
                  dispatch({
                    type: "shareholders",
                    payload: currentShareHolder
                  });
                }}
              >
                -
              </RemoveButton>
              <UserInputNumber>x{multiplier}</UserInputNumber>
              <AddButton
                onClick={() => {
                  currentShareHolder.multiplier = multiplier + 1;
                  dispatch({
                    type: "shareholders",
                    payload: currentShareHolder
                  });
                }}
              >
                +
              </AddButton>
            </UserInteractionWrapper>
          </Variable>
          <div>
            {(isCapReached || hasConvertedToCommonShare) && (
              <Fragment>
                <SmallText isCappMessaged>
                  <strong>Capped limited Reached.</strong>
                  <div>
                    You can either retain your preferred stock or convert them
                    to common.
                  </div>
                </SmallText>
                <ConvertButton
                  hasConverted={hasConvertedToCommonShare}
                  onClick={() => {
                    currentShareHolder.hasConvertedToCommonShare = !hasConvertedToCommonShare;
                    currentShareHolder.payout.isCapReached = !hasConvertedToCommonShare;
                    dispatch({
                      type: "shareholders",
                      payload: currentShareHolder
                    });
                    // setCallPrefferedStock(!callPrefferedStock);
                  }}
                >
                  {hasConvertedToCommonShare ? "Switch back!" : "Convert now!"}
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
