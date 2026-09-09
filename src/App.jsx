import { Routes, Route } from "react-router-dom"
import NavBar from "./components/dashboard/NavBar"
import Dashboard from "./pages/Dashboard"
import Works from "./pages/Works"
import ProjectArchive from "./pages/ProjectArchive"
import ProjectDetail from "./pages/ProjectDetail"
import Myworld from "./pages/Myworld"
import Studies from "./pages/Studies"

export default function App() {
  return (
    <div className="min-h-screen bg-page">
      <NavBar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/project" element={<Works />} />
        {/* Static segment outranks /project/:slug, so the archive keeps its own URL. */}
        <Route path="/project/all" element={<ProjectArchive />} />
        <Route path="/project/:slug" element={<ProjectDetail />} />
        <Route path="/case-study" element={<Studies />} />
        <Route path="/my-world" element={<Myworld />} />
      </Routes>
    </div>
  )
}
