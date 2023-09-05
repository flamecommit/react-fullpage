import * as React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './routes/Home';
import Fullpage from './routes/Fullpage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/fullpage" element={<Fullpage />} />
    </Routes>
  );
}

export default App;
