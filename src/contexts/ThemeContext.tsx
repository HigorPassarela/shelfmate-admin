import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type ThemeMode = 'dark' | 'light' | 'high-contrast';
type FontSize = 'normal' | 'large' | 'extra-large';

interface ThemeContextType {
  mode: ThemeMode;
  setMode: (m: ThemeMode) => void;
  fontSize: FontSize;
  setFontSize: (s: FontSize) => void;
  reducedMotion: boolean;
  setReducedMotion: (v: boolean) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const STORAGE_KEY = 'livraria-theme';

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [mode, setModeState] = useState<ThemeMode>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try { return JSON.parse(saved).mode || 'dark'; } catch { return 'dark'; }
    }
    return 'dark';
  });
  const [fontSize, setFontSizeState] = useState<FontSize>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try { return JSON.parse(saved).fontSize || 'normal'; } catch { return 'normal'; }
    }
    return 'normal';
  });
  const [reducedMotion, setReducedMotionState] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try { return JSON.parse(saved).reducedMotion || false; } catch { return false; }
    }
    return false;
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ mode, fontSize, reducedMotion }));
    
    const root = document.documentElement;
    root.setAttribute('data-theme', mode);
    root.classList.remove('font-normal', 'font-large', 'font-extra-large');
    root.classList.add(`font-${fontSize}`);
    
    if (reducedMotion) {
      root.classList.add('reduce-motion');
    } else {
      root.classList.remove('reduce-motion');
    }
  }, [mode, fontSize, reducedMotion]);

  const setMode = (m: ThemeMode) => setModeState(m);
  const setFontSize = (s: FontSize) => setFontSizeState(s);
  const setReducedMotion = (v: boolean) => setReducedMotionState(v);

  return (
    <ThemeContext.Provider value={{ mode, setMode, fontSize, setFontSize, reducedMotion, setReducedMotion }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider');
  return ctx;
}
