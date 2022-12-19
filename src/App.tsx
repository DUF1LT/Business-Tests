import React from 'react';
import { Route, Routes } from 'react-router-dom';

import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { Test } from './pages/Test';
import { TestResultPage } from './pages/TestResultPage';

import './App.css';

function App() {
  return (
    <Routes>
      <Route path='*' element={<Layout />}>
        <Route index element={<Home />} />
        <Route path='test/:theme' element={<Test />} />
        <Route path='test/result/' element={<TestResultPage />} />
        <Route path='*' element={<Home />} />
      </Route>
    </Routes>
  );
}

export default App;
