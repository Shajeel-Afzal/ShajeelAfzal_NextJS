"use client"

import * as React from "react"
import { Palette, Sun, Moon } from "lucide-react"
import { useTheme } from "next-themes"
import { useColorTheme } from "./theme-provider"
import { themes } from "@/lib/themes"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme()
  const { colorTheme, setColorTheme } = useColorTheme()

  const currentTheme = themes.find(t => t.name === colorTheme) || themes[0]

  return (
    <div className="flex items-center gap-2">
      {/* Color Theme Switcher */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="icon">
            <Palette className="h-[1.2rem] w-[1.2rem]" />
            <span className="sr-only">Change color theme</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Color Themes</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {themes.map((themeOption) => (
            <DropdownMenuItem
              key={themeOption.name}
              onClick={() => setColorTheme(themeOption.name)}
              className={colorTheme === themeOption.name ? "bg-accent" : ""}
            >
              <div className="flex items-center gap-2">
                <div 
                  className={`w-3 h-3 rounded-full border ${themeOption.cssVar}`}
                  style={{
                    background: themeOption.name === 'neural-blue' ? 'oklch(0.55 0.2 240)' :
                                themeOption.name === 'cyber-green' ? 'oklch(0.45 0.25 150)' :
                                themeOption.name === 'ai-purple' ? 'oklch(0.5 0.25 280)' :
                                themeOption.name === 'tech-orange' ? 'oklch(0.55 0.2 40)' :
                                themeOption.name === 'monochrome' ? 'oklch(0.15 0 0)' :
                                themeOption.name === 'teal-ocean' ? 'oklch(0.5 0.22 190)' :
                                themeOption.name === 'sunset-gradient' ? 'oklch(0.55 0.25 340)' :
                                themeOption.name === 'lws-academy' ? 'oklch(0.42 0.15 185)' :
                                'oklch(0.5 0.2 240)'
                  }}
                />
                <span>{themeOption.displayName}</span>
              </div>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Light/Dark Mode Toggle */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="icon">
            <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Appearance</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => setTheme("light")}>
            <Sun className="mr-2 h-4 w-4" />
            Light
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setTheme("dark")}>
            <Moon className="mr-2 h-4 w-4" />
            Dark
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setTheme("system")}>
            <Palette className="mr-2 h-4 w-4" />
            System
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}