import { useState } from 'react'
import { motion } from 'framer-motion'
import { toast } from 'react-hot-toast'
import { 
  Search, 
  FileText, 
  Clock, 
  CheckCircle, 
  XCircle, 
  AlertCircle,
  Calendar,
  Building,
  DollarSign,
  Phone,
  Mail,
  Download,
  RefreshCw
} from 'lucide-react'

const StatusTracker = ({ darkMode }) => {
  const [searchNumber, setSearchNumber] = useState('')
  const [isSearching, setIsSearching] = useState(false)
  const [application, setApplication] = useState(null)

  // Моковые данные для демонстрации
  const mockApplication = {
    id: 'APP-2025-001',
    status: 'approved', // pending, approved, rejected, processing
    submittedDate: '2025-01-15',
    company: 'Київводоканал',
    clientName: 'Іванов Іван Іванович',
    debtAmount: 15000,
    monthlyPayment: 1250,
    repaymentPeriod: 12,
    phone: '+380 44 123 45 67',
    email: 'ivanov@example.com',
    contractNumber: 'Р-20250115001',
    lastUpdate: '2025-01-20',
    comments: 'Договір затверджено. Очікується підписання з боку підприємства.'
  }

  const statusConfig = {
    pending: {
      label: 'На розгляді',
      color: darkMode ? 'text-yellow-400' : 'text-yellow-600',
      bgColor: darkMode ? 'bg-yellow-900/20' : 'bg-yellow-50',
      borderColor: darkMode ? 'border-yellow-700' : 'border-yellow-200',
      icon: Clock
    },
    processing: {
      label: 'Обробляється',
      color: darkMode ? 'text-primary-400' : 'text-primary-600',
      bgColor: darkMode ? 'bg-primary-900/20' : 'bg-primary-50',
      borderColor: darkMode ? 'border-primary-700' : 'border-primary-200',
      icon: RefreshCw
    },
    approved: {
      label: 'Затверджено',
      color: darkMode ? 'text-green-400' : 'text-green-600',
      bgColor: darkMode ? 'bg-green-900/20' : 'bg-green-50',
      borderColor: darkMode ? 'border-green-700' : 'border-green-200',
      icon: CheckCircle
    },
    rejected: {
      label: 'Відхилено',
      color: darkMode ? 'text-red-400' : 'text-red-600',
      bgColor: darkMode ? 'bg-red-900/20' : 'bg-red-50',
      borderColor: darkMode ? 'border-red-700' : 'border-red-200',
      icon: XCircle
    }
  }

  const handleSearch = async () => {
    if (!searchNumber.trim()) {
      toast.error('Введіть номер заявки')
      return
    }

    setIsSearching(true)
    
    // Симуляция поиска
    setTimeout(() => {
      setIsSearching(false)
      setApplication(mockApplication)
      toast.success('Заявку знайдено!')
    }, 1500)
  }

  const getStatusIcon = (status) => {
    const config = statusConfig[status]
    const Icon = config.icon
    return <Icon size={20} className={config.color} />
  }

  const getStatusLabel = (status) => {
    return statusConfig[status]?.label || 'Невідомий статус'
  }

  const getStatusStyle = (status) => {
    const config = statusConfig[status]
    return `${config.bgColor} ${config.borderColor} border rounded-lg p-3`
  }

  const handleDownloadContract = () => {
    toast.success('Договір завантажено!')
  }

  const handleRefresh = () => {
    if (application) {
      setIsSearching(true)
      setTimeout(() => {
        setIsSearching(false)
        toast.success('Статус оновлено!')
      }, 1000)
    }
  }

  return (
    <div className={`min-h-screen py-12 transition-colors duration-300 ${
      darkMode ? 'bg-gray-900' : 'bg-gray-50'
    }`}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-6 ${
            darkMode ? 'bg-primary-900' : 'bg-primary-100'
          }`}>
            <Search className="w-8 h-8 text-primary-600" />
          </div>
          <h1 className={`text-4xl font-bold mb-4 ${
            darkMode ? 'text-white' : 'text-gray-900'
          }`}>
            Статус заявки
          </h1>
          <p className={`text-lg ${
            darkMode ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Перевірте статус вашої заявки на реструктуризацію
          </p>
        </motion.div>

        {/* Search Form */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className={`p-8 rounded-2xl shadow-soft mb-8 ${
            darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white'
          }`}
        >
          <div className="max-w-md mx-auto">
            <label className={`block text-sm font-medium mb-2 ${
              darkMode ? 'text-gray-300' : 'text-gray-700'
            }`}>
              Номер заявки
            </label>
            <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
              <input
                type="text"
                value={searchNumber}
                onChange={(e) => setSearchNumber(e.target.value)}
                placeholder="APP-2025-001"
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors ${
                  darkMode 
                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                }`}
              />
              <button
                onClick={handleSearch}
                disabled={isSearching}
                className="w-full sm:w-auto bg-primary-600 hover:bg-primary-700 disabled:bg-primary-400 text-white px-6 py-3 rounded-lg transition-colors flex items-center justify-center space-x-2"
              >
                {isSearching ? (
                  <RefreshCw className="w-5 h-5 animate-spin" />
                ) : (
                  <Search className="w-5 h-5" />
                )}
                <span>{isSearching ? 'Пошук...' : 'Знайти'}</span>
              </button>
            </div>
          </div>
        </motion.div>

        {/* Application Details */}
        {application && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className={`p-8 rounded-2xl shadow-soft ${
              darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white'
            }`}
          >
            {/* Header with Status */}
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className={`text-2xl font-bold mb-2 ${
                  darkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  Заявка {application.id}
                </h2>
                <p className={`${
                  darkMode ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  Подана: {new Date(application.submittedDate).toLocaleDateString('uk-UA')}
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <button
                  onClick={handleRefresh}
                  disabled={isSearching}
                  className={`p-2 rounded-lg transition-colors ${
                    darkMode 
                      ? 'text-gray-400 hover:bg-gray-700' 
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <RefreshCw className={`w-5 h-5 ${isSearching ? 'animate-spin' : ''}`} />
                </button>
                <div className={getStatusStyle(application.status)}>
                  <div className="flex items-center space-x-2">
                    {getStatusIcon(application.status)}
                    <span className={`font-medium ${statusConfig[application.status].color}`}>
                      {getStatusLabel(application.status)}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Application Info Grid */}
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              {/* Company Info */}
              <div className={`p-6 rounded-xl ${
                darkMode ? 'bg-gray-700/50' : 'bg-gray-50'
              }`}>
                <div className="flex items-center space-x-3 mb-4">
                  <Building className={`w-6 h-6 ${
                    darkMode ? 'text-primary-400' : 'text-primary-600'
                  }`} />
                  <h3 className={`font-semibold ${
                    darkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                    Комунальне підприємство
                  </h3>
                </div>
                <p className={`${
                  darkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  {application.company}
                </p>
              </div>

              {/* Client Info */}
              <div className={`p-6 rounded-xl ${
                darkMode ? 'bg-gray-700/50' : 'bg-gray-50'
              }`}>
                <div className="flex items-center space-x-3 mb-4">
                  <FileText className={`w-6 h-6 ${
                    darkMode ? 'text-primary-400' : 'text-primary-600'
                  }`} />
                  <h3 className={`font-semibold ${
                    darkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                    Заявник
                  </h3>
                </div>
                <p className={`${
                  darkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  {application.clientName}
                </p>
              </div>

              {/* Debt Info */}
              <div className={`p-6 rounded-xl ${
                darkMode ? 'bg-gray-700/50' : 'bg-gray-50'
              }`}>
                <div className="flex items-center space-x-3 mb-4">
                  <DollarSign className={`w-6 h-6 ${
                    darkMode ? 'text-primary-400' : 'text-primary-600'
                  }`} />
                  <h3 className={`font-semibold ${
                    darkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                    Сума боргу
                  </h3>
                </div>
                <div className="space-y-2">
                  <p className={`${
                    darkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    <span className="font-medium">{application.debtAmount} грн</span>
                  </p>
                  <p className={`text-sm ${
                    darkMode ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    Щомісячний платіж: {application.monthlyPayment} грн
                  </p>
                  <p className={`text-sm ${
                    darkMode ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    Період: {application.repaymentPeriod} місяців
                  </p>
                </div>
              </div>

              {/* Contact Info */}
              <div className={`p-6 rounded-xl ${
                darkMode ? 'bg-gray-700/50' : 'bg-gray-50'
              }`}>
                <div className="flex items-center space-x-3 mb-4">
                  <Phone className={`w-6 h-6 ${
                    darkMode ? 'text-primary-400' : 'text-primary-600'
                  }`} />
                  <h3 className={`font-semibold ${
                    darkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                    Контакти
                  </h3>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Phone className={`w-4 h-4 ${
                      darkMode ? 'text-gray-400' : 'text-gray-500'
                    }`} />
                    <span className={`${
                      darkMode ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      {application.phone}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Mail className={`w-4 h-4 ${
                      darkMode ? 'text-gray-400' : 'text-gray-500'
                    }`} />
                    <span className={`${
                      darkMode ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      {application.email}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Contract Info */}
            {application.contractNumber && (
              <div className={`p-6 rounded-xl mb-6 ${
                darkMode ? 'bg-primary-900/20 border border-primary-700' : 'bg-primary-50 border border-primary-200'
              }`}>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className={`font-semibold mb-2 ${
                      darkMode ? 'text-primary-300' : 'text-primary-700'
                    }`}>
                      Номер договору
                    </h3>
                    <p className={`${
                      darkMode ? 'text-primary-200' : 'text-primary-600'
                    }`}>
                      {application.contractNumber}
                    </p>
                  </div>
                  <button
                    onClick={handleDownloadContract}
                    className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center space-x-2"
                  >
                    <Download className="w-4 h-4" />
                    <span>Завантажити</span>
                  </button>
                </div>
              </div>
            )}

            {/* Comments */}
            {application.comments && (
              <div className={`p-6 rounded-xl ${
                darkMode ? 'bg-gray-700/50' : 'bg-gray-50'
              }`}>
                <div className="flex items-center space-x-3 mb-4">
                  <AlertCircle className={`w-6 h-6 ${
                    darkMode ? 'text-primary-400' : 'text-primary-600'
                  }`} />
                  <h3 className={`font-semibold ${
                    darkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                    Коментар
                  </h3>
                </div>
                <p className={`${
                  darkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  {application.comments}
                </p>
                <p className={`text-sm mt-2 ${
                  darkMode ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  Останнє оновлення: {new Date(application.lastUpdate).toLocaleDateString('uk-UA')}
                </p>
              </div>
            )}
          </motion.div>
        )}

        {/* No Results */}
        {!application && !isSearching && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className={`p-12 text-center rounded-2xl shadow-soft ${
              darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white'
            }`}
          >
            <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-6 ${
              darkMode ? 'bg-gray-700' : 'bg-gray-100'
            }`}>
              <FileText className={`w-8 h-8 ${
                darkMode ? 'text-gray-400' : 'text-gray-500'
              }`} />
            </div>
            <h3 className={`text-xl font-semibold mb-2 ${
              darkMode ? 'text-white' : 'text-gray-900'
            }`}>
              Введіть номер заявки
            </h3>
            <p className={`${
              darkMode ? 'text-gray-400' : 'text-gray-600'
            }`}>
              Щоб перевірити статус вашої заявки, введіть її номер у полі вище
            </p>
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default StatusTracker 