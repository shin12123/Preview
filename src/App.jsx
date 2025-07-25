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

function App() {
    return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <Header />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/application" element={<ApplicationForm />} />
          <Route path="/contract" element={<ContractPreview />} />
          <Route path="/status" element={<StatusTracker />} />
          <Route path="/chat" element={<ChatSupport />} />
          <Route path="/cabinet" element={<PersonalCabinet />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App 