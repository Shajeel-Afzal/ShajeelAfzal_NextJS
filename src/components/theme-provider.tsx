"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import { themes, defaultTheme } from "@/lib/themes"

const ThemeContext = React.createContext<{
  colorTheme: string
  setColorTheme: (theme: string) => void
}>({
  colorTheme: defaultTheme.name,
  setColorTheme: () => {},
})

export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  const [colorTheme, setColorTheme] = React.useState(defaultTheme.name)

  React.useEffect(() => {
    const stored = localStorage.getItem("color-theme")
    if (stored && themes.find(t => t.name === stored)) {
      setColorTheme(stored)
    }
  }, [])

  React.useEffect(() => {
    localStorage.setItem("color-theme", colorTheme)
    const theme = themes.find(t => t.name === colorTheme)
    if (theme) {
      document.documentElement.className = document.documentElement.className
        .replace(/theme-[\w-]+/g, '')
        .trim()
      if (theme.name !== 'neural-blue') {
        document.documentElement.classList.add(theme.cssVar)
      }
    }
  }, [colorTheme])

  return (
    <ThemeContext.Provider value={{ colorTheme, setColorTheme }}>
      <NextThemesProvider {...props}>{children}</NextThemesProvider>
    </ThemeContext.Provider>
  )
}

export const useColorTheme = () => {
  const context = React.useContext(ThemeContext)
  if (!context) {
    throw new Error("useColorTheme must be used within a ThemeProvider")
  }
  return context
}