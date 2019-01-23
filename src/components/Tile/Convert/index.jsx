import React from "react";
import { ConvertButton } from "../skin";
import { SmallText } from "../../Summery/skin";

export default ({
  investorTitle,
  hasConvertedToCommonShare,
  isCapReached,
  dispatch
}) => {
  return (
    <div>
      <SmallText isCappMessaged>
        <strong>Capped limited Reached.</strong>
        <div>
          You can either retain your preferred stock or convert them to common.
        </div>
      </SmallText>
      <ConvertButton
        hasConverted={hasConvertedToCommonShare}
        onClick={() => {
          dispatch({ type: "CONVERT_INVESTOR", payload: investorTitle });
        }}
      >
        {hasConvertedToCommonShare ? "Switch back!" : "Convert now!"}
      </ConvertButton>
    </div>
  );
};
