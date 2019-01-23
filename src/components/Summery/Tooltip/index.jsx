import React from "react";
import { ToolTip, HoverableArea } from "../skin";
import { FaInfoCircle } from "react-icons/fa";

export default ({ message }) => {
  return (
    <HoverableArea>
      <FaInfoCircle />
      <ToolTip>{message}</ToolTip>
    </HoverableArea>
  );
};
