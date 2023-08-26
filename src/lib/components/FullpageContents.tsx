'use client';

import styled from 'styled-components';

type Props = {
  children: React.ReactNode;
};

function FullpageContents({ children }: Props) {
  return <StyledFullpageContents>{children}</StyledFullpageContents>;
}

const StyledFullpageContents = styled.div`
  display: flex;
  min-height: 100%;
  position: relative;
  z-index: 1;
`;

export default FullpageContents;
