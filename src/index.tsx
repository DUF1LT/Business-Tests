import { ChakraProvider } from '@chakra-ui/react';
import { MathJax3Config, MathJaxContext } from 'better-react-mathjax';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";

import App from './App';

import './index.css';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const mathjaxConfig: MathJax3Config = {
  loader: { load: ["[tex]/html"] },
  options: {
    enableMenu: false,
  },
  tex: {
    packages: { "[+]": ["html"] },
    inlineMath: [
      ["$", "$"],
      ["\\(", "\\)"]
    ],
    displayMath: [
      ["$$", "$$"],
      ["\\[", "\\]"]
    ],
  },
};

root.render(
  <React.StrictMode>
    <ChakraProvider>
      <MathJaxContext config={mathjaxConfig}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </MathJaxContext>
    </ChakraProvider>
  </React.StrictMode>
);
