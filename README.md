## 라이브러리 개요

react-fullpage 라이브러리는 React 기반의 웹 애플리케이션에서 전체 화면을 차지하는 페이지를 쉽게 구현할 수 있도록 도와주는 라이브러리입니다.

## 기능 소개

- 웹 페이지를 여러 섹션으로 나누고, 각 섹션을 전체 화면으로 표시할 수 있습니다.
- 다양한 스크롤 이벤트를 사용하여 사용자 경험을 향상시킬 수 있습니다.
- 사용자 정의 가능한 옵션을 통해 페이지 전환 효과나 스타일을 설정할 수 있습니다.
  ​

## 설치

npm을 사용하여 설치할 수 있습니다.

```bash
npm install @shinyongjun/react-fullpage
```

또는 yarn을 사용할 수도 있습니다.

```bash
yarn add @shinyongjun/react-fullpage
```

## 예제 코드

라이브러리의 간단한 사용 예제 코드입니다.

```tsx
'use client';

import { useState } from 'react';
import {
  FullpageContainer,
  FullpageSection,
} from '@shinyongjun/react-fullpage';
import '@shinyongjun/react-fullpage/css';

function MyPage() {
  const [activeIndex, setActiveIndex] = useState<number>(0);

  return (
    <FullpageContainer
      activeIndex={activeIndex}
      setActiveIndex={setActiveIndex}
    >
      <FullpageSection>
        <div>Section 1</div>
      </FullpageSection>
      <FullpageSection>
        <div>Section 2</div>
      </FullpageSection>
      <FullpageSection>
        <div>Section 3</div>
      </FullpageSection>
      <FullpageSection isAutoHeight>
        <footer>Footer</footer>
      </FullpageSection>
    </FullpageContainer>
  );
}

export default MyPage;
```

## API 문서

라이브러리의 주요 API들에 대한 문서를 [Docs](https://shinyongjun.gitbook.io/react-fullpage/)에서 확인할 수 있습니다.

## 실제 사용 사례

라이브러리의 사용 예시는 [Demo](https://shinyongjun.com/library/react-fullpage)에서 확인할 수 있습니다.

## 피드백 및 지원

라이브러리에 대한 피드백이나 문제 신고는 [GitHub Issues 페이지](https://github.com/flamecommit/react-fullpage/issues)에서 제공합니다.
