import { Routes, Route } from "react-router-dom"
import NavBar from "./components/dashboard/NavBar"
import Dashboard from "./pages/Dashboard"
import Project from "./pages/Project"
import Myworld from "./pages/Myworld"
import Placeholder from "./pages/Placeholder"

export default function App() {
  return (
    <div className="min-h-screen bg-page">
      <NavBar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/project" element={<Project />} />
        <Route path="/case-study" element={<Placeholder title="case study" />} />
        <Route path="/my-world" element={<Myworld />} />
      </Routes>
    </div>
  )
}
