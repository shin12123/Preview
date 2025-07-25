import { useState } from 'react'
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

const PersonalCabinet = () => {
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
      date: '2024-01-15',
      contractNumber: 'Д-2024-001'
    },
    {
      id: '002',
      company: 'Київтеплоенерго',
      debtAmount: 8500,
      monthlyPayment: 1500,
      status: 'approved',
      date: '2024-01-10',
      contractNumber: 'Д-2024-002'
    },
    {
      id: '003',
      company: 'Київгаз',
      debtAmount: 3200,
      monthlyPayment: 800,
      status: 'rejected',
      date: '2024-01-05',
      contractNumber: 'Д-2024-003'
    }
  ]

  const getStatusInfo = (status) => {
    switch (status) {
      case 'pending':
        return { text: 'На розгляді', color: 'text-warning-600', bg: 'bg-warning-50', icon: Clock }
      case 'approved':
        return { text: 'Схвалено', color: 'text-success-600', bg: 'bg-success-50', icon: CheckCircle }
      case 'rejected':
        return { text: 'Відхилено', color: 'text-error-600', bg: 'bg-error-50', icon: XCircle }
      default:
        return { text: 'Невідомо', color: 'text-secondary-600', bg: 'bg-secondary-50', icon: Clock }
    }
  }

  const handleSaveProfile = () => {
    setIsEditing(false)
    // Здесь будет логика сохранения данных
  }

  const tabs = [
    { id: 'profile', label: 'Профіль', icon: User },
    { id: 'applications', label: 'Мої заявки', icon: FileText },
    { id: 'contracts', label: 'Договори', icon: FileText },
    { id: 'settings', label: 'Налаштування', icon: Settings }
  ]

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-secondary-900 mb-4">
            Особистий кабінет
          </h1>
          <p className="text-lg text-secondary-600">
            Керуйте своїми заявками та договорами
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="card">
              <nav className="space-y-2">
                {tabs.map((tab) => {
                  const Icon = tab.icon
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center px-4 py-3 text-left rounded-lg transition-colors ${
                        activeTab === tab.id
                          ? 'bg-primary-50 text-primary-700 border border-primary-200'
                          : 'text-secondary-600 hover:bg-secondary-50'
                      }`}
                    >
                      <Icon size={20} className="mr-3" />
                      {tab.label}
                    </button>
                  )
                })}
              </nav>

              <div className="mt-6 pt-6 border-t border-secondary-200">
                <button className="w-full flex items-center px-4 py-3 text-left text-error-600 hover:bg-error-50 rounded-lg transition-colors">
                  <LogOut size={20} className="mr-3" />
                  Вийти
                </button>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Profile Tab */}
            {activeTab === 'profile' && (
              <div className="card">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-secondary-900">Особисті дані</h2>
                  <button
                    onClick={() => setIsEditing(!isEditing)}
                    className="btn-secondary flex items-center"
                  >
                    <Edit size={16} className="mr-2" />
                    {isEditing ? 'Скасувати' : 'Редагувати'}
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-secondary-700 mb-2">
                      ПІБ
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={userData.fullName}
                        onChange={(e) => setUserData({...userData, fullName: e.target.value})}
                        className="input"
                      />
                    ) : (
                      <div className="flex items-center p-3 bg-secondary-50 rounded-lg">
                        <User size={20} className="text-secondary-400 mr-3" />
                        <span className="text-secondary-900">{userData.fullName}</span>
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-secondary-700 mb-2">
                      Email
                    </label>
                    {isEditing ? (
                      <input
                        type="email"
                        value={userData.email}
                        onChange={(e) => setUserData({...userData, email: e.target.value})}
                        className="input"
                      />
                    ) : (
                      <div className="flex items-center p-3 bg-secondary-50 rounded-lg">
                        <Mail size={20} className="text-secondary-400 mr-3" />
                        <span className="text-secondary-900">{userData.email}</span>
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-secondary-700 mb-2">
                      Телефон
                    </label>
                    {isEditing ? (
                      <input
                        type="tel"
                        value={userData.phone}
                        onChange={(e) => setUserData({...userData, phone: e.target.value})}
                        className="input"
                      />
                    ) : (
                      <div className="flex items-center p-3 bg-secondary-50 rounded-lg">
                        <Phone size={20} className="text-secondary-400 mr-3" />
                        <span className="text-secondary-900">{userData.phone}</span>
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-secondary-700 mb-2">
                      Адреса
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={userData.address}
                        onChange={(e) => setUserData({...userData, address: e.target.value})}
                        className="input"
                      />
                    ) : (
                      <div className="flex items-center p-3 bg-secondary-50 rounded-lg">
                        <MapPin size={20} className="text-secondary-400 mr-3" />
                        <span className="text-secondary-900">{userData.address}</span>
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-secondary-700 mb-2">
                      Серія та номер паспорта
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={userData.passport}
                        onChange={(e) => setUserData({...userData, passport: e.target.value})}
                        className="input"
                      />
                    ) : (
                      <div className="flex items-center p-3 bg-secondary-50 rounded-lg">
                        <User size={20} className="text-secondary-400 mr-3" />
                        <span className="text-secondary-900">{userData.passport}</span>
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-secondary-700 mb-2">
                      ІПН
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={userData.idNumber}
                        onChange={(e) => setUserData({...userData, idNumber: e.target.value})}
                        className="input"
                      />
                    ) : (
                      <div className="flex items-center p-3 bg-secondary-50 rounded-lg">
                        <User size={20} className="text-secondary-400 mr-3" />
                        <span className="text-secondary-900">{userData.idNumber}</span>
                      </div>
                    )}
                  </div>
                </div>

                {isEditing && (
                  <div className="mt-6 flex justify-end space-x-4">
                    <button
                      onClick={() => setIsEditing(false)}
                      className="btn-secondary"
                    >
                      Скасувати
                    </button>
                    <button
                      onClick={handleSaveProfile}
                      className="btn-primary"
                    >
                      Зберегти
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Applications Tab */}
            {activeTab === 'applications' && (
              <div className="card">
                <h2 className="text-2xl font-bold text-secondary-900 mb-6">Мої заявки</h2>
                
                <div className="space-y-4">
                  {applications.map((app) => {
                    const statusInfo = getStatusInfo(app.status)
                    const StatusIcon = statusInfo.icon
                    
                    return (
                      <div key={app.id} className="border border-secondary-200 rounded-lg p-6">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h3 className="text-lg font-semibold text-secondary-900 mb-2">
                              {app.company}
                            </h3>
                            <p className="text-sm text-secondary-600">
                              Заявка №{app.id} від {new Date(app.date).toLocaleDateString('uk-UA')}
                            </p>
                          </div>
                          <div className={`px-3 py-1 rounded-full text-sm font-medium ${statusInfo.bg} ${statusInfo.color}`}>
                            <div className="flex items-center">
                              <StatusIcon size={16} className="mr-1" />
                              {statusInfo.text}
                            </div>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                          <div className="flex items-center">
                            <DollarSign size={20} className="text-secondary-400 mr-2" />
                            <div>
                              <p className="text-sm text-secondary-600">Сума боргу</p>
                              <p className="font-semibold text-secondary-900">{app.debtAmount.toLocaleString()} грн</p>
                            </div>
                          </div>
                          <div className="flex items-center">
                            <Calendar size={20} className="text-secondary-400 mr-2" />
                            <div>
                              <p className="text-sm text-secondary-600">Щомісячний платіж</p>
                              <p className="font-semibold text-secondary-900">{app.monthlyPayment.toLocaleString()} грн</p>
                            </div>
                          </div>
                          <div className="flex items-center">
                            <FileText size={20} className="text-secondary-400 mr-2" />
                            <div>
                              <p className="text-sm text-secondary-600">Договір</p>
                              <p className="font-semibold text-secondary-900">{app.contractNumber}</p>
                            </div>
                          </div>
                        </div>

                        <div className="flex space-x-3">
                          <button className="btn-secondary flex items-center">
                            <Eye size={16} className="mr-2" />
                            Переглянути
                          </button>
                          <button className="btn-secondary flex items-center">
                            <Download size={16} className="mr-2" />
                            Завантажити
                          </button>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            )}

            {/* Contracts Tab */}
            {activeTab === 'contracts' && (
              <div className="card">
                <h2 className="text-2xl font-bold text-secondary-900 mb-6">Мої договори</h2>
                
                <div className="space-y-4">
                  {applications.filter(app => app.status === 'approved').map((contract) => (
                    <div key={contract.id} className="border border-secondary-200 rounded-lg p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-lg font-semibold text-secondary-900 mb-2">
                            Договір реструктуризації №{contract.contractNumber}
                          </h3>
                          <p className="text-sm text-secondary-600">
                            {contract.company} • Підписано {new Date(contract.date).toLocaleDateString('uk-UA')}
                          </p>
                        </div>
                        <div className="bg-success-50 text-success-600 px-3 py-1 rounded-full text-sm font-medium">
                          Активний
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <p className="text-sm text-secondary-600">Сума боргу</p>
                          <p className="font-semibold text-secondary-900">{contract.debtAmount.toLocaleString()} грн</p>
                        </div>
                        <div>
                          <p className="text-sm text-secondary-600">Щомісячний платіж</p>
                          <p className="font-semibold text-secondary-900">{contract.monthlyPayment.toLocaleString()} грн</p>
                        </div>
                      </div>

                      <div className="flex space-x-3">
                        <button className="btn-primary flex items-center">
                          <Eye size={16} className="mr-2" />
                          Переглянути договір
                        </button>
                        <button className="btn-secondary flex items-center">
                          <Download size={16} className="mr-2" />
                          Завантажити PDF
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Settings Tab */}
            {activeTab === 'settings' && (
              <div className="card">
                <h2 className="text-2xl font-bold text-secondary-900 mb-6">Налаштування</h2>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-secondary-900 mb-4">Сповіщення</h3>
                    <div className="space-y-3">
                      <label className="flex items-center">
                        <input type="checkbox" defaultChecked className="mr-3" />
                        <span>Email сповіщення про статус заявки</span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" defaultChecked className="mr-3" />
                        <span>SMS сповіщення</span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="mr-3" />
                        <span>Push сповіщення в браузері</span>
                      </label>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-secondary-900 mb-4">Безпека</h3>
                    <div className="space-y-3">
                      <button className="btn-secondary">
                        Змінити пароль
                      </button>
                      <button className="btn-secondary">
                        Двофакторна автентифікація
                      </button>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-secondary-900 mb-4">Дані</h3>
                    <div className="space-y-3">
                      <button className="btn-secondary">
                        Експорт моїх даних
                      </button>
                      <button className="btn-error">
                        Видалити акаунт
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default PersonalCabinet 