"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"

type ColorScheme = "green-theme" | "amber-theme" | "blue-theme" | "red-theme"

type Theme = {
  colorScheme: ColorScheme
  crtEffect: boolean
  scanlines: boolean
}

type ThemeContextType = {
  theme: Theme
  setTheme: (theme: Theme) => void
}

const defaultTheme: Theme = {
  colorScheme: "green-theme",
  crtEffect: true,
  scanlines: true,
}

const ThemeContext = createContext<ThemeContextType>({
  theme: defaultTheme,
  setTheme: () => {},
})

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>(defaultTheme)

  useEffect(() => {
    // Load theme from localStorage
    const savedTheme = localStorage.getItem("terminal-theme")
    if (savedTheme) {
      setTheme(JSON.parse(savedTheme))
    }
  }, [])

  const updateTheme = (newTheme: Theme) => {
    setTheme(newTheme)
    localStorage.setItem("terminal-theme", JSON.stringify(newTheme))
  }

  return <ThemeContext.Provider value={{ theme, setTheme: updateTheme }}>{children}</ThemeContext.Provider>
}

export const useTheme = () => useContext(ThemeContext)

