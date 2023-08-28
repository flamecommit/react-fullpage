import FullpageContainer from '../lib/components/FullpageContainer';
import FullpageSection from '../lib/components/FullpageSection';
import FirstSection from './components/FirstSection';
import FooterSection from './components/FooterSection';
import SecondSection from './components/SecondSection';
import ThirdSection from './components/ThirdSection';

function App() {
  return (
    <FullpageContainer
      onBeforeChange={(beforeIndex, afterIndex) => {
        console.log('before', beforeIndex, afterIndex);
      }}
      onAfterChange={(beforeIndex, afterIndex) => {
        console.log('after', beforeIndex, afterIndex);
      }}
    >
      <FullpageSection name="first">
        <FirstSection />
      </FullpageSection>
      <FullpageSection>
        <SecondSection />
      </FullpageSection>
      <FullpageSection name="third">
        <ThirdSection />
      </FullpageSection>
      <FullpageSection name="footer" isAutoHeight>
        <FooterSection />
      </FullpageSection>
    </FullpageContainer>
  );
}

export default App;
