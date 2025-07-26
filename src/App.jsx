import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import HomePage from './pages/HomePage'
import ApplicationForm from './pages/ApplicationForm'
import ContractPreview from './pages/ContractPreview'
import StatusTracker from './pages/StatusTracker'
import ChatSupport from './pages/ChatSupport'
import PersonalCabinet from './pages/PersonalCabinet'
import LoginPage from './pages/LoginPage'
import FAQ from './pages/FAQ'
import Reviews from './pages/Reviews'
import MapPage from './pages/MapPage'
import Calculator from './pages/Calculator'

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode')
    return saved ? JSON.parse(saved) : false
  })

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode))
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [darkMode])

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      darkMode 
        ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900' 
        : 'bg-gradient-to-br from-blue-50 to-indigo-50'
    }`}>
      <Header darkMode={darkMode} setDarkMode={setDarkMode} />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage darkMode={darkMode} />} />
          <Route path="/application" element={<ApplicationForm darkMode={darkMode} />} />
          <Route path="/contract" element={<ContractPreview darkMode={darkMode} />} />
          <Route path="/status" element={<StatusTracker darkMode={darkMode} />} />
          <Route path="/chat" element={<ChatSupport darkMode={darkMode} />} />
          <Route path="/cabinet" element={<PersonalCabinet darkMode={darkMode} />} />
          <Route path="/login" element={<LoginPage darkMode={darkMode} />} />
          <Route path="/faq" element={<FAQ darkMode={darkMode} />} />
          <Route path="/reviews" element={<Reviews darkMode={darkMode} />} />
          <Route path="/map" element={<MapPage darkMode={darkMode} />} />
          <Route path="/calculator" element={<Calculator darkMode={darkMode} />} />
        </Routes>
      </main>
      <Footer darkMode={darkMode} />
    </div>
  )
}

export default App 