import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* 추후 다른 페이지도 여기에 추가 가능 */}
      </Routes>
    </Router>
  );
}

export default App;
