"use client"

import type React from "react"

import { useTheme } from "./theme-provider"

export function Settings() {
  const { theme, setTheme } = useTheme()

  const handleColorSchemeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setTheme({
      ...theme,
      colorScheme: e.target.value as any,
    })
  }

  const handleCrtEffectChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTheme({
      ...theme,
      crtEffect: e.target.checked,
    })
  }

  const handleScanlinesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTheme({
      ...theme,
      scanlines: e.target.checked,
    })
  }

  return (
    <div className="settings-container">
      <h2 className="text-xl mb-6 glitch" title="SETTINGS">
        SETTINGS
      </h2>

      <div className="settings-group">
        <h3 className="settings-title">Theme Settings</h3>

        <div className="settings-option">
          <label className="settings-label">Color Scheme</label>
          <select className="settings-select" value={theme.colorScheme} onChange={handleColorSchemeChange}>
            <option value="green-theme">Green (Matrix)</option>
            <option value="amber-theme">Amber (Classic)</option>
            <option value="blue-theme">Blue (Cyberpunk)</option>
            <option value="red-theme">Red (Alert)</option>
          </select>
        </div>
      </div>

      <div className="settings-group">
        <h3 className="settings-title">Display Effects</h3>

        <div className="settings-option">
          <label className="flex items-center">
            <input
              type="checkbox"
              className="settings-checkbox"
              checked={theme.crtEffect}
              onChange={handleCrtEffectChange}
            />
            CRT Effect
          </label>
          <p className="text-sm text-secondary ml-6 mt-1">Simulates an old CRT monitor with screen flicker</p>
        </div>

        <div className="settings-option">
          <label className="flex items-center">
            <input
              type="checkbox"
              className="settings-checkbox"
              checked={theme.scanlines}
              onChange={handleScanlinesChange}
            />
            Scanlines
          </label>
          <p className="text-sm text-secondary ml-6 mt-1">Shows horizontal scanlines like on old monitors</p>
        </div>
      </div>

      <div className="settings-group">
        <h3 className="settings-title">About</h3>
        <p>Retro Terminal v1.0.0</p>
        <p className="text-sm text-secondary mt-2">
          A nostalgic terminal experience with retro styling and multiple features. All data is stored locally in your
          browser.
        </p>
      </div>
    </div>
  )
}

