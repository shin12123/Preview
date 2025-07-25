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

const StatusTracker = () => {
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
      color: 'text-warning-600',
      bgColor: 'bg-warning-50',
      borderColor: 'border-warning-200',
      icon: Clock
    },
    processing: {
      label: 'Обробляється',
      color: 'text-primary-600',
      bgColor: 'bg-primary-50',
      borderColor: 'border-primary-200',
      icon: RefreshCw
    },
    approved: {
      label: 'Затверджено',
      color: 'text-success-600',
      bgColor: 'bg-success-50',
      borderColor: 'border-success-200',
      icon: CheckCircle
    },
    rejected: {
      label: 'Відхилено',
      color: 'text-red-600',
      bgColor: 'bg-red-50',
      borderColor: 'border-red-200',
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
    return `${config.bgColor} ${config.borderColor} ${config.color}`
  }

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-secondary-900 mb-4">
            Статус заявки
          </h1>
          <p className="text-lg text-secondary-600">
            Перевірте статус вашої заявки на реструктуризацію
          </p>
        </motion.div>

        {/* Search Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="card mb-8"
        >
          <div className="max-w-md mx-auto">
            <label className="block text-sm font-medium text-secondary-700 mb-2">
              Номер заявки
            </label>
            <div className="flex space-x-3">
              <input
                type="text"
                value={searchNumber}
                onChange={(e) => setSearchNumber(e.target.value)}
                placeholder="Введіть номер заявки (наприклад: APP-2025-001)"
                className="input-field flex-1"
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              />
              <button
                onClick={handleSearch}
                disabled={isSearching}
                className="btn-primary"
              >
                {isSearching ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                ) : (
                  <Search size={20} />
                )}
              </button>
            </div>
            <p className="text-sm text-secondary-500 mt-2">
              Номер заявки було надіслано на ваш email після подачі
            </p>
          </div>
        </motion.div>

        {/* Application Status */}
        {application && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {/* Status Header */}
            <div className={`card ${getStatusStyle(application.status)}`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  {getStatusIcon(application.status)}
                  <div>
                    <h2 className="text-xl font-semibold text-secondary-900">
                      Заявка № {application.id}
                    </h2>
                    <p className="text-sm text-secondary-600">
                      Подана: {new Date(application.submittedDate).toLocaleDateString('uk-UA')}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <div className={`text-lg font-semibold ${statusConfig[application.status].color}`}>
                    {getStatusLabel(application.status)}
                  </div>
                  <div className="text-sm text-secondary-500">
                    Оновлено: {new Date(application.lastUpdate).toLocaleDateString('uk-UA')}
                  </div>
                </div>
              </div>
            </div>

            {/* Application Details */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Left Column */}
              <div className="space-y-6">
                {/* Company Info */}
                <div className="card">
                  <h3 className="text-lg font-semibold text-secondary-900 mb-4 flex items-center">
                    <Building size={20} className="mr-2 text-primary-600" />
                    Комунальне підприємство
                  </h3>
                  <div className="space-y-2">
                    <p className="font-medium">{application.company}</p>
                  </div>
                </div>

                {/* Debt Information */}
                <div className="card">
                  <h3 className="text-lg font-semibold text-secondary-900 mb-4 flex items-center">
                    <DollarSign size={20} className="mr-2 text-primary-600" />
                    Інформація про борг
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-secondary-600">Сума боргу:</span>
                      <span className="font-medium">{application.debtAmount} грн</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-secondary-600">Щомісячний платіж:</span>
                      <span className="font-medium text-success-600">{application.monthlyPayment} грн</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-secondary-600">Термін погашення:</span>
                      <span className="font-medium">{application.repaymentPeriod} місяців</span>
                    </div>
                  </div>
                </div>

                {/* Contact Information */}
                <div className="card">
                  <h3 className="text-lg font-semibold text-secondary-900 mb-4 flex items-center">
                    <Phone size={20} className="mr-2 text-primary-600" />
                    Контактна інформація
                  </h3>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Phone size={16} className="text-secondary-400" />
                      <span className="text-sm">{application.phone}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Mail size={16} className="text-secondary-400" />
                      <span className="text-sm">{application.email}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-6">
                {/* Status Timeline */}
                <div className="card">
                  <h3 className="text-lg font-semibold text-secondary-900 mb-4">
                    Історія статусів
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 bg-success-600 rounded-full"></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-secondary-900">Заявку подано</p>
                        <p className="text-xs text-secondary-500">{application.submittedDate}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 bg-primary-600 rounded-full"></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-secondary-900">На розгляді</p>
                        <p className="text-xs text-secondary-500">2025-01-16</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 bg-success-600 rounded-full"></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-secondary-900">Затверджено</p>
                        <p className="text-xs text-secondary-500">{application.lastUpdate}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Comments */}
                <div className="card">
                  <h3 className="text-lg font-semibold text-secondary-900 mb-4 flex items-center">
                    <AlertCircle size={20} className="mr-2 text-primary-600" />
                    Коментарі
                  </h3>
                  <p className="text-sm text-secondary-600">
                    {application.comments}
                  </p>
                </div>

                {/* Actions */}
                <div className="card">
                  <h3 className="text-lg font-semibold text-secondary-900 mb-4">
                    Дії
                  </h3>
                  <div className="space-y-3">
                    <button className="btn-secondary w-full">
                      <Download size={20} className="mr-2" />
                      Завантажити договір
                    </button>
                    <button className="btn-primary w-full">
                      <Phone size={20} className="mr-2" />
                      Зв'язатися з підтримкою
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Contract Information */}
            {application.contractNumber && (
              <div className="card bg-primary-50 border-primary-200">
                <h3 className="text-lg font-semibold text-primary-900 mb-4 flex items-center">
                  <FileText size={20} className="mr-2" />
                  Інформація про договір
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-primary-700">Номер договору:</p>
                    <p className="font-medium text-primary-900">{application.contractNumber}</p>
                  </div>
                  <div>
                    <p className="text-sm text-primary-700">Дата створення:</p>
                    <p className="font-medium text-primary-900">
                      {new Date(application.submittedDate).toLocaleDateString('uk-UA')}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        )}

        {/* Demo Info */}
        {!application && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="card bg-secondary-50 border-secondary-200"
          >
            <div className="text-center">
              <FileText size={48} className="mx-auto mb-4 text-secondary-400" />
              <h3 className="text-lg font-semibold text-secondary-900 mb-2">
                Демонстраційний режим
              </h3>
              <p className="text-secondary-600 mb-4">
                Для демонстрації функціоналу введіть номер заявки: <strong>APP-2025-001</strong>
              </p>
              <button
                onClick={() => {
                  setSearchNumber('APP-2025-001')
                  handleSearch()
                }}
                className="btn-primary"
              >
                Показати демо
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default StatusTracker 