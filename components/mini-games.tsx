"use client"

import type React from "react"

import { useState, useEffect } from "react"

type GameScores = {
  guessTheNumber: number
  rockPaperScissors: number
}

export function MiniGames() {
  const [scores, setScores] = useState<GameScores>({
    guessTheNumber: 0,
    rockPaperScissors: 0,
  })

  // Guess the Number game state
  const [numberToGuess, setNumberToGuess] = useState<number | null>(null)
  const [guess, setGuess] = useState("")
  const [guessResult, setGuessResult] = useState("")
  const [guessCount, setGuessCount] = useState(0)

  // Rock Paper Scissors game state
  const [playerChoice, setPlayerChoice] = useState<string | null>(null)
  const [computerChoice, setComputerChoice] = useState<string | null>(null)
  const [rpsResult, setRpsResult] = useState("")

  useEffect(() => {
    // Load scores from localStorage
    const savedScores = localStorage.getItem("retro-game-scores")
    if (savedScores) {
      setScores(JSON.parse(savedScores))
    }
  }, [])

  const saveScores = (updatedScores: GameScores) => {
    setScores(updatedScores)
    localStorage.setItem("retro-game-scores", JSON.stringify(updatedScores))
  }

  const resetScores = () => {
    const resetScores = {
      guessTheNumber: 0,
      rockPaperScissors: 0,
    }
    saveScores(resetScores)
  }

  // Guess the Number game functions
  const startNumberGame = () => {
    setNumberToGuess(Math.floor(Math.random() * 100) + 1)
    setGuess("")
    setGuessResult("I'm thinking of a number between 1 and 100...")
    setGuessCount(0)
  }

  const handleGuessSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!numberToGuess) return

    const guessNum = Number.parseInt(guess)
    if (isNaN(guessNum)) {
      setGuessResult("Please enter a valid number.")
      return
    }

    setGuessCount(guessCount + 1)

    if (guessNum === numberToGuess) {
      setGuessResult(`Correct! You guessed it in ${guessCount + 1} tries.`)
      setNumberToGuess(null)

      // Update score
      const updatedScores = {
        ...scores,
        guessTheNumber: scores.guessTheNumber + 1,
      }
      saveScores(updatedScores)
    } else if (guessNum < numberToGuess) {
      setGuessResult("Too low! Try again.")
    } else {
      setGuessResult("Too high! Try again.")
    }

    setGuess("")
  }

  // Rock Paper Scissors game functions
  const playRPS = (choice: string) => {
    const choices = ["rock", "paper", "scissors"]
    const computerIndex = Math.floor(Math.random() * 3)
    const computer = choices[computerIndex]

    setPlayerChoice(choice)
    setComputerChoice(computer)

    let result = ""
    if (choice === computer) {
      result = "It's a tie!"
    } else if (
      (choice === "rock" && computer === "scissors") ||
      (choice === "paper" && computer === "rock") ||
      (choice === "scissors" && computer === "paper")
    ) {
      result = "You win!"

      // Update score
      const updatedScores = {
        ...scores,
        rockPaperScissors: scores.rockPaperScissors + 1,
      }
      saveScores(updatedScores)
    } else {
      result = "Computer wins!"
    }

    setRpsResult(result)
  }

  return (
    <div className="mini-games">
      <h2 className="text-xl mb-4 glitch" title="MINI GAMES">
        MINI GAMES
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Guess the Number Game */}
        <div className="game-container">
          <h3 className="game-title">Guess the Number</h3>
          <div className="flex justify-between items-center mb-4">
            <p>Score: {scores.guessTheNumber}</p>
            <button className="terminal-button text-sm" onClick={resetScores}>
              Reset Scores
            </button>
          </div>

          {!numberToGuess ? (
            <button className="terminal-button" onClick={startNumberGame}>
              Start Game
            </button>
          ) : (
            <form onSubmit={handleGuessSubmit}>
              <p className="mb-2">{guessResult}</p>
              <div className="flex">
                <input
                  type="text"
                  value={guess}
                  onChange={(e) => setGuess(e.target.value)}
                  className="terminal-form-input mr-2"
                  placeholder="Enter your guess..."
                />
                <button type="submit" className="terminal-button">
                  Guess
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Rock Paper Scissors Game */}
        <div className="game-container">
          <h3 className="game-title">Rock Paper Scissors</h3>
          <div className="flex justify-between items-center mb-4">
            <p>Score: {scores.rockPaperScissors}</p>
            <button className="terminal-button text-sm" onClick={resetScores}>
              Reset Scores
            </button>
          </div>

          <div className="mb-4">
            <button className="game-button" onClick={() => playRPS("rock")}>
              Rock
            </button>
            <button className="game-button" onClick={() => playRPS("paper")}>
              Paper
            </button>
            <button className="game-button" onClick={() => playRPS("scissors")}>
              Scissors
            </button>
          </div>

          {playerChoice && computerChoice && (
            <div>
              <p>You chose: {playerChoice}</p>
              <p>Computer chose: {computerChoice}</p>
              <p className="mt-2 text-glow">{rpsResult}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

