import React from "react";
import { toShortNumber } from "../../utils";
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
  UserInteractionWrapper
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
  setToggle
}) => {
  const isFounders = title === "Founders";
  return (
    <ShareHolder>
      <Title>{title}</Title>
      <DataRow>
        <span>Shareholding:</span> <Data>{sharesInPercentage}%</Data>
      </DataRow>

      <DataRow>
        <span>Investment:</span> <Data>{toShortNumber(invested)}</Data>
      </DataRow>
      {!isFounders && (
        <DataRow>
          <span>Liquidation Preference:</span>
          <Data color={liquidationPreference < invested ? "danger" : "success"}>
            {toShortNumber(liquidationPreference)}
          </Data>
        </DataRow>
      )}
      <DataRow>
        <span>participation:</span>
        <Data>
          {toShortNumber(participation)}
          {isCapReached && <SmallText>(Capped)</SmallText>}
        </Data>
      </DataRow>
      {!isFounders && (
        <VariablesWrapper>
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
        </VariablesWrapper>
      )}
    </ShareHolder>
  );
};

export default Tile;
