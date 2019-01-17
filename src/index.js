import React, { Fragment } from "react";
import ReactDOM from "react-dom";
import { ThemeProvider, createGlobalStyle } from "styled-components";
import App from "./App";

import theme from "./theme";

const GlobalStyle = createGlobalStyle`
${theme.global()}
`;

const getApp = () => (
  <Fragment>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
    <GlobalStyle />
  </Fragment>
);

ReactDOM.render(getApp(), document.getElementById("root"));
