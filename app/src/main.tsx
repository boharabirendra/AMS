import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { store } from "./store/app.ts";
import { Provider } from "react-redux";
import Container from "./components/Container.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <Container>
        <App />
      </Container>
    </Provider>
  </StrictMode>
);
