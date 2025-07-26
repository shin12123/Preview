import { useState } from 'react'
import { motion } from 'framer-motion'
import { toast } from 'react-hot-toast'
import { 
  User, 
  FileText, 
  Clock, 
  CheckCircle, 
  XCircle, 
  Settings, 
  LogOut,
  Edit,
  Eye,
  Download,
  Calendar,
  DollarSign,
  MapPin,
  Phone,
  Mail
} from 'lucide-react'

const PersonalCabinet = ({ darkMode }) => {
  const [activeTab, setActiveTab] = useState('profile')
  const [isEditing, setIsEditing] = useState(false)

  // Моковые данные пользователя
  const [userData, setUserData] = useState({
    fullName: 'Іванов Іван Іванович',
    email: 'ivanov@example.com',
    phone: '+380991234567',
    address: 'м. Київ, вул. Хрещатик, 1',
    passport: 'АА123456',
    idNumber: '1234567890'
  })

  // Моковые данные заявок
  const applications = [
    {
      id: '001',
      company: 'Київводоканал',
      debtAmount: 15000,
      monthlyPayment: 2500,
      status: 'pending',
      date: '2025-01-15',
      contractNumber: 'Д-2025-001'
    },
    {
      id: '002',
      company: 'Київтеплоенерго',
      debtAmount: 8500,
      monthlyPayment: 1500,
      status: 'approved',
      date: '2025-01-10',
      contractNumber: 'Д-2025-002'
    },
    {
      id: '003',
      company: 'Київгаз',
      debtAmount: 3200,
      monthlyPayment: 800,
      status: 'rejected',
      date: '2025-01-05',
      contractNumber: 'Д-2025-003'
    }
  ]

  const getStatusInfo = (status) => {
    switch (status) {
      case 'pending':
        return { 
          text: 'На розгляді', 
          color: darkMode ? 'text-yellow-400' : 'text-yellow-600', 
          bg: darkMode ? 'bg-yellow-900/20' : 'bg-yellow-50', 
          icon: Clock 
        }
      case 'approved':
        return { 
          text: 'Схвалено', 
          color: darkMode ? 'text-green-400' : 'text-green-600', 
          bg: darkMode ? 'bg-green-900/20' : 'bg-green-50', 
          icon: CheckCircle 
        }
      case 'rejected':
        return { 
          text: 'Відхилено', 
          color: darkMode ? 'text-red-400' : 'text-red-600', 
          bg: darkMode ? 'bg-red-900/20' : 'bg-red-50', 
          icon: XCircle 
        }
      default:
        return { 
          text: 'Невідомо', 
          color: darkMode ? 'text-gray-400' : 'text-gray-600', 
          bg: darkMode ? 'bg-gray-700/50' : 'bg-gray-50', 
          icon: Clock 
        }
    }
  }

  const handleSaveProfile = () => {
    setIsEditing(false)
    toast.success('Профіль успішно оновлено!')
  }

  const handleDownloadContract = (contractNumber) => {
    toast.success(`Договір ${contractNumber} завантажено!`)
  }

  const tabs = [
    { id: 'profile', label: 'Профіль', icon: User },
    { id: 'applications', label: 'Мої заявки', icon: FileText },
    { id: 'contracts', label: 'Договори', icon: FileText },
    { id: 'settings', label: 'Налаштування', icon: Settings }
  ]

  return (
    <div className={`min-h-screen py-12 transition-colors duration-300 ${
      darkMode ? 'bg-gray-900' : 'bg-gray-50'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
            <User className="w-8 h-8 text-primary-600" />
          </div>
          <h1 className={`text-4xl font-bold mb-4 ${
            darkMode ? 'text-white' : 'text-gray-900'
          }`}>
            Особистий кабінет
          </h1>
          <p className={`text-lg ${
            darkMode ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Керуйте своїми заявками та договорами
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-1"
          >
            <div className={`p-6 rounded-2xl shadow-soft ${
              darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white'
            }`}>
              {/* User Info */}
              <div className="text-center mb-6">
                <div className={`w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center ${
                  darkMode ? 'bg-primary-900' : 'bg-primary-100'
                }`}>
                  <User className={`w-10 h-10 ${
                    darkMode ? 'text-primary-400' : 'text-primary-600'
                  }`} />
                </div>
                <h3 className={`font-semibold ${
                  darkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  {userData.fullName}
                </h3>
                <p className={`text-sm ${
                  darkMode ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  {userData.email}
                </p>
              </div>

              {/* Navigation Tabs */}
              <nav className="space-y-2">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                      activeTab === tab.id
                        ? `${darkMode ? 'bg-primary-900/20 text-primary-400' : 'bg-primary-50 text-primary-600'}`
                        : `${darkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-50'}`
                    }`}
                  >
                    <tab.icon className="w-5 h-5" />
                    <span className="font-medium">{tab.label}</span>
                  </button>
                ))}
              </nav>

              {/* Logout Button */}
              <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                <button className={`w-full flex items-center justify-center space-x-2 px-4 py-3 rounded-lg transition-colors ${
                  darkMode 
                    ? 'text-red-400 hover:bg-red-900/20' 
                    : 'text-red-600 hover:bg-red-50'
                }`}>
                  <LogOut className="w-5 h-5" />
                  <span>Вийти</span>
                </button>
              </div>
            </div>
          </motion.div>

          {/* Main Content */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="lg:col-span-3"
          >
            <div className={`p-8 rounded-2xl shadow-soft ${
              darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white'
            }`}>
              {/* Profile Tab */}
              {activeTab === 'profile' && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="flex items-center justify-between mb-8">
                    <h2 className={`text-2xl font-bold ${
                      darkMode ? 'text-white' : 'text-gray-900'
                    }`}>
                      Особисті дані
                    </h2>
                    <button
                      onClick={() => setIsEditing(!isEditing)}
                      className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                        darkMode 
                          ? 'text-primary-400 hover:bg-primary-900/20' 
                          : 'text-primary-600 hover:bg-primary-50'
                      }`}
                    >
                      <Edit className="w-4 h-4" />
                      <span>{isEditing ? 'Скасувати' : 'Редагувати'}</span>
                    </button>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className={`block text-sm font-medium mb-2 ${
                        darkMode ? 'text-gray-300' : 'text-gray-700'
                      }`}>
                        ПІБ
                      </label>
                      {isEditing ? (
                        <input
                          type="text"
                          value={userData.fullName}
                          onChange={(e) => setUserData({...userData, fullName: e.target.value})}
                          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors ${
                            darkMode 
                              ? 'bg-gray-700 border-gray-600 text-white' 
                              : 'bg-white border-gray-300 text-gray-900'
                          }`}
                        />
                      ) : (
                        <p className={`${
                          darkMode ? 'text-gray-300' : 'text-gray-700'
                        }`}>
                          {userData.fullName}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className={`block text-sm font-medium mb-2 ${
                        darkMode ? 'text-gray-300' : 'text-gray-700'
                      }`}>
                        Email
                      </label>
                      {isEditing ? (
                        <input
                          type="email"
                          value={userData.email}
                          onChange={(e) => setUserData({...userData, email: e.target.value})}
                          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors ${
                            darkMode 
                              ? 'bg-gray-700 border-gray-600 text-white' 
                              : 'bg-white border-gray-300 text-gray-900'
                          }`}
                        />
                      ) : (
                        <p className={`${
                          darkMode ? 'text-gray-300' : 'text-gray-700'
                        }`}>
                          {userData.email}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className={`block text-sm font-medium mb-2 ${
                        darkMode ? 'text-gray-300' : 'text-gray-700'
                      }`}>
                        Телефон
                      </label>
                      {isEditing ? (
                        <input
                          type="tel"
                          value={userData.phone}
                          onChange={(e) => setUserData({...userData, phone: e.target.value})}
                          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors ${
                            darkMode 
                              ? 'bg-gray-700 border-gray-600 text-white' 
                              : 'bg-white border-gray-300 text-gray-900'
                          }`}
                        />
                      ) : (
                        <p className={`${
                          darkMode ? 'text-gray-300' : 'text-gray-700'
                        }`}>
                          {userData.phone}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className={`block text-sm font-medium mb-2 ${
                        darkMode ? 'text-gray-300' : 'text-gray-700'
                      }`}>
                        Адреса
                      </label>
                      {isEditing ? (
                        <textarea
                          value={userData.address}
                          onChange={(e) => setUserData({...userData, address: e.target.value})}
                          rows={3}
                          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors ${
                            darkMode 
                              ? 'bg-gray-700 border-gray-600 text-white' 
                              : 'bg-white border-gray-300 text-gray-900'
                          }`}
                        />
                      ) : (
                        <p className={`${
                          darkMode ? 'text-gray-300' : 'text-gray-700'
                        }`}>
                          {userData.address}
                        </p>
                      )}
                    </div>
                  </div>

                  {isEditing && (
                    <div className="mt-8 flex justify-end">
                      <button
                        onClick={handleSaveProfile}
                        className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg transition-colors"
                      >
                        Зберегти зміни
                      </button>
                    </div>
                  )}
                </motion.div>
              )}

              {/* Applications Tab */}
              {activeTab === 'applications' && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <h2 className={`text-2xl font-bold mb-8 ${
                    darkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                    Мої заявки
                  </h2>

                  <div className="space-y-6">
                    {applications.map((app) => {
                      const statusInfo = getStatusInfo(app.status)
                      const StatusIcon = statusInfo.icon
                      
                      return (
                        <div key={app.id} className={`p-6 rounded-xl border ${
                          darkMode ? 'bg-gray-700/50 border-gray-600' : 'bg-gray-50 border-gray-200'
                        }`}>
                          <div className="flex items-center justify-between mb-4">
                            <div>
                              <h3 className={`font-semibold ${
                                darkMode ? 'text-white' : 'text-gray-900'
                              }`}>
                                {app.company}
                              </h3>
                              <p className={`text-sm ${
                                darkMode ? 'text-gray-400' : 'text-gray-600'
                              }`}>
                                Заявка №{app.id} від {new Date(app.date).toLocaleDateString('uk-UA')}
                              </p>
                            </div>
                            <div className={`flex items-center space-x-2 px-3 py-1 rounded-full ${statusInfo.bg}`}>
                              <StatusIcon className={`w-4 h-4 ${statusInfo.color}`} />
                              <span className={`text-sm font-medium ${statusInfo.color}`}>
                                {statusInfo.text}
                              </span>
                            </div>
                          </div>

                          <div className="grid md:grid-cols-3 gap-4 mb-4">
                            <div>
                              <p className={`text-sm ${
                                darkMode ? 'text-gray-400' : 'text-gray-600'
                              }`}>
                                Сума боргу
                              </p>
                              <p className={`font-semibold ${
                                darkMode ? 'text-white' : 'text-gray-900'
                              }`}>
                                {app.debtAmount} грн
                              </p>
                            </div>
                            <div>
                              <p className={`text-sm ${
                                darkMode ? 'text-gray-400' : 'text-gray-600'
                              }`}>
                                Щомісячний платіж
                              </p>
                              <p className={`font-semibold ${
                                darkMode ? 'text-white' : 'text-gray-900'
                              }`}>
                                {app.monthlyPayment} грн
                              </p>
                            </div>
                            <div>
                              <p className={`text-sm ${
                                darkMode ? 'text-gray-400' : 'text-gray-600'
                              }`}>
                                Номер договору
                              </p>
                              <p className={`font-semibold ${
                                darkMode ? 'text-white' : 'text-gray-900'
                              }`}>
                                {app.contractNumber}
                              </p>
                            </div>
                          </div>

                          <div className="flex space-x-3">
                            <button className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                              darkMode 
                                ? 'text-primary-400 hover:bg-primary-900/20' 
                                : 'text-primary-600 hover:bg-primary-50'
                            }`}>
                              <Eye className="w-4 h-4" />
                              <span>Переглянути</span>
                            </button>
                            {app.status === 'approved' && (
                              <button 
                                onClick={() => handleDownloadContract(app.contractNumber)}
                                className="flex items-center space-x-2 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors"
                              >
                                <Download className="w-4 h-4" />
                                <span>Завантажити договір</span>
                              </button>
                            )}
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </motion.div>
              )}

              {/* Contracts Tab */}
              {activeTab === 'contracts' && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <h2 className={`text-2xl font-bold mb-8 ${
                    darkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                    Договори
                  </h2>

                  <div className={`p-8 text-center rounded-xl ${
                    darkMode ? 'bg-gray-700/50' : 'bg-gray-50'
                  }`}>
                    <FileText className={`w-16 h-16 mx-auto mb-4 ${
                      darkMode ? 'text-gray-400' : 'text-gray-500'
                    }`} />
                    <h3 className={`text-xl font-semibold mb-2 ${
                      darkMode ? 'text-white' : 'text-gray-900'
                    }`}>
                      Договори відсутні
                    </h3>
                    <p className={`${
                      darkMode ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      Після схвалення заявок тут з'являться ваші договори
                    </p>
                  </div>
                </motion.div>
              )}

              {/* Settings Tab */}
              {activeTab === 'settings' && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <h2 className={`text-2xl font-bold mb-8 ${
                    darkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                    Налаштування
                  </h2>

                  <div className={`p-8 text-center rounded-xl ${
                    darkMode ? 'bg-gray-700/50' : 'bg-gray-50'
                  }`}>
                    <Settings className={`w-16 h-16 mx-auto mb-4 ${
                      darkMode ? 'text-gray-400' : 'text-gray-500'
                    }`} />
                    <h3 className={`text-xl font-semibold mb-2 ${
                      darkMode ? 'text-white' : 'text-gray-900'
                    }`}>
                      Налаштування
                    </h3>
                    <p className={`${
                      darkMode ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      Розділ налаштувань знаходиться в розробці
                    </p>
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default PersonalCabinet 