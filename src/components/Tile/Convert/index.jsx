import React, { memo } from "react";
import { ConvertButton } from "../skin";
import { SmallText } from "../../Summery/skin";

export default memo(({ hasConvertedToCommonShare, isCapReached }) => {
  if (isCapReached || hasConvertedToCommonShare) {
    return (
      <div>
        <SmallText isCappMessaged>
          <strong>Capped limited Reached.</strong>
          <div>
            You can either retain your preferred stock or convert them to
            common.
          </div>
        </SmallText>
        <ConvertButton hasConverted={hasConvertedToCommonShare}>
          {hasConvertedToCommonShare ? "Switch back!" : "Convert now!"}
        </ConvertButton>
        {console.log(
          "why is this rerending",
          hasConvertedToCommonShare,
          isCapReached
        )}
      </div>
    );
  }
  return null;
});
