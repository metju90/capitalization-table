import { css } from "styled-components";
import colors from "./colors";

export default () => css`
  body {
    background: ${colors.colorSet.white};
    color: ${colors.colorSet.dark};
    font-size: 14px;

    margin: 0;
    padding: 0;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI";
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  html,
  body,
  #root {
    height: 100%;
  }

  #root {
    position: relative;
  }
  .fixed {
    top: 90px;
  }
  * {
    box-sizing: border-box;
  }
`;
