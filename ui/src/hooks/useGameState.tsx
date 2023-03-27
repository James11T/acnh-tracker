import React from "react";
import { Hemisphere, Month, MONTHS } from "../types";

interface GameState {
  time: Date;
  hemisphere: Hemisphere;
}

interface GameStateContext extends GameState {
  month: Month;
  setTime: (time: Date) => void;
  setHemisphere: (hemisphere: Hemisphere) => void;
}

interface GameStateContextProps {
  children?: React.ReactNode;
}

const gameStateContext = React.createContext({} as GameStateContext);

const GameStateProvider = ({ children }: GameStateContextProps) => {
  const [gameState, setGameState] = React.useState<GameState>({
    time: new Date(),
    hemisphere: "north",
  });

  const setTime = (time: Date) => setGameState((old) => ({ ...old, time }));

  const setHemisphere = (hemisphere: Hemisphere) =>
    setGameState((old) => ({ ...old, hemisphere }));

  return (
    <gameStateContext.Provider
      value={{
        ...gameState,
        month: MONTHS[gameState.time.getMonth()],
        setTime,
        setHemisphere,
      }}
    >
      {children}
    </gameStateContext.Provider>
  );
};

const useGameState = () => React.useContext(gameStateContext);

export { GameStateProvider, useGameState };
export default useGameState;
