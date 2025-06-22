import React, { createContext, useContext, useState } from 'react';
import Colors from '@/constants/Colors';

interface Theme {
  colors: {
    text: string;
    background: string;
    tint: string;
    tabIconDefault: string;
    tabIconSelected: string;
  };
}

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  isDarkMode: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>({ colors: Colors.light });
  const [isDarkMode, setIsDarkMode] = useState(false);
  
  const toggleTheme = () => {
    setTheme(prevTheme => ({
      colors: prevTheme.colors === Colors.light ? Colors.dark : Colors.light,
    }));
    setIsDarkMode(prev => !prev);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, isDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};