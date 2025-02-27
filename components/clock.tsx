"use client"

import { useState, useEffect } from "react"
import { useTheme } from "./theme-provider"

export function Clock() {
  const [time, setTime] = useState(new Date())
  const [showBinary, setShowBinary] = useState(false)
  const { theme } = useTheme()

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date())
    }, 1000)

    return () => {
      clearInterval(timer)
    }
  }, [])

  const formatTime = (date: Date): string => {
    const hours = date.getHours().toString().padStart(2, "0")
    const minutes = date.getMinutes().toString().padStart(2, "0")
    const seconds = date.getSeconds().toString().padStart(2, "0")
    return `${hours}:${minutes}:${seconds}`
  }

  const formatDate = (date: Date): string => {
    const options: Intl.DateTimeFormatOptions = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    }
    return date.toLocaleDateString(undefined, options)
  }

  const toBinary = (num: number): string => {
    return num.toString(2).padStart(8, "0")
  }

  const formatTimeBinary = (date: Date): string => {
    const hours = toBinary(date.getHours())
    const minutes = toBinary(date.getMinutes())
    const seconds = toBinary(date.getSeconds())
    return `${hours} : ${minutes} : ${seconds}`
  }

  const formatDateBinary = (date: Date): string => {
    const year = toBinary(date.getFullYear())
    const month = toBinary(date.getMonth() + 1)
    const day = toBinary(date.getDate())
    return `${year} - ${month} - ${day}`
  }

  return (
    <div className="clock-container">
      <div className="clock-time glitch" title={formatTime(time)}>
        {showBinary ? formatTimeBinary(time) : formatTime(time)}
      </div>
      <div className="clock-date mb-8">{showBinary ? formatDateBinary(time) : formatDate(time)}</div>

      <button className="terminal-button" onClick={() => setShowBinary(!showBinary)}>
        {showBinary ? "Show Normal" : "Show Binary"}
      </button>
    </div>
  )
}

