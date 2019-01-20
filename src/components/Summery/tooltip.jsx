import React, { useState, Fragment } from "react";
import { ToolTip, HoverableArea } from "./skin";
import { FaInfoCircle } from "react-icons/fa";

export default ({ message, isHidden }) => {
  return (
    <HoverableArea>
      <FaInfoCircle />
      <ToolTip>{message}</ToolTip>
    </HoverableArea>
  );
};
