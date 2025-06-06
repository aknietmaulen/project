// src/components/layout/Navbar.js
import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
    <nav className="bg-blue-900 text-white p-4 flex gap-4">
      <Link to="/">Overview</Link>
      <Link to="/scenario">Scenario</Link>
    </nav>
  )
}
