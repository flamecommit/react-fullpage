import React, { useState } from "react";
import {
  FullpageContainer,
  FullpageSection,
} from "@shinyongjun/react-fullpage";
import FirstSection from "./components/FirstSection";
import FooterSection from "./components/FooterSection";
import SecondSection from "./components/SecondSection";
import ThirdSection from "./components/ThirdSection";

function App() {
  const [controlIndex, setControlIndex] = useState<number>(0);

  return (
    <>
      <FullpageContainer
        controlIndex={controlIndex}
        onBeforeChange={(beforeIndex, afterIndex) => {
          console.log("before", beforeIndex, afterIndex);
        }}
        onAfterChange={(beforeIndex, afterIndex) => {
          console.log("after", beforeIndex, afterIndex);
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
        <FullpageSection name="footer" isAutoHeight>
          <FooterSection />
        </FullpageSection>
      </FullpageContainer>
      <div
        className="controller"
        style={{
          position: "fixed",
          top: "50px",
          right: "50px",
        }}
      >
        <button type="button" onClick={() => setControlIndex(0)}>
          go to 0
        </button>
        <button type="button" onClick={() => setControlIndex(1)}>
          go to 1
        </button>
        <button type="button" onClick={() => setControlIndex(2)}>
          go to 2
        </button>
      </div>
    </>
  );
}

export default App;
