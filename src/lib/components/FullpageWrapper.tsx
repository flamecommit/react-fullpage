import React from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { reset } from '../styles/mixin';

type Props = {
  children: React.ReactNode;
};

const FullpageWrapper = ({ children }: Props) => {
  return (
    <StyledFullpageWrapper className="__react-fullpage-wrapper">
      <GlobalStyle />
      {children}
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
    *:has(.__react-fullpage-wrapper) {
      position: relative;
      width: 100%;
      height: 100%;
      ${reset}
    }
  }
`;

export default FullpageWrapper;
