import { Route, Routes } from 'react-router-dom';
import Fullpage from './routes/Fullpage';
import Home from './routes/Home';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/fullpage" element={<Fullpage />} />
    </Routes>
  );
}

export default App;
