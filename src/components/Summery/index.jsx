import React from "react";
import { shortNumber } from "../../utils";
import { Summary, ContentWrapper, SmallText, Header } from "./skin";
import ToolTip from "../Summery/Tooltip";

export default ({ exitValue, commonStockSum, uncappedStock }) => (
  <Summary>
    <ContentWrapper>
      <ToolTip message={"Exit price"} />
      <Header>
        <h3>Exit value</h3>
      </Header>
      <big>${shortNumber(exitValue)}</big>
    </ContentWrapper>
    <ContentWrapper>
      <ToolTip message={"The preferred stocks - the most prioritsed stocks/"} />
      <Header>
        <h4>Preferred Stocks:</h4>
        <SmallText>Stocks in cash:</SmallText>
      </Header>
      <strong>${shortNumber(exitValue - commonStockSum)}</strong>
    </ContentWrapper>
    <ContentWrapper>
      <ToolTip
        message={
          "The common stock - to be distributed between all shareholders. Investors may be limited to this stock."
        }
      />
      <Header>
        <h4>Common stock:</h4>
        <SmallText>Stocks in cash:</SmallText>
      </Header>
      <strong>${shortNumber(commonStockSum)}</strong>
    </ContentWrapper>
    <ContentWrapper>
      <ToolTip
        message={
          "Stock which is distributed pro-rata to all eligible shareholders"
        }
      />
      <Header>
        <h4>Uncapped stock:</h4>
        <SmallText>Stocks in cash:</SmallText>
      </Header>
      <strong>${shortNumber(uncappedStock)}</strong>
    </ContentWrapper>
  </Summary>
);
