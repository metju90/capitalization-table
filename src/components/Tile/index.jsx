import React from "react";
import { shortNumber } from "../../utils";
import { ShareHolder, DataRow, Data, Title } from "./skin";
import { SmallText } from "../Summery/skin";
import ToolTip from "../Summery/Tooltip";
import InteractiveArea from "./InteractiveArea";

const Tile = ({
  title,
  sharesInPercentage,
  shares,
  payout: { liquidationPreference, participation, isCapReached },
  invested,
  cap,
  multiplier,
  hasConvertedToCommonShare,
  uncappedParticipationPercentage
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
          <SmallText>
            ({isCapReached ? "Capped" : `${uncappedParticipationPercentage}%`})
          </SmallText>
          ${shortNumber(participation)}
        </Data>
      </DataRow>
      {!isFounder && !hasConvertedToCommonShare && (
        <InteractiveArea
          cap={cap}
          title={title}
          multiplier={multiplier}
          hasConvertedToCommonShare={hasConvertedToCommonShare}
          isCapReached={isCapReached}
        />
      )}
      {hasConvertedToCommonShare && (
        <div>
          <SmallText>Converted preferred to common stocks.</SmallText>
        </div>
      )}
    </ShareHolder>
  );
};

export default Tile;
