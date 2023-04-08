import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from "./components/Header";
import InsuranceTabs from "./components/InsuranceTabs";
import ClaimsPage from './components/ClaimsPage';

function App() {
  return (
    <div>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={
            <div className="container mx-auto mt-10">
              <InsuranceTabs />
            </div>
          } />
          <Route path="/claims" element={
            <div className="container mx-auto mt-10">
              <ClaimsPage />
            </div>
          } />

        </Routes>
      </Router>
    </div>
  );
}

export default App;
