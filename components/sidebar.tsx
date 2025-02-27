import { Terminal, Binary, FileText, CheckSquare, Gamepad2, Clock, Settings, User } from "lucide-react"

type SidebarProps = {
  activeTab: string
  setActiveTab: (tab: string) => void
}

export function Sidebar({ activeTab, setActiveTab }: SidebarProps) {
  const menuItems = [
    { id: "terminal", label: "Terminal", icon: <Terminal size={18} /> },
    { id: "binary", label: "Binary", icon: <Binary size={18} /> },
    { id: "notes", label: "Notes", icon: <FileText size={18} /> },
    { id: "tasks", label: "Tasks", icon: <CheckSquare size={18} /> },
    { id: "games", label: "Games", icon: <Gamepad2 size={18} /> },
    { id: "clock", label: "Clock", icon: <Clock size={18} /> },
    { id: "settings", label: "Settings", icon: <Settings size={18} /> },
    { id: "about", label: "About Us", icon: <User size={18} /> },
  ]

  return (
    <div className="sidebar">
      <div className="text-center mb-6">
        <h1 className="text-xl font-bold glitch" title="RETRO TERMINAL">
          RETRO TERMINAL
        </h1>
      </div>
      <nav>
        {menuItems.map((item) => (
          <div
            key={item.id}
            className={`sidebar-item flex items-center ${activeTab === item.id ? "active" : ""}`}
            onClick={() => setActiveTab(item.id)}
          >
            <span className="mr-2">{item.icon}</span>
            {item.label}
          </div>
        ))}
      </nav>
    </div>
  )
}

