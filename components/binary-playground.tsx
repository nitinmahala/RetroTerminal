"use client";

import type React from "react";
import { useState, useEffect } from "react";

type Conversion = {
  id: string;
  text: string;
  binary: string;
  timestamp: number;
};

export function BinaryPlayground() {
  const [text, setText] = useState("");
  const [binary, setBinary] = useState("");
  const [history, setHistory] = useState<Conversion[]>([]);
  const [mode, setMode] = useState<"text-to-binary" | "binary-to-text">("text-to-binary");

  useEffect(() => {
    // Load history from localStorage
    const savedHistory = localStorage.getItem("binary-history");
    if (savedHistory) {
      setHistory(JSON.parse(savedHistory));
    }
  }, []);

  const saveToHistory = (text: string, binary: string) => {
    const newConversion: Conversion = {
      id: Date.now().toString(),
      text,
      binary,
      timestamp: Date.now(),
    };
    const updatedHistory = [newConversion, ...history].slice(0, 10); // Keep last 10 conversions
    setHistory(updatedHistory);
    localStorage.setItem("binary-history", JSON.stringify(updatedHistory));
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = e.target.value;
    setText(newText);
    if (mode === "text-to-binary") {
      setBinary(textToBinary(newText));
    }
  };

  const handleBinaryChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newBinary = e.target.value;
    setBinary(newBinary);
    if (mode === "binary-to-text") {
      setText(binaryToText(newBinary));
    }
  };

  const handleModeChange = (newMode: "text-to-binary" | "binary-to-text") => {
    setMode(newMode);
    setText("");
    setBinary("");
  };

  const handleSave = () => {
    if ((mode === "text-to-binary" && text) || (mode === "binary-to-text" && binary)) {
      saveToHistory(text, binary);
    }
  };

  const handleCopy = (content: string) => {
    navigator.clipboard.writeText(content);
  };

  // 🔹 Fixed Binary Conversions
  const textToBinary = (text: string): string => {
    return text
      .split("")
      .map((char) => char.charCodeAt(0).toString(2).padStart(8, "0")) // Convert char to 8-bit binary
      .join(" ");
  };

  const binaryToText = (binary: string): string => {
    return binary
      .trim()
      .split(/\s+/) // Handle multiple spaces properly
      .map((bin) => {
        if (!/^[01]{8}$/.test(bin)) return "�"; // Invalid binary → placeholder
        return String.fromCharCode(parseInt(bin, 2));
      })
      .join("");
  };

  const formatDate = (timestamp: number): string => {
    return new Date(timestamp).toLocaleString();
  };

  return (
    <div className="binary-playground">
      <h2 className="text-xl mb-4 glitch" title="BINARY PLAYGROUND">
        BINARY PLAYGROUND
      </h2>

      <div className="mb-4">
        <div className="flex mb-2">
          <button
            className={`terminal-button mr-2 ${mode === "text-to-binary" ? "bg-opacity-30 bg-primary" : ""}`}
            onClick={() => handleModeChange("text-to-binary")}
          >
            Text → Binary
          </button>
          <button
            className={`terminal-button ${mode === "binary-to-text" ? "bg-opacity-30 bg-primary" : ""}`}
            onClick={() => handleModeChange("binary-to-text")}
          >
            Binary → Text
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block mb-2">{mode === "text-to-binary" ? "Text Input" : "Text Output"}</label>
          <textarea
            className="terminal-textarea"
            value={text}
            onChange={handleTextChange}
            placeholder={mode === "text-to-binary" ? "Enter text here..." : "Binary output as text..."}
            readOnly={mode === "binary-to-text"}
          />
          {mode === "text-to-binary" && (
            <div className="mt-2">
              <button className="terminal-button mr-2" onClick={() => handleCopy(text)}>
                Copy Text
              </button>
            </div>
          )}
        </div>

        <div>
          <label className="block mb-2">{mode === "text-to-binary" ? "Binary Output" : "Binary Input"}</label>
          <textarea
            className="terminal-textarea"
            value={binary}
            onChange={handleBinaryChange}
            placeholder={mode === "binary-to-text" ? "Enter binary here..." : "Text output as binary..."}
            readOnly={mode === "text-to-binary"}
          />
          {mode === "text-to-binary" && (
            <div className="mt-2">
              <button className="terminal-button mr-2" onClick={() => handleCopy(binary)}>
                Copy Binary
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="mt-4">
        <button className="terminal-button" onClick={handleSave}>
          Save Conversion
        </button>
      </div>

      {history.length > 0 && (
        <div className="mt-6">
          <h3 className="text-lg mb-2">Conversion History</h3>
          <div className="border border-primary p-2">
            {history.map((item) => (
              <div key={item.id} className="mb-4 pb-4 border-b border-secondary last:border-b-0">
                <div className="flex justify-between mb-2">
                  <span>{formatDate(item.timestamp)}</span>
                  <div>
                    <button
                      className="terminal-button text-xs mr-2"
                      onClick={() => {
                        setText(item.text);
                        setBinary(item.binary);
                        setMode("text-to-binary");
                      }}
                    >
                      Load
                    </button>
                    <button
                      className="terminal-button text-xs"
                      onClick={() => {
                        const updatedHistory = history.filter((h) => h.id !== item.id);
                        setHistory(updatedHistory);
                        localStorage.setItem("binary-history", JSON.stringify(updatedHistory));
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  <div className="text-sm overflow-hidden">
                    <div className="font-bold mb-1">Text:</div>
                    <div className="truncate">{item.text}</div>
                  </div>
                  <div className="text-sm overflow-hidden">
                    <div className="font-bold mb-1">Binary:</div>
                    <div className="truncate">{item.binary}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
