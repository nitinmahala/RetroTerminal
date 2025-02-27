"use client"

import { Github, Globe, Linkedin, Mail, Twitter } from "lucide-react"
import Link from "next/link"

export function AboutUs() {
  return (
    <div className="about-us">
      <h2 className="text-xl mb-6 glitch" title="ABOUT US">
        ABOUT US
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="border border-primary p-6">
          <div className="text-center mb-6">
            <div className="inline-block w-24 h-24 rounded-full border-2 border-primary mb-4 overflow-hidden">
              <div className="w-full h-full bg-secondary flex items-center justify-center text-3xl">DEV</div>
            </div>
            <h3 className="text-xl mb-1">Nitin Mahala</h3>
            <p className="text-secondary">Full Stack Developer</p>
          </div>

          <div className="space-y-4">
            <p>A passionate developer with expertise in building retro-themed applications and modern web solutions.</p>

            <div className="mt-6">
              <h4 className="text-lg mb-2 border-b border-secondary pb-1">Connect With Me</h4>
              <div className="space-y-2">
                <Link
                  href="https://github.com/nitinmahala"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center hover:text-primary-foreground transition-colors"
                >
                  <Github size={18} className="mr-2" />
                  <span>github.com/yourusername</span>
                </Link>

                <Link
                  href="https://www.linkedin.com/in/mahalanitin/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center hover:text-primary-foreground transition-colors"
                >
                  <Linkedin size={18} className="mr-2" />
                  <span>linkedin.com/in/yourusername</span>
                </Link>

                

                <Link
                  href="https://nitinmahala.netlify.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center hover:text-primary-foreground transition-colors"
                >
                  <Globe size={18} className="mr-2" />
                  <span>Portfolio</span>
                </Link>

                
              </div>
            </div>
          </div>
        </div>

        <div className="border border-primary p-6">
          <h3 className="text-xl mb-4 border-b border-secondary pb-2">About This Project</h3>

          <div className="space-y-4">
            <p>
              Retro Terminal is a nostalgic application that combines the aesthetics of old-school computer terminals
              with modern web functionality.
            </p>

            <p>Built with Next.js and styled with Tailwind CSS, this project features:</p>

            <ul className="list-disc pl-5 space-y-1">
              <li>Binary conversion tools</li>
              <li>Retro-themed notepad</li>
              <li>Task management system</li>
              <li>ASCII-style mini games</li>
              <li>Terminal emulator with commands</li>
              <li>Themed clock with binary display</li>
              <li>Customizable retro styling</li>
            </ul>

            <div className="mt-4 pt-4 border-t border-secondary">
              <h4 className="text-lg mb-2">Project Repository</h4>
              <Link
                href="https://github.com/nitinmahala/RetroTerminal"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center hover:text-primary-foreground transition-colors"
              >
                <Github size={18} className="mr-2" />
                <span>Retro Terminal</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

