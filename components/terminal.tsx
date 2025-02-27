"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { useTheme } from "./theme-provider"

type CommandHistory = {
  command: string
  output: string
}

export function Terminal() {
  const [input, setInput] = useState("")
  const [history, setHistory] = useState<CommandHistory[]>([])
  const [username, setUsername] = useState("user")
  const inputRef = useRef<HTMLInputElement>(null)
  const outputRef = useRef<HTMLDivElement>(null)
  const { theme } = useTheme()

  useEffect(() => {
    // Load username from localStorage
    const savedUsername = localStorage.getItem("terminal-username")
    if (savedUsername) {
      setUsername(savedUsername)
    }

    // Initial welcome message
    setHistory([
      {
        command: "",
        output: `
██████╗ ███████╗████████╗██████╗  ██████╗     ████████╗███████╗██████╗ ███╗   ███╗██╗███╗   ██╗ █████╗ ██╗     
██╔══██╗██╔════╝╚══██╔══╝██╔══██╗██╔═══██╗    ╚══██╔══╝██╔════╝██╔══██╗████╗ ████║██║████╗  ██║██╔══██╗██║     
██████╔╝█████╗     ██║   ██████╔╝██║   ██║       ██║   █████╗  ██████╔╝██╔████╔██║██║██╔██╗ ██║███████║██║     
██╔══██╗██╔══╝     ██║   ██╔══██╗██║   ██║       ██║   ██╔══╝  ██╔══██╗██║╚██╔╝██║██║██║╚██╗██║██╔══██║██║     
██║  ██║███████╗   ██║   ██║  ██║╚██████╔╝       ██║   ███████╗██║  ██║██║ ╚═╝ ██║██║██║ ╚████║██║  ██║███████╗
╚═╝  ╚═╝╚══════╝   ╚═╝   ╚═╝  ╚═╝ ╚═════╝        ╚═╝   ╚══════╝╚═╝  ╚═╝╚═╝     ╚═╝╚═╝╚═╝  ╚═══╝╚═╝  ╚═╝╚══════╝
                                                                                                                
Welcome to Retro Terminal v1.0.0
Type 'help' to see available commands.
`,
      },
    ])

    // Focus input on load
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }, [])

  useEffect(() => {
    // Scroll to bottom when history changes
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight
    }
  }, [history]) // This dependency is necessary for scrolling

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value)
  }

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleCommand()
    }
  }

  const handleCommand = () => {
    if (!input.trim()) return

    const command = input.trim()
    let output = ""

    // Process command
    switch (command.toLowerCase().split(" ")[0]) {
      case "help":
        output = `
Available commands:
  help                 - Show this help message
  clear                - Clear the terminal
  whoami               - Display current username
  setname <username>   - Set your username
  date                 - Show current date and time
  echo <message>       - Display a message
  hack <target>        - Simulate hacking (just for fun)
  ls                   - List files (simulated)
  cat <file>           - Show file content (simulated)
  exit                 - Exit terminal mode
`
        break
      case "clear":
        setHistory([])
        setInput("")
        return
      case "whoami":
        output = username
        break
      case "setname":
        const newName = command.split(" ").slice(1).join(" ")
        if (newName) {
          setUsername(newName)
          localStorage.setItem("terminal-username", newName)
          output = `Username set to: ${newName}`
        } else {
          output = "Usage: setname <username>"
        }
        break
      case "date":
        output = new Date().toString()
        break
      case "echo":
        output = command.substring(5)
        break
      case "hack":
        const target = command.split(" ").slice(1).join(" ")
        if (target) {
          output = simulateHacking(target)
        } else {
          output = "Usage: hack <target>"
        }
        break
      case "ls":
        output = `
documents/
images/
system/
notes.txt
tasks.dat
games.bin
`
        break
      case "cat":
        const file = command.split(" ").slice(1).join(" ")
        if (file) {
          output = getCatOutput(file)
        } else {
          output = "Usage: cat <file>"
        }
        break
      case "exit":
        output = "Cannot exit terminal mode. This is a simulation."
        break
      default:
        output = `Command not found: ${command}. Type 'help' for available commands.`
    }

    setHistory([...history, { command, output }])
    setInput("")
  }

  const simulateHacking = (target: string) => {
    return `
Initializing hack sequence on ${target}...
[■■■□□□□□□□] 30% - Bypassing firewall...
[■■■■■□□□□□] 50% - Accessing mainframe...
[■■■■■■■□□□] 70% - Extracting data...
[■■■■■■■■■■] 100% - Complete!

ACCESS GRANTED TO ${target.toUpperCase()}
This is a simulated hack for entertainment purposes only.
No actual hacking occurred.
`
  }

  const getCatOutput = (file: string) => {
    const files: Record<string, string> = {
      "notes.txt": "This is a sample note. Use the Notes app to create real notes.",
      "tasks.dat": "Sample tasks:\n- Buy milk\n- Fix the flux capacitor\n- Learn to hack time",
      "games.bin":
        "BINARY DATA: 01001110 01101111 01110100 00100000 01110010 01100101 01100001 01100100 01100001 01100010 01101100 01100101",
    }

    return files[file] || `File not found: ${file}`
  }

  return (
    <div className="terminal-container h-full flex flex-col">
      <div ref={outputRef} className="terminal-output flex-1 overflow-auto mb-4">
        {history.map((item, index) => (
          <div key={index} className="mb-2">
            {item.command && (
              <div className="flex">
                <span className="mr-2">{username}@retro-terminal:~$</span>
                <span>{item.command}</span>
              </div>
            )}
            <pre className="whitespace-pre-wrap">{item.output}</pre>
          </div>
        ))}
      </div>
      <div className="terminal-input-container flex items-center">
        <span className="mr-2">{username}@retro-terminal:~$</span>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={handleInputChange}
          onKeyDown={handleInputKeyDown}
          className="terminal-input flex-1"
          autoFocus
        />
      </div>
    </div>
  )
}

