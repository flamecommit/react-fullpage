import {
  FullpageContainer,
  FullpageSection,
} from '@shinyongjun/react-fullpage';
import '@shinyongjun/react-fullpage/css';
import * as React from 'react';
import { useState } from 'react';
import FirstSection from '../components/FirstSection';
import FooterSection from '../components/FooterSection';
import FourSection from '../components/FourSection';
import SecondSection from '../components/SecondSection';
import ThirdSection from '../components/ThirdSection';

function Fullpage() {
  const [activeIndex, setActiveIndex] = useState<number>(0);

  return (
    <>
      <FullpageContainer
        transitionDuration={700}
        activeIndex={activeIndex}
        setActiveIndex={setActiveIndex}
        topScrollOnSectionChange={true}
        onBeforeChange={(beforeIndex, afterIndex) => {
          console.log('before', beforeIndex, afterIndex);
        }}
        onAfterChange={(beforeIndex, afterIndex) => {
          console.log('after', beforeIndex, afterIndex);
        }}
        onAfterLoad={(container) => {
          console.log('afterLoad', container);
        }}
      >
        <FullpageSection name="first">
          <FirstSection />
        </FullpageSection>
        <FullpageSection name="second">
          <SecondSection />
        </FullpageSection>
        <FullpageSection name="third">
          <ThirdSection />
        </FullpageSection>
        <FullpageSection name="fourth">
          <FourSection />
        </FullpageSection>
        <FullpageSection name="footer" isAutoHeight>
          <FooterSection />
        </FullpageSection>
      </FullpageContainer>
      <div
        className="controller"
        style={{
          position: 'fixed',
          top: '50px',
          right: '50px',
        }}
      >
        <div>
          <button type="button" onClick={() => setActiveIndex(0)}>
            go to 0
          </button>
          <button type="button" onClick={() => setActiveIndex(1)}>
            go to 1
          </button>
          <button type="button" onClick={() => setActiveIndex(2)}>
            go to 2
          </button>
          <button type="button" onClick={() => setActiveIndex(5)}>
            go to 5
          </button>
        </div>
        <div>
          <a href="/fullpage#first">go to first</a>
          <br />
          <a href="/fullpage#second">go to second</a>
          <br />
          <a href="/fullpage#third">go to third</a>
          <br />
          <a href="/fullpage#fourth">go to fourth</a>
        </div>
        <div>{activeIndex}</div>
      </div>
    </>
  );
}

export default Fullpage;
