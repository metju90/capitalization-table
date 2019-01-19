import { css } from "styled-components";
import colors from "./colors";

const boxShadow = () => css`
  box-shadow: 0 0 5px 0px rgba(0, 0, 0, 0.5);
`;

const buttonClick = () => css`
  position: relative;
  &:active {
    outline: 0;
    top: 1px;
  }
`;

const buttonHover = () => css`
  &:hover {
    opacity: 0.8;
  }
`;

export default { boxShadow, buttonClick, buttonHover };
