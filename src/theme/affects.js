import { css } from "styled-components";
import colors from "./colors";

const buttonClick = () => css`
  position: relative;
  &:active {
    outline: 0;
    top: 2px;
  }
`;

const buttonHover = () => css`
  &:hover {
    opacity: 0.8;
  }
`;

export default { buttonClick, buttonHover };
