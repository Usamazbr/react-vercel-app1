import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
// import App2 from './App2';
import reportWebVitals from './reportWebVitals';
import "./tailwind.generated.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./components/Home";
import Livedetect from "./components/Livedetect";
import Test from "./components/Test";
import About from "./components/About";
import PhotoVerify from "./components/PhotoVerify";
import Verification from "./components/Verification";
// import NoPage from "./components/NoPage";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="Livedetect" element={<Livedetect />} />
          <Route path="Test" element={<Test />} />
          <Route path="About" element={<About />} />
          <Route path="PhotoVerify" element={<PhotoVerify />} />
          <Route path="Verification" element={<Verification />} />
          {/* <Route path="*" element={<NoPage />} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
    {/* <App2 /> */}
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
