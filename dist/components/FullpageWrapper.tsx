import React from "react";
import styled, { createGlobalStyle } from "styled-components";
import { reset } from "../styles/mixin";

const FullpageWrapper = () => {
  return (
    <StyledFullpageWrapper>
      <GlobalStyle />
      <div>FullpageWrapper</div>
    </StyledFullpageWrapper>
  );
};

const StyledFullpageWrapper = styled.div`
  overflow: hidden;
  position: relative;
  width: 100%;
  height: 100%;
  ${reset}
`;

const GlobalStyle = createGlobalStyle`
  html {
    overflow: hidden;
    position: fixed;
    width: 100%;
    height: 100%;
    ${reset}
  }
  body {
    overflow: hidden;
    position: relative;
    width: 100%;
    height: 100%;
    ${reset}
  }
`;

export default FullpageWrapper;
