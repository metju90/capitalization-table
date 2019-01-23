import React, { useContext } from "react";
import {
  OverLayer,
  AddButton,
  VariablesWrapper,
  Variable,
  UserInteractionWrapper,
  RemoveButton,
  UserInputNumber
} from "../skin";
import {
  handleCapAddition,
  handleCapSubtract,
  handleMultiplierAddition,
  handleMultiplierSubtract
} from "../../../actions";
import Convert from "../Convert";
import Dispatch from "../../../context";

export default ({
  cap,
  title,
  multiplier,
  hasConvertedToCommonShare,
  isCapReached
}) => {
  const dispatch = useContext(Dispatch);
  return (
    <VariablesWrapper>
      {hasConvertedToCommonShare && <OverLayer />}
      <Variable>
        <span>Cap:</span>
        <UserInteractionWrapper>
          <RemoveButton isDisabled={cap < 3} onClick={() => handleCapSubtract}>
            -
          </RemoveButton>
          <UserInputNumber>x{cap}</UserInputNumber>
          <AddButton onClick={() => handleCapAddition(dispatch, title)}>
            +
          </AddButton>
        </UserInteractionWrapper>
      </Variable>
      <Variable>
        <span>Multiplier:</span>
        <UserInteractionWrapper>
          <RemoveButton
            isDisabled={multiplier < 2}
            onClick={() => handleMultiplierSubtract(dispatch, title)}
          >
            -
          </RemoveButton>
          <UserInputNumber>x{multiplier}</UserInputNumber>
          <AddButton onClick={() => handleMultiplierAddition(dispatch, title)}>
            +
          </AddButton>
        </UserInteractionWrapper>
      </Variable>
      {(isCapReached || hasConvertedToCommonShare) && (
        <Convert
          hasConvertedToCommonShare={hasConvertedToCommonShare}
          isCapReached={isCapReached}
          investorTitle={title}
        />
      )}
    </VariablesWrapper>
  );
};
