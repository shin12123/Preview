import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { toast } from 'react-hot-toast'
import { 
  Building, 
  User, 
  MapPin, 
  CreditCard, 
  Calendar, 
  Phone, 
  Mail,
  ChevronDown,
  Calculator,
  FileText,
  ArrowRight,
  CheckCircle
} from 'lucide-react'

const ApplicationForm = ({ darkMode }) => {
  const [currentStep, setCurrentStep] = useState(1)
  const [selectedCompany, setSelectedCompany] = useState('')
  const [isCompanyDropdownOpen, setIsCompanyDropdownOpen] = useState(false)
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
    setValue
  } = useForm({
    mode: 'onChange'
  })

  const watchedValues = watch()

  // Список коммунальных предприятий
  const companies = [
    { id: 'kyivvodokanal', name: 'Київводоканал', city: 'Київ' },
    { id: 'kyivenergo', name: 'Київенерго', city: 'Київ' },
    { id: 'kyivteploenergo', name: 'Київтеплоенерго', city: 'Київ' },
    { id: 'kharkivvodokanal', name: 'Харківводоканал', city: 'Харків' },
    { id: 'kharkivenergo', name: 'Харківенерго', city: 'Харків' },
    { id: 'lvivvodokanal', name: 'Львівводоканал', city: 'Львів' },
    { id: 'lvivenergo', name: 'Львівенерго', city: 'Львів' },
    { id: 'odessavodokanal', name: 'Одесаводоканал', city: 'Одеса' },
    { id: 'odessaenergo', name: 'Одесаенерго', city: 'Одеса' },
  ]

  const selectedCompanyData = companies.find(c => c.id === selectedCompany)

  const steps = [
    { number: 1, title: 'Комунальне підприємство', icon: Building },
    { number: 2, title: 'Особисті дані', icon: User },
    { number: 3, title: 'Інформація про борг', icon: CreditCard },
    { number: 4, title: 'Контактні дані', icon: Phone }
  ]

  const handleCompanySelect = (companyId) => {
    setSelectedCompany(companyId)
    setValue('company', companyId)
    setIsCompanyDropdownOpen(false)
  }

  const calculateMonthlyPayment = () => {
    const debtAmount = parseFloat(watchedValues.debtAmount) || 0
    const repaymentPeriod = parseInt(watchedValues.repaymentPeriod) || 12
    
    if (debtAmount > 0 && repaymentPeriod > 0) {
      const monthlyPayment = debtAmount / repaymentPeriod
      return Math.ceil(monthlyPayment)
    }
    return 0
  }

  const monthlyPayment = calculateMonthlyPayment()

  const onSubmit = (data) => {
    console.log('Form data:', data)
    
    // Симуляция отправки данных
    toast.success('Заявку успішно відправлено!')
    
    // Переход к предварительному просмотру договора
    navigate('/contract', { 
      state: { 
        formData: data,
        monthlyPayment,
        company: selectedCompanyData
      }
    })
  }

  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
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
            <FileText className="w-8 h-8 text-primary-600" />
          </div>
          <h1 className={`text-4xl font-bold mb-4 ${
            darkMode ? 'text-white' : 'text-gray-900'
          }`}>
            Подача заявки
          </h1>
          <p className={`text-lg ${
            darkMode ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Заповніть форму для реструктуризації боргу за комунальні послуги
          </p>
        </motion.div>

        {/* Progress Steps */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className={`p-6 rounded-2xl shadow-soft mb-8 ${
            darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white'
          }`}
        >
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.number} className="flex items-center">
                <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-colors ${
                  currentStep >= step.number
                    ? 'bg-primary-600 border-primary-600 text-white'
                    : `${darkMode ? 'border-gray-600 text-gray-400' : 'border-gray-300 text-gray-500'}`
                }`}>
                  {currentStep > step.number ? (
                    <CheckCircle className="w-5 h-5" />
                  ) : (
                    <step.icon className="w-5 h-5" />
                  )}
                </div>
                <div className={`ml-3 ${currentStep >= step.number ? 'block' : 'hidden md:block'}`}>
                  <div className={`text-sm font-medium ${
                    currentStep >= step.number
                      ? darkMode ? 'text-white' : 'text-gray-900'
                      : darkMode ? 'text-gray-400' : 'text-gray-500'
                  }`}>
                    {step.title}
                  </div>
                </div>
                {index < steps.length - 1 && (
                  <div className={`hidden md:block w-16 h-0.5 mx-4 ${
                    currentStep > step.number
                      ? 'bg-primary-600'
                      : darkMode ? 'bg-gray-600' : 'bg-gray-300'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Form */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className={`p-8 rounded-2xl shadow-soft ${
            darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white'
          }`}
        >
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Step 1: Company Selection */}
            {currentStep === 1 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h2 className={`text-2xl font-semibold mb-6 ${
                  darkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  Виберіть комунальне підприємство
                </h2>
                
                <div className="relative">
                  <label className={`block text-sm font-medium mb-2 ${
                    darkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Комунальне підприємство *
                  </label>
                  <button
                    type="button"
                    onClick={() => setIsCompanyDropdownOpen(!isCompanyDropdownOpen)}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors flex items-center justify-between ${
                      darkMode 
                        ? 'bg-gray-700 border-gray-600 text-white [&:-webkit-autofill]:bg-gray-700 [&:-webkit-autofill]:text-white' 
                        : 'bg-white border-gray-300 text-gray-900'
                    }`}
                    style={{
                      WebkitTextFillColor: darkMode ? '#ffffff' : '#111827',
                      WebkitBoxShadow: darkMode ? '0 0 0 1000px #374151 inset' : 'none'
                    }}
                  >
                    <span className={selectedCompany ? '' : darkMode ? 'text-gray-400' : 'text-gray-500'}>
                      {selectedCompany ? selectedCompanyData?.name : 'Оберіть підприємство'}
                    </span>
                    <ChevronDown className={`w-5 h-5 transition-transform ${
                      isCompanyDropdownOpen ? 'rotate-180' : ''
                    }`} />
                  </button>
                  
                  {isCompanyDropdownOpen && (
                    <div className={`absolute z-10 w-full mt-1 border rounded-lg shadow-lg ${
                      darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'
                    }`}>
                      {companies.map((company) => (
                        <button
                          key={company.id}
                          type="button"
                          onClick={() => handleCompanySelect(company.id)}
                          className={`w-full px-4 py-3 text-left hover:bg-primary-50 transition-colors ${
                            darkMode 
                              ? 'text-white hover:bg-primary-900/20' 
                              : 'text-gray-900 hover:bg-primary-50'
                          }`}
                        >
                          <div className="font-medium">{company.name}</div>
                          <div className={`text-sm ${
                            darkMode ? 'text-gray-400' : 'text-gray-500'
                          }`}>
                            {company.city}
                          </div>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            )}

            {/* Step 2: Personal Data */}
            {currentStep === 2 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h2 className={`text-2xl font-semibold mb-6 ${
                  darkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  Особисті дані
                </h2>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${
                      darkMode ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      Прізвище *
                    </label>
                    <input
                      type="text"
                      {...register('lastName', { required: 'Прізвище обов\'язкове' })}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors ${
                        darkMode 
                          ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 [&:-webkit-autofill]:bg-gray-700 [&:-webkit-autofill]:text-white' 
                          : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                      }`}
                      placeholder="Введіть прізвище"
                      style={{
                        WebkitTextFillColor: darkMode ? '#ffffff' : '#111827',
                        WebkitBoxShadow: darkMode ? '0 0 0 1000px #374151 inset' : 'none'
                      }}
                    />
                    {errors.lastName && (
                      <p className="text-red-500 text-sm mt-1">{errors.lastName.message}</p>
                    )}
                  </div>
                  
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${
                      darkMode ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      Ім'я *
                    </label>
                    <input
                      type="text"
                      {...register('firstName', { required: 'Ім\'я обов\'язкове' })}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors ${
                        darkMode 
                          ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 [&:-webkit-autofill]:bg-gray-700 [&:-webkit-autofill]:text-white' 
                          : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                      }`}
                      placeholder="Введіть ім'я"
                      style={{
                        WebkitTextFillColor: darkMode ? '#ffffff' : '#111827',
                        WebkitBoxShadow: darkMode ? '0 0 0 1000px #374151 inset' : 'none'
                      }}
                    />
                    {errors.firstName && (
                      <p className="text-red-500 text-sm mt-1">{errors.firstName.message}</p>
                    )}
                  </div>
                  
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${
                      darkMode ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      По батькові
                    </label>
                    <input
                      type="text"
                      {...register('middleName')}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors ${
                        darkMode 
                          ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 [&:-webkit-autofill]:bg-gray-700 [&:-webkit-autofill]:text-white' 
                          : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                      }`}
                      placeholder="Введіть по батькові"
                      style={{
                        WebkitTextFillColor: darkMode ? '#ffffff' : '#111827',
                        WebkitBoxShadow: darkMode ? '0 0 0 1000px #374151 inset' : 'none'
                      }}
                    />
                  </div>
                  
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${
                      darkMode ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      Дата народження *
                    </label>
                    <input
                      type="date"
                      {...register('birthDate', { required: 'Дата народження обов\'язкова' })}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors ${
                        darkMode 
                          ? 'bg-gray-700 border-gray-600 text-white [&:-webkit-autofill]:bg-gray-700 [&:-webkit-autofill]:text-white' 
                          : 'bg-white border-gray-300 text-gray-900'
                      }`}
                      style={{
                        WebkitTextFillColor: darkMode ? '#ffffff' : '#111827',
                        WebkitBoxShadow: darkMode ? '0 0 0 1000px #374151 inset' : 'none'
                      }}
                    />
                    {errors.birthDate && (
                      <p className="text-red-500 text-sm mt-1">{errors.birthDate.message}</p>
                    )}
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 3: Debt Information */}
            {currentStep === 3 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h2 className={`text-2xl font-semibold mb-6 ${
                  darkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  Інформація про борг
                </h2>
                
                <div className="space-y-6">
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${
                      darkMode ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      Сума боргу (грн) *
                    </label>
                    <input
                      type="number"
                      {...register('debtAmount', { 
                        required: 'Сума боргу обов\'язкова',
                        min: { value: 1, message: 'Сума повинна бути більше 0' }
                      })}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors ${
                        darkMode 
                          ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 [&:-webkit-autofill]:bg-gray-700 [&:-webkit-autofill]:text-white' 
                          : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                      }`}
                      placeholder="Введіть суму боргу"
                      style={{
                        WebkitTextFillColor: darkMode ? '#ffffff' : '#111827',
                        WebkitBoxShadow: darkMode ? '0 0 0 1000px #374151 inset' : 'none'
                      }}
                    />
                    {errors.debtAmount && (
                      <p className="text-red-500 text-sm mt-1">{errors.debtAmount.message}</p>
                    )}
                  </div>
                  
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${
                      darkMode ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      Період погашення (місяців) *
                    </label>
                    <select
                      {...register('repaymentPeriod', { required: 'Період погашення обов\'язковий' })}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors ${
                        darkMode 
                          ? 'bg-gray-700 border-gray-600 text-white [&:-webkit-autofill]:bg-gray-700 [&:-webkit-autofill]:text-white' 
                          : 'bg-white border-gray-300 text-gray-900'
                      }`}
                      style={{
                        WebkitTextFillColor: darkMode ? '#ffffff' : '#111827',
                        WebkitBoxShadow: darkMode ? '0 0 0 1000px #374151 inset' : 'none'
                      }}
                    >
                      <option value="">Оберіть період</option>
                      <option value="6">6 місяців</option>
                      <option value="12">12 місяців</option>
                      <option value="18">18 місяців</option>
                      <option value="24">24 місяці</option>
                      <option value="36">36 місяців</option>
                    </select>
                    {errors.repaymentPeriod && (
                      <p className="text-red-500 text-sm mt-1">{errors.repaymentPeriod.message}</p>
                    )}
                  </div>
                  
                  {monthlyPayment > 0 && (
                    <div className={`p-4 rounded-lg ${
                      darkMode ? 'bg-primary-900/20 border border-primary-700' : 'bg-primary-50 border border-primary-200'
                    }`}>
                      <div className="flex items-center justify-between">
                        <span className={`font-medium ${
                          darkMode ? 'text-primary-300' : 'text-primary-700'
                        }`}>
                          Розрахований щомісячний платіж:
                        </span>
                        <span className={`text-2xl font-bold ${
                          darkMode ? 'text-primary-300' : 'text-primary-700'
                        }`}>
                          {monthlyPayment} грн
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            )}

            {/* Step 4: Contact Information */}
            {currentStep === 4 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h2 className={`text-2xl font-semibold mb-6 ${
                  darkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  Контактні дані
                </h2>
                
                <div className="space-y-6">
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${
                      darkMode ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      Номер телефону *
                    </label>
                    <input
                      type="tel"
                      {...register('phone', { 
                        required: 'Номер телефону обов\'язковий',
                        pattern: {
                          value: /^[\+]?[0-9\s\-\(\)]{10,}$/,
                          message: 'Введіть коректний номер телефону'
                        }
                      })}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors ${
                        darkMode 
                          ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 [&:-webkit-autofill]:bg-gray-700 [&:-webkit-autofill]:text-white' 
                          : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                      }`}
                      placeholder="+380"
                      style={{
                        WebkitTextFillColor: darkMode ? '#ffffff' : '#111827',
                        WebkitBoxShadow: darkMode ? '0 0 0 1000px #374151 inset' : 'none'
                      }}
                    />
                    {errors.phone && (
                      <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
                    )}
                  </div>
                  
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${
                      darkMode ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      Email *
                    </label>
                    <input
                      type="email"
                      {...register('email', { 
                        required: 'Email обов\'язковий',
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: 'Введіть коректний email'
                        }
                      })}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors ${
                        darkMode 
                          ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 [&:-webkit-autofill]:bg-gray-700 [&:-webkit-autofill]:text-white' 
                          : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                      }`}
                      placeholder="example@email.com"
                      style={{
                        WebkitTextFillColor: darkMode ? '#ffffff' : '#111827',
                        WebkitBoxShadow: darkMode ? '0 0 0 1000px #374151 inset' : 'none'
                      }}
                    />
                    {errors.email && (
                      <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                    )}
                  </div>
                  
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${
                      darkMode ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      Адреса *
                    </label>
                    <textarea
                      {...register('address', { required: 'Адреса обов\'язкова' })}
                      rows={3}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors ${
                        darkMode 
                          ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 [&:-webkit-autofill]:bg-gray-700 [&:-webkit-autofill]:text-white' 
                          : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                      }`}
                      placeholder="Введіть повну адресу"
                      style={{
                        WebkitTextFillColor: darkMode ? '#ffffff' : '#111827',
                        WebkitBoxShadow: darkMode ? '0 0 0 1000px #374151 inset' : 'none'
                      }}
                    />
                    {errors.address && (
                      <p className="text-red-500 text-sm mt-1">{errors.address.message}</p>
                    )}
                  </div>
                </div>
              </motion.div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between pt-6">
              <motion.button
                type="button"
                onClick={prevStep}
                disabled={currentStep === 1}
                className={`px-6 py-3 border rounded-lg transition-colors ${
                  currentStep === 1
                    ? `${darkMode ? 'border-gray-700 text-gray-500' : 'border-gray-300 text-gray-400'} cursor-not-allowed`
                    : `${darkMode ? 'border-gray-600 text-gray-300 hover:bg-gray-700' : 'border-gray-300 text-gray-700 hover:bg-gray-50'}`
                }`}
              >
                Назад
              </motion.button>
              
              {currentStep < steps.length ? (
                <motion.button
                  type="button"
                  onClick={nextStep}
                  className="bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center space-x-2"
                >
                  <span>Далі</span>
                  <ArrowRight size={20} />
                </motion.button>
              ) : (
                <motion.button
                  type="submit"
                  className="bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center space-x-2"
                >
                  <span>Відправити заявку</span>
                  <FileText size={20} />
                </motion.button>
              )}
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  )
}

export default ApplicationForm 