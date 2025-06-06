// src/components/layout/Navbar.js
import { NavLink } from 'react-router-dom'

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="flex gap-6">
        <NavLink to="/" exact="true">
          Overview
        </NavLink>
        <NavLink to="/scenario">
          Scenario
        </NavLink>
      </div>
    </nav>
  )
}
