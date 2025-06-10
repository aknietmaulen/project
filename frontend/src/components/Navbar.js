import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { FiMenu, FiX } from 'react-icons/fi'
import logo from '../assets/pypsa-logo.webp'
import './Navbar.css'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => setIsOpen(!isOpen)

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <img src={logo} alt="Logo" className="navbar-logo" />
        <span className="navbar-title">PyPSA-KZ</span>
        <button className="menu-toggle" onClick={toggleMenu}>
          {isOpen ? <FiX size={22} /> : <FiMenu size={22} />}
        </button>
      </div>

      <div className={`navbar-links ${isOpen ? 'open' : ''}`}>
        <NavLink to="/" end onClick={() => setIsOpen(false)}>
          Overview
        </NavLink>
        <NavLink to="/scenario" onClick={() => setIsOpen(false)}>
          Scenario
        </NavLink>
      </div>
    </nav>
  )
}
