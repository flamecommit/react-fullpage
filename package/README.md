# React Fullpage

This is a Fullpage library that operates in React.

[Demo](https://shinyongjun.com/package/react-fullpage)

[Document](https://shinyongjun.com/package/react-fullpage/document)

[Issues](https://github.com/shinyj1991/react-fullpage/issues)

[NPM](https://www.npmjs.com/package/@shinyongjun/react-fullpage)

[![Hits](https://hits.seeyoufarm.com/api/count/incr/badge.svg?url=https%3A%2F%2Fgithub.com%2Fshinyj1991%2Freact-fullpage&count_bg=%2379C83D&title_bg=%23555555&icon=&icon_color=%23E7E7E7&title=hits&edge_flat=false)](https://hits.seeyoufarm.com)

## Installation and usage

```
npm install @shinyongjun/react-fullpage
yarn add @shinyongjun/react-fullpage
```

There are two types of components: `FullpageContainer` and `FullpageSection`.

`activeIndex` and `setActiveIndex` are the required Props of the `FullpageContainer` component.

```tsx
import { useState } from 'react';
import {
  FullpageContainer,
  FullpageSection,
} from '@shinyongjun/react-fullpage';

function ExampleComponent() {
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

export default ExampleComponent;
```

## Document

[Document](https://shinyongjun.com/package/react-fullpage/document)

## License

MIT Licensed. Copyright (c) 2023-present Shinyongjun.
