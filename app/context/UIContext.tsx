"use client";

import { createContext, useContext, useState, useCallback, type ReactNode } from "react";

interface UIContextType {
  isMenuVisible: boolean;
  characterIndex: number;
  buttonDisabled: boolean;
  toggleMenu: () => void;
  setButtonDisabled: (disabled: boolean) => void;
}

const UIContext = createContext<UIContextType | null>(null);

interface UIProviderProps {
  children: ReactNode;
}

export function UIProvider({ children }: UIProviderProps) {
  // Menu state
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const [characterIndex, setCharacterIndex] = useState(0);
  const [buttonDisabled, setButtonDisabled] = useState(false);

  // Toggle menu with debounce logic
  const toggleMenu = useCallback(() => {
    setIsMenuVisible((prev) => !prev);
    setButtonDisabled(true);

    setTimeout(() => {
      setButtonDisabled(false);
      setCharacterIndex((prev) => {
        // Only update character index when closing menu
        return isMenuVisible ? prev : (prev + 1) % 3;
      });
    }, 900);
  }, [isMenuVisible]);

  const value: UIContextType = {
    // Menu
    isMenuVisible,
    characterIndex,
    buttonDisabled,
    toggleMenu,
    setButtonDisabled,
  };

  return <UIContext.Provider value={value}>{children}</UIContext.Provider>;
}

/**
 * Hook to access UI state
 */
export function useUI(): UIContextType {
  const context = useContext(UIContext);
  if (!context) {
    throw new Error("useUI must be used within a UIProvider");
  }
  return context;
}

