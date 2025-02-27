"use client"

import { useEffect, useState } from "react"
import { Terminal } from "@/components/terminal"
import { Sidebar } from "@/components/sidebar"
import { BinaryPlayground } from "@/components/binary-playground"
import { NotesApp } from "@/components/notes-app"
import { TaskManager } from "@/components/task-manager"
import { MiniGames } from "@/components/mini-games"
import { Clock } from "@/components/clock"
import { Settings } from "@/components/settings"
import { useTheme } from "@/components/theme-provider"
import { AboutUs } from "@/components/about-us"

export default function Home() {
  const [activeTab, setActiveTab] = useState("terminal")
  const { theme } = useTheme()

  // Apply CRT effect class to body based on theme settings
  useEffect(() => {
    if (theme.crtEffect) {
      document.body.classList.add("crt")
    } else {
      document.body.classList.remove("crt")
    }
  }, [theme.crtEffect])

  const renderContent = () => {
    switch (activeTab) {
      case "terminal":
        return <Terminal />
      case "binary":
        return <BinaryPlayground />
      case "notes":
        return <NotesApp />
      case "tasks":
        return <TaskManager />
      case "games":
        return <MiniGames />
      case "clock":
        return <Clock />
      case "settings":
        return <Settings />
      case "about":
        return <AboutUs />
      default:
        return <Terminal />
    }
  }

  return (
    <main className={`flex min-h-screen flex-col md:flex-row ${theme.colorScheme}`}>
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="flex-1 p-4 overflow-auto terminal-content">{renderContent()}</div>
    </main>
  )
}

