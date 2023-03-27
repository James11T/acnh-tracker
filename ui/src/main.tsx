import ReactDOM from "react-dom/client";
import App from "./components/app/App";
import "./index.css";
import { GameStateProvider } from "./hooks/useGameState";
import { BrowserRouter } from "react-router-dom";
import { FoundStateProvider } from "./hooks/useFoundState";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <BrowserRouter>
    <FoundStateProvider>
      <GameStateProvider>
        <App />
      </GameStateProvider>
    </FoundStateProvider>
  </BrowserRouter>
);
