"use client";

import {
  createContext,
  MutableRefObject,
  ReactNode,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

interface FullscreenContextType {
  fullscreenEnabled: boolean;
  toggleFullscreen: () => void;
}

const FullscreenContext = createContext<FullscreenContextType>(
  {} as FullscreenContextType
);

export function useFullscreen() {
  return useContext(FullscreenContext);
}

export function FullscreenContextProvider<T extends HTMLElement>({
  children,
}: {
  children(ref: MutableRefObject<T | null>): ReactNode;
}) {
  const ref = useRef<T | null>(null);
  const [fullscreenEnabled, setFullscreenEnabled] = useState(false);

  const toggleFullscreen = () => {
    if (fullscreenEnabled) {
      document.exitFullscreen();
    } else {
      ref.current?.requestFullscreen();
    }
  };

  useEffect(() => {
    function handleFullscreenChange() {
      setFullscreenEnabled(
        document.fullscreenElement !== null &&
          document.fullscreenElement === ref.current
      );
    }

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () =>
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);

  return (
    <FullscreenContext.Provider value={{ fullscreenEnabled, toggleFullscreen }}>
      {children(ref)}
    </FullscreenContext.Provider>
  );
}
