// import Navbar from "./components/layout/Navbar";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import ScenarioPage from "./pages/ScenarioPage";
// import DashboardPage from "./pages/DashboardPage";

// export default function App() {
//   return (
//     <Router>
//       <Navbar />
//       <Routes>
//         <Route path="/scenario" element={<ScenarioPage />} />
//         <Route path="/dashboard" element={<DashboardPage />} />
//       </Routes>
//     </Router>
//   );
// }

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import OverviewPage from './components/pages/OverviewPage'
import ScenarioPage from './components/pages/ScenarioPage'
import Navbar from './components/Navbar'
// import axios from 'axios';

// axios.defaults.baseURL = process.env.REACT_APP_API_URL;

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<OverviewPage />} />
        <Route path="/scenario" element={<ScenarioPage />} />
      </Routes>
    </Router>
  )
}

export default App

