"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Trash2 } from "lucide-react"

type Task = {
  id: string
  text: string
  completed: boolean
  createdAt: number
}

export function TaskManager() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [newTask, setNewTask] = useState("")

  useEffect(() => {
    // Load tasks from localStorage
    const savedTasks = localStorage.getItem("retro-tasks")
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks))
    }
  }, [])

  const saveTasks = (updatedTasks: Task[]) => {
    setTasks(updatedTasks)
    localStorage.setItem("retro-tasks", JSON.stringify(updatedTasks))
  }

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newTask.trim()) return

    const task: Task = {
      id: Date.now().toString(),
      text: newTask,
      completed: false,
      createdAt: Date.now(),
    }

    saveTasks([...tasks, task])
    setNewTask("")
  }

  const handleToggleComplete = (id: string) => {
    const updatedTasks = tasks.map((task) => (task.id === id ? { ...task, completed: !task.completed } : task))
    saveTasks(updatedTasks)
  }

  const handleDeleteTask = (id: string) => {
    const updatedTasks = tasks.filter((task) => task.id !== id)
    saveTasks(updatedTasks)
  }

  const handleClearCompleted = () => {
    const updatedTasks = tasks.filter((task) => !task.completed)
    saveTasks(updatedTasks)
  }

  return (
    <div className="task-manager">
      <h2 className="text-xl mb-4 glitch" title="TASK MANAGER">
        TASK MANAGER
      </h2>

      <form onSubmit={handleAddTask} className="mb-6">
        <div className="flex items-center">
          <span className="mr-2">$</span>
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            className="terminal-input"
            placeholder="add-task 'Buy cybernetic implants'"
          />
        </div>
      </form>

      <div className="mb-4">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-lg">Tasks ({tasks.length})</h3>
          {tasks.some((task) => task.completed) && (
            <button className="terminal-button text-sm" onClick={handleClearCompleted}>
              Clear Completed
            </button>
          )}
        </div>

        {tasks.length === 0 ? (
          <div className="text-center py-4 border border-dashed border-secondary">No tasks yet. Add one above.</div>
        ) : (
          <div className="border border-primary">
            {tasks.map((task) => (
              <div key={task.id} className={`task-item ${task.completed ? "completed" : ""}`}>
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => handleToggleComplete(task.id)}
                  className="task-checkbox"
                />
                <span className="flex-1">{task.text}</span>
                <button className="text-secondary hover:text-primary" onClick={() => handleDeleteTask(task.id)}>
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="text-sm">
        <p>Tasks are automatically saved to local storage.</p>
      </div>
    </div>
  )
}

