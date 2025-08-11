import React from "react";
import ReactDOM from "react-dom/client";
import { PersistGate } from "redux-persist/integration/react";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { GlobalStyle } from "./globalStyles";
import { Provider } from "react-redux";
import { persistor, store } from "./redux/store";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <PersistGate loading={<p>Loading...</p>} persistor={persistor}>
        <Provider store={store}>
          <GlobalStyle />
          <App />
        </Provider>
      </PersistGate>
    </BrowserRouter>
  </React.StrictMode>
);