import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import { Auth0Provider } from "@auth0/auth0-react";
import { ChakraProvider } from "@chakra-ui/react"

import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <Auth0Provider
      domain="dev-1m3nzcnf.us.auth0.com"
      clientId="6Ksgajs4QkIBhcgqP7IYEqcybmkc3lQM"
      redirectUri={window.location.origin}
    >
      <ChakraProvider>

        <App />
      </ChakraProvider>
    </Auth0Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
