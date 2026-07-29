import { Routes, Route } from "react-router-dom"
import NavBar from "./components/dashboard/NavBar"
import Dashboard from "./pages/Dashboard"
import MyProject from "./pages/MyProject"
import Placeholder from "./pages/Placeholder"

export default function App() {
  return (
    <div className="min-h-screen bg-page text-ink">
      <NavBar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/project" element={<MyProject />} />
        <Route path="/case-study" element={<Placeholder title="case study" />} />
        <Route path="/my-world" element={<Placeholder title="my world" />} />
      </Routes>
    </div>
  )
}
