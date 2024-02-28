import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "./redux/store.js";
import { AnimatePresence } from "framer-motion";
import { disableReactDevTools } from "@fvilers/disable-react-devtools";
import { SocketContextProvider } from "./context/SocketContext.jsx";
disableReactDevTools();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
      <Provider store={store}>
        <AnimatePresence>
          <SocketContextProvider>
            <App />
          </SocketContextProvider>
        </AnimatePresence>
      </Provider>
  </React.StrictMode>
);
