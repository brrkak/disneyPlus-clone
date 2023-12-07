import React from "react";
import App from "./App";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/Store/store"
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import GlobalModal from "./GlobalModal/GlobalModal"

const root = ReactDOM.createRoot(document.getElementById("root"));
const persistor = persistStore(store)
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <GlobalModal />
          <App />
        </PersistGate>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);
