import React from "react";

interface FoundState {
  foundIDs: number[];
}

interface FoundStateContext extends FoundState {
  isFound: (id: number) => boolean;
  setFound: (id: number, found?: boolean) => void;
  toggleFound: (id: number) => boolean;
}

interface FoundStateProps {
  children?: React.ReactNode;
}

const foundStateContext = React.createContext({} as FoundStateContext);

const FoundStateProvider = ({ children }: FoundStateProps) => {
  const [foundState, setFoundState] = React.useState<FoundState>({
    foundIDs: [],
  });
  const hasLoaded = React.useRef(false);

  React.useEffect(() => {
    const done = () => {
      hasLoaded.current = true;
    };
    const rawData = localStorage.getItem("foundIDs");
    if (!rawData) return done();
    const data: number[] = JSON.parse(rawData);
    setFoundState({ foundIDs: data });
    done();
  }, []);

  React.useEffect(() => {
    if (!hasLoaded.current) return;
    localStorage.setItem("foundIDs", JSON.stringify(foundState.foundIDs));
  }, [foundState.foundIDs]);

  const isFound = (id: number) => foundState.foundIDs.includes(id);

  const setFound = (id: number, found = true) => {
    if (found) {
      if (foundState.foundIDs.includes(id)) return;
      setFoundState((old) => ({ ...old, foundIDs: [...old.foundIDs, id] }));
    } else {
      setFoundState((old) => ({
        ...old,
        foundIDs: old.foundIDs.filter((v) => v !== id),
      }));
    }
  };

  const toggleFound = (id: number) => {
    const newValue = !isFound(id);
    setFound(id, newValue);
    return newValue;
  };

  return (
    <foundStateContext.Provider
      value={{ ...foundState, isFound, setFound, toggleFound }}
    >
      {children}
    </foundStateContext.Provider>
  );
};

const useFoundState = () => React.useContext(foundStateContext);

export { FoundStateProvider, useFoundState };
export default useFoundState;
