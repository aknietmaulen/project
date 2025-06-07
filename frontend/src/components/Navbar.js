// // src/components/layout/Navbar.js
// import { NavLink } from 'react-router-dom'

// export default function Navbar() {
//   return (
//     <nav className="navbar">
//       <div className="flex gap-6">
//         <NavLink to="/" exact="true">
//           Overview
//         </NavLink>
//         <NavLink to="/scenario">
//           Scenario
//         </NavLink>
//       </div>
//     </nav>
//   )
// }

// src/components/layout/Navbar.js
import { NavLink } from 'react-router-dom'
import logo from '../assets/pypsa-logo.webp'
import './Navbar.css' // подключаем CSS

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <NavLink to="/" end>
          Overview
        </NavLink>
        <NavLink to="/scenario">
          Scenario
        </NavLink>
      </div>
      <div className="navbar-right">
        <img src={logo} alt="Logo" className="navbar-logo" />
        <span className="navbar-title">PyPSA-KZ</span>
      </div>
    </nav>
  )
}
