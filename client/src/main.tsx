import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { SocketProvider } from "./providers/socket-provider.tsx";
import { UserProvider } from "./context/user-context.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <SocketProvider>
      <UserProvider>
        <App />
      </UserProvider>
    </SocketProvider>
  </React.StrictMode>,
);
