import FullpageContainer from '../lib/components/FullpageContainer';
import FullpageSection from '../lib/components/FullpageSection';
import FirstSection from './components/FirstSection';
import FooterSection from './components/FooterSection';
import SecondSection from './components/SecondSection';
import ThirdSection from './components/ThirdSection';

function App() {
  return (
    <FullpageContainer>
      <FullpageSection>
        <FirstSection />
      </FullpageSection>
      <FullpageSection>
        <SecondSection />
      </FullpageSection>
      <FullpageSection>
        <ThirdSection />
      </FullpageSection>
      <FullpageSection isFooter>
        <FooterSection />
      </FullpageSection>
    </FullpageContainer>
  );
}

export default App;
