import React from "react";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { theme, GlobalStyle } from "styles";
import { ThemeProvider } from "styled-components";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import store from "store/store";

const container = document.getElementById("root");

const root = createRoot(container!);
root.render((
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Provider store={store}>
          <App />
        </Provider>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
