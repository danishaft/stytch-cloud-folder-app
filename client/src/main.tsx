import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { StytchB2BProvider } from "@stytch/react/b2b";
import { BrowserRouter as Router } from "react-router-dom";
import { StytchB2BUIClient } from '@stytch/vanilla-js/b2b';

const stytchClient = new StytchB2BUIClient(import.meta.env.VITE_STYTCH_PUBLIC_TOKEN);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <StytchB2BProvider stytch={stytchClient}>
      <Router>
        <App />
      </Router>
    </StytchB2BProvider>
  </React.StrictMode>,
)
