import { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { toast } from 'react-hot-toast'
import { 
  FileText, 
  Download, 
  Eye, 
  EyeOff, 
  CheckCircle, 
  ArrowLeft,
  PenTool,
  Send,
  Calendar,
  DollarSign,
  Building,
  User,
  Phone,
  Mail
} from 'lucide-react'

const ContractPreview = ({ darkMode }) => {
  const location = useLocation()
  const navigate = useNavigate()
  const [isSigned, setIsSigned] = useState(false)
  const [isSending, setIsSending] = useState(false)
  const [showSignature, setShowSignature] = useState(false)

  const { formData, monthlyPayment, company } = location.state || {}

  useEffect(() => {
    if (!formData) {
      navigate('/application')
    }
  }, [formData, navigate])

  if (!formData) {
    return null
  }

  const contractData = {
    contractNumber: `Р-${Date.now()}`,
    date: new Date().toLocaleDateString('uk-UA'),
    company: company,
    client: formData,
    monthlyPayment,
    totalAmount: formData.debtAmount,
    repaymentPeriod: formData.repaymentPeriod
  }

  const handleSign = () => {
    setShowSignature(true)
    // Симуляция процесса подписания
    setTimeout(() => {
      setIsSigned(true)
      setShowSignature(false)
      toast.success('Договір успішно підписано!')
    }, 2000)
  }

  const handleSend = async () => {
    setIsSending(true)
    
    // Симуляция отправки
    setTimeout(() => {
      setIsSending(false)
      toast.success('Договір відправлено в комунальне підприємство!')
      navigate('/status')
    }, 3000)
  }

  const downloadContract = () => {
    // Здесь будет логика генерации PDF
    toast.success('Договір завантажено!')
  }

  return (
    <div className={`min-h-screen py-12 transition-colors duration-300 ${
      darkMode ? 'bg-gray-900' : 'bg-gray-50'
    }`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <button
            onClick={() => navigate('/application')}
            className={`flex items-center mb-4 transition-colors ${
              darkMode ? 'text-gray-400 hover:text-primary-400' : 'text-gray-600 hover:text-primary-600'
            }`}
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Назад до заявки
          </button>
          
          <div className="flex items-center justify-between">
            <div>
              <h1 className={`text-3xl md:text-4xl font-bold mb-2 ${
                darkMode ? 'text-white' : 'text-gray-900'
              }`}>
                Договір реструктуризації
              </h1>
              <p className={`text-lg ${
                darkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>
                Перевірте та підпишіть договір перед відправкою
              </p>
            </div>
            
            <div className={`p-4 rounded-lg max-w-xs sm:max-w-sm md:max-w-md break-words overflow-hidden ${
              darkMode ? 'bg-primary-900/20 border border-primary-700' : 'bg-primary-50 border border-primary-200'
            }`}>
              <p className={`text-sm ${
                darkMode ? 'text-primary-300' : 'text-primary-700'
              }`}>
                Номер договору
              </p>
              <p className={`font-bold truncate text-base sm:text-lg md:text-xl ${
                darkMode ? 'text-primary-200' : 'text-primary-800'
              }`} style={{wordBreak: 'break-all'}}>
                {contractData.contractNumber}
              </p>
            </div>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Contract Preview */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-2"
          >
            <div className={`p-8 rounded-2xl shadow-soft ${
              darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white'
            }`}>
              <div className="text-center mb-8">
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 ${
                  darkMode ? 'bg-primary-900' : 'bg-primary-100'
                }`}>
                  <FileText className={`w-8 h-8 ${
                    darkMode ? 'text-primary-400' : 'text-primary-600'
                  }`} />
                </div>
                <h2 className={`text-2xl font-bold mb-2 ${
                  darkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  Договір реструктуризації боргу
                </h2>
                <p className={`${
                  darkMode ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  Дата: {contractData.date}
                </p>
              </div>

              <div className="space-y-6">
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
                    {contractData.company?.name || 'Не вказано'}
                  </p>
                </div>

                {/* Client Info */}
                <div className={`p-6 rounded-xl ${
                  darkMode ? 'bg-gray-700/50' : 'bg-gray-50'
                }`}>
                  <div className="flex items-center space-x-3 mb-4">
                    <User className={`w-6 h-6 ${
                      darkMode ? 'text-primary-400' : 'text-primary-600'
                    }`} />
                    <h3 className={`font-semibold ${
                      darkMode ? 'text-white' : 'text-gray-900'
                    }`}>
                      Заявник
                    </h3>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <p className={`text-sm ${
                        darkMode ? 'text-gray-400' : 'text-gray-600'
                      }`}>
                        ПІБ
                      </p>
                      <p className={`font-medium ${
                        darkMode ? 'text-gray-300' : 'text-gray-700'
                      }`}>
                        {contractData.client.firstName} {contractData.client.lastName}
                      </p>
                    </div>
                    <div>
                      <p className={`text-sm ${
                        darkMode ? 'text-gray-400' : 'text-gray-600'
                      }`}>
                        Телефон
                      </p>
                      <p className={`font-medium ${
                        darkMode ? 'text-gray-300' : 'text-gray-700'
                      }`}>
                        {contractData.client.phone}
                      </p>
                    </div>
                    <div>
                      <p className={`text-sm ${
                        darkMode ? 'text-gray-400' : 'text-gray-600'
                      }`}>
                        Email
                      </p>
                      <p className={`font-medium ${
                        darkMode ? 'text-gray-300' : 'text-gray-700'
                      }`}>
                        {contractData.client.email}
                      </p>
                    </div>
                    <div>
                      <p className={`text-sm ${
                        darkMode ? 'text-gray-400' : 'text-gray-600'
                      }`}>
                        Адреса
                      </p>
                      <p className={`font-medium ${
                        darkMode ? 'text-gray-300' : 'text-gray-700'
                      }`}>
                        {contractData.client.address}
                      </p>
                    </div>
                  </div>
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
                      Умови реструктуризації
                    </h3>
                  </div>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <p className={`text-sm ${
                        darkMode ? 'text-gray-400' : 'text-gray-600'
                      }`}>
                        Сума боргу
                      </p>
                      <p className={`text-xl font-bold ${
                        darkMode ? 'text-white' : 'text-gray-900'
                      }`}>
                        {contractData.totalAmount} грн
                      </p>
                    </div>
                    <div>
                      <p className={`text-sm ${
                        darkMode ? 'text-gray-400' : 'text-gray-600'
                      }`}>
                        Щомісячний платіж
                      </p>
                      <p className={`text-xl font-bold ${
                        darkMode ? 'text-green-400' : 'text-green-600'
                      }`}>
                        {contractData.monthlyPayment} грн
                      </p>
                    </div>
                    <div>
                      <p className={`text-sm ${
                        darkMode ? 'text-gray-400' : 'text-gray-600'
                      }`}>
                        Період погашення
                      </p>
                      <p className={`text-xl font-bold ${
                        darkMode ? 'text-white' : 'text-gray-900'
                      }`}>
                        {contractData.repaymentPeriod} міс.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Terms */}
                <div className={`p-6 rounded-xl ${
                  darkMode ? 'bg-gray-700/50' : 'bg-gray-50'
                }`}>
                  <h3 className={`font-semibold mb-4 ${
                    darkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                    Умови договору
                  </h3>
                  <div className={`space-y-3 text-sm ${
                    darkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    <p>1. Заявник зобов'язується здійснювати щомісячні платежі у розмірі {contractData.monthlyPayment} грн.</p>
                    <p>2. Період погашення боргу становить {contractData.repaymentPeriod} місяців.</p>
                    <p>3. При порушенні графіку платежів договір може бути розірвано.</p>
                    <p>4. Договір набуває чинності з моменту підписання обома сторонами.</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Actions Sidebar */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="lg:col-span-1"
          >
            <div className={`p-6 rounded-2xl shadow-soft ${
              darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white'
            }`}>
              <h3 className={`text-xl font-semibold mb-6 ${
                darkMode ? 'text-white' : 'text-gray-900'
              }`}>
                Дії з договором
              </h3>

              <div className="space-y-4">
                <button
                  onClick={downloadContract}
                  className={`w-full flex items-center justify-center space-x-2 px-4 py-3 rounded-lg transition-colors ${
                    darkMode 
                      ? 'bg-gray-700 hover:bg-gray-600 text-white' 
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                  }`}
                >
                  <Download className="w-5 h-5" />
                  <span>Завантажити PDF</span>
                </button>

                {!isSigned ? (
                  <button
                    onClick={handleSign}
                    disabled={showSignature}
                    className="w-full bg-primary-600 hover:bg-primary-700 disabled:bg-primary-400 text-white px-4 py-3 rounded-lg transition-colors flex items-center justify-center space-x-2"
                  >
                    {showSignature ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Підписання...</span>
                      </>
                    ) : (
                      <>
                        <PenTool className="w-5 h-5" />
                        <span>Підписати договір</span>
                      </>
                    )}
                  </button>
                ) : (
                  <div className={`p-4 rounded-lg ${
                    darkMode ? 'bg-green-900/20 border border-green-700' : 'bg-green-50 border border-green-200'
                  }`}>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className={`w-5 h-5 ${
                        darkMode ? 'text-green-400' : 'text-green-600'
                      }`} />
                      <span className={`font-medium ${
                        darkMode ? 'text-green-300' : 'text-green-700'
                      }`}>
                        Підписано
                      </span>
                    </div>
                  </div>
                )}

                {isSigned && (
                  <button
                    onClick={handleSend}
                    disabled={isSending}
                    className="w-full bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white px-4 py-3 rounded-lg transition-colors flex items-center justify-center space-x-2"
                  >
                    {isSending ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Відправка...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        <span>Відправити в підприємство</span>
                      </>
                    )}
                  </button>
                )}
              </div>

              <div className={`mt-6 p-4 rounded-lg ${
                darkMode ? 'bg-blue-900/20 border border-blue-700' : 'bg-blue-50 border border-blue-200'
              }`}>
                <h4 className={`font-medium mb-2 ${
                  darkMode ? 'text-blue-300' : 'text-blue-700'
                }`}>
                  Важливо
                </h4>
                <p className={`text-sm ${
                  darkMode ? 'text-blue-200' : 'text-blue-600'
                }`}>
                  Після підписання договір буде автоматично відправлено в комунальне підприємство для затвердження.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default ContractPreview 