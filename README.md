# React Fullpage

가벼운 React Fullpage 컴포넌트 입니다.

[![Hits](https://hits.seeyoufarm.com/api/count/incr/badge.svg?url=https%3A%2F%2Fgithub.com%2Fshinyj1991%2Freact-fullpage&count_bg=%2379C83D&title_bg=%23555555&icon=&icon_color=%23E7E7E7&title=hits&edge_flat=false)](https://hits.seeyoufarm.com)

## Demo

[Demo 보러가기](https://shinyongjun.com/package/react-fullpage)

## 설치

```
npm install @shinyongjun/react-fullpage
```

## 사용법

```tsx
import {
  FullpageContainer,
  FullpageSection,
} from '@shinyongjun/react-fullpage';

function ExampleComponent() {
  return (
    <FullpageContainer>
      <FullpageSection>
        <div>Section 1</div>
      </FullpageSection>
      <FullpageSection>
        <div>Section 2</div>
      </FullpageSection>
      <FullpageSection>
        <div>Section 3</div>
      </FullpageSection>
      <FullpageSection isFooter>
        <footer>Footer</footer>
      </FullpageSection>
    </FullpageContainer>
  );
}

export default ExampleComponent;
```
