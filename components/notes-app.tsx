"use client"

import type React from "react"

import { useState, useEffect } from "react"

type Note = {
  id: string
  content: string
  mode: "ascii" | "binary" | "hex"
  lastModified: number
}

export function NotesApp() {
  const [content, setContent] = useState("")
  const [mode, setMode] = useState<"ascii" | "binary" | "hex">("ascii")
  const [displayContent, setDisplayContent] = useState("")

  useEffect(() => {
    // Load note from localStorage
    const savedNote = localStorage.getItem("retro-note")
    if (savedNote) {
      const note: Note = JSON.parse(savedNote)
      setContent(note.content)
      setMode(note.mode)
    }
  }, [])

  useEffect(() => {
    // Convert content based on selected mode
    switch (mode) {
      case "ascii":
        setDisplayContent(content)
        break
      case "binary":
        setDisplayContent(
          content
            .split("")
            .map((char) => char.charCodeAt(0).toString(2).padStart(8, "0"))
            .join(" "),
        )
        break
      case "hex":
        setDisplayContent(
          content
            .split("")
            .map((char) => char.charCodeAt(0).toString(16).padStart(2, "0"))
            .join(" "),
        )
        break
    }
  }, [content, mode])

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newContent = e.target.value
    setContent(newContent)

    // Save to localStorage
    const note: Note = {
      id: "default",
      content: newContent,
      mode,
      lastModified: Date.now(),
    }
    localStorage.setItem("retro-note", JSON.stringify(note))
  }

  const handleModeChange = (newMode: "ascii" | "binary" | "hex") => {
    setMode(newMode)

    // Save mode preference to localStorage
    const note: Note = {
      id: "default",
      content,
      mode: newMode,
      lastModified: Date.now(),
    }
    localStorage.setItem("retro-note", JSON.stringify(note))
  }

  return (
    <div className="notes-app">
      <h2 className="text-xl mb-4 glitch" title="RETRO NOTES">
        RETRO NOTES
      </h2>

      <div className="mb-4">
        <div className="flex mb-2">
          <button
            className={`terminal-button mr-2 ${mode === "ascii" ? "bg-opacity-30 bg-primary" : ""}`}
            onClick={() => handleModeChange("ascii")}
          >
            ASCII
          </button>
          <button
            className={`terminal-button mr-2 ${mode === "binary" ? "bg-opacity-30 bg-primary" : ""}`}
            onClick={() => handleModeChange("binary")}
          >
            Binary
          </button>
          <button
            className={`terminal-button ${mode === "hex" ? "bg-opacity-30 bg-primary" : ""}`}
            onClick={() => handleModeChange("hex")}
          >
            Hex
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block mb-2">Edit Note</label>
          <textarea
            className="terminal-textarea"
            value={content}
            onChange={handleContentChange}
            placeholder="Type your note here..."
          />
        </div>

        <div>
          <label className="block mb-2">View in {mode.toUpperCase()}</label>
          <div className="terminal-textarea overflow-auto">{displayContent}</div>
        </div>
      </div>

      <div className="mt-4 text-sm">
        <p>Note is automatically saved to local storage.</p>
        <p>Last saved: {new Date().toLocaleString()}</p>
      </div>
    </div>
  )
}

