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

const ContractPreview = () => {
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
    <div className="min-h-screen py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <button
            onClick={() => navigate('/application')}
            className="flex items-center text-secondary-600 hover:text-primary-600 mb-4"
          >
            <ArrowLeft size={20} className="mr-2" />
            Назад до заявки
          </button>
          
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-secondary-900 mb-2">
                Договір реструктуризації
              </h1>
              <p className="text-lg text-secondary-600">
                Перевірте та підпишіть договір перед відправкою
              </p>
            </div>
            <div className="flex space-x-3">
              <button
                onClick={downloadContract}
                className="btn-secondary"
              >
                <Download size={20} className="mr-2" />
                Завантажити
              </button>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contract Preview */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="card"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-secondary-900">
                  Договір реструктуризації боргу
                </h2>
                <div className="text-sm text-secondary-500">
                  № {contractData.contractNumber}
                </div>
              </div>

              {/* Contract Content */}
              <div className="space-y-6 text-secondary-700">
                <div className="border-b border-secondary-200 pb-4">
                  <h3 className="text-lg font-semibold text-secondary-900 mb-3">
                    Сторони договору
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-medium text-secondary-900 mb-2">Комунальне підприємство:</h4>
                      <p className="text-sm">{contractData.company.name}</p>
                      <p className="text-sm text-secondary-500">{contractData.company.city}</p>
                    </div>
                    <div>
                      <h4 className="font-medium text-secondary-900 mb-2">Споживач:</h4>
                      <p className="text-sm">{formData.lastName} {formData.firstName}</p>
                      <p className="text-sm text-secondary-500">{formData.address}</p>
                    </div>
                  </div>
                </div>

                <div className="border-b border-secondary-200 pb-4">
                  <h3 className="text-lg font-semibold text-secondary-900 mb-3">
                    Умови реструктуризації
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center space-x-3">
                      <DollarSign size={20} className="text-primary-600" />
                      <div>
                        <p className="text-sm text-secondary-500">Сума боргу</p>
                        <p className="font-medium">{formData.debtAmount} грн</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Calendar size={20} className="text-primary-600" />
                      <div>
                        <p className="text-sm text-secondary-500">Термін погашення</p>
                        <p className="font-medium">{formData.repaymentPeriod} місяців</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <DollarSign size={20} className="text-success-600" />
                      <div>
                        <p className="text-sm text-secondary-500">Щомісячний платіж</p>
                        <p className="font-medium text-success-600">{monthlyPayment} грн</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Building size={20} className="text-primary-600" />
                      <div>
                        <p className="text-sm text-secondary-500">Особовий рахунок</p>
                        <p className="font-medium">{formData.accountNumber}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border-b border-secondary-200 pb-4">
                  <h3 className="text-lg font-semibold text-secondary-900 mb-3">
                    Зобов'язання сторін
                  </h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-primary-600 rounded-full mt-2 flex-shrink-0"></div>
                      <p>Споживач зобов'язується здійснювати щомісячні платежі у розмірі {monthlyPayment} грн</p>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-primary-600 rounded-full mt-2 flex-shrink-0"></div>
                      <p>Комунальне підприємство зобов'язується не ініціювати судові процеси протягом дії договору</p>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-primary-600 rounded-full mt-2 flex-shrink-0"></div>
                      <p>При порушенні умов договору він може бути розірваний в односторонньому порядку</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-secondary-900 mb-3">
                    Контактна інформація
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center space-x-3">
                      <Phone size={16} className="text-primary-600" />
                      <span className="text-sm">{formData.phone}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Mail size={16} className="text-primary-600" />
                      <span className="text-sm">{formData.email}</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Action Panel */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              {/* Status Card */}
              <div className="card">
                <h3 className="text-lg font-semibold text-secondary-900 mb-4">
                  Статус договору
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <CheckCircle size={20} className="text-success-600" />
                    <span className="text-sm text-secondary-600">Договір створено</span>
                  </div>
                  <div className={`flex items-center space-x-3 ${isSigned ? 'text-success-600' : 'text-secondary-400'}`}>
                    {isSigned ? (
                      <CheckCircle size={20} className="text-success-600" />
                    ) : (
                      <div className="w-5 h-5 border-2 border-secondary-300 rounded-full"></div>
                    )}
                    <span className="text-sm">Підписано</span>
                  </div>
                  <div className="flex items-center space-x-3 text-secondary-400">
                    <div className="w-5 h-5 border-2 border-secondary-300 rounded-full"></div>
                    <span className="text-sm">Відправлено</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="card">
                <h3 className="text-lg font-semibold text-secondary-900 mb-4">
                  Дії
                </h3>
                <div className="space-y-3">
                  {!isSigned ? (
                    <button
                      onClick={handleSign}
                      disabled={showSignature}
                      className="btn-primary w-full"
                    >
                      {showSignature ? (
                        <>
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                          Підписуємо...
                        </>
                      ) : (
                        <>
                          <PenTool size={20} className="mr-2" />
                          Підписати договір
                        </>
                      )}
                    </button>
                  ) : (
                    <button
                      onClick={handleSend}
                      disabled={isSending}
                      className="btn-success w-full"
                    >
                      {isSending ? (
                        <>
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                          Відправляємо...
                        </>
                      ) : (
                        <>
                          <Send size={20} className="mr-2" />
                          Відправити договір
                        </>
                      )}
                    </button>
                  )}
                  
                  <button
                    onClick={downloadContract}
                    className="btn-secondary w-full"
                  >
                    <Download size={20} className="mr-2" />
                    Завантажити PDF
                  </button>
                </div>
              </div>

              {/* Summary */}
              <div className="card bg-primary-50 border-primary-200">
                <h3 className="text-lg font-semibold text-primary-900 mb-4">
                  Підсумок
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-primary-700">Сума боргу:</span>
                    <span className="font-medium">{formData.debtAmount} грн</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-primary-700">Щомісячний платіж:</span>
                    <span className="font-medium text-success-600">{monthlyPayment} грн</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-primary-700">Термін:</span>
                    <span className="font-medium">{formData.repaymentPeriod} міс.</span>
                  </div>
                  <div className="border-t border-primary-200 pt-2 mt-2">
                    <div className="flex justify-between">
                      <span className="text-primary-900 font-medium">Економія:</span>
                      <span className="font-bold text-success-600">
                        ~{Math.round(formData.debtAmount * 0.3)} грн
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ContractPreview 