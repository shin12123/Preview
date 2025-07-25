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

const ApplicationForm = () => {
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
    <div className="min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-secondary-900 mb-4">
            Заявка на реструктуризацію
          </h1>
          <p className="text-lg text-secondary-600">
            Заповніть форму для подачі заявки на реструктуризацію боргу
          </p>
        </motion.div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => {
              const Icon = step.icon
              const isActive = currentStep === step.number
              const isCompleted = currentStep > step.number
              
              return (
                <div key={step.number} className="flex items-center">
                  <div className={`flex items-center justify-center w-12 h-12 rounded-full border-2 transition-all duration-200 ${
                    isActive 
                      ? 'bg-primary-600 border-primary-600 text-white' 
                      : isCompleted 
                        ? 'bg-success-600 border-success-600 text-white'
                        : 'bg-white border-secondary-300 text-secondary-400'
                  }`}>
                    {isCompleted ? (
                      <CheckCircle size={20} />
                    ) : (
                      <Icon size={20} />
                    )}
                  </div>
                  <div className="ml-3">
                    <p className={`text-sm font-medium ${
                      isActive ? 'text-primary-600' : 'text-secondary-500'
                    }`}>
                      {step.title}
                    </p>
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`w-16 h-0.5 mx-4 ${
                      isCompleted ? 'bg-success-600' : 'bg-secondary-300'
                    }`} />
                  )}
                </div>
              )
            })}
          </div>
        </div>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="card"
        >
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Step 1: Company Selection */}
            {currentStep === 1 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-2">
                    Виберіть комунальне підприємство
                  </label>
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => setIsCompanyDropdownOpen(!isCompanyDropdownOpen)}
                      className="w-full input-field flex items-center justify-between"
                    >
                      <span className={selectedCompany ? 'text-secondary-900' : 'text-secondary-500'}>
                        {selectedCompanyData ? selectedCompanyData.name : 'Оберіть підприємство'}
                      </span>
                      <ChevronDown size={20} className="text-secondary-400" />
                    </button>
                    
                    {isCompanyDropdownOpen && (
                      <div className="absolute z-10 w-full mt-1 bg-white border border-secondary-300 rounded-lg shadow-lg max-h-60 overflow-auto">
                        {companies.map((company) => (
                          <button
                            key={company.id}
                            type="button"
                            onClick={() => handleCompanySelect(company.id)}
                            className="w-full px-4 py-3 text-left hover:bg-secondary-50 border-b border-secondary-100 last:border-b-0"
                          >
                            <div className="font-medium text-secondary-900">{company.name}</div>
                            <div className="text-sm text-secondary-500">{company.city}</div>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                  {errors.company && (
                    <p className="mt-1 text-sm text-red-600">{errors.company.message}</p>
                  )}
                </div>
              </motion.div>
            )}

            {/* Step 2: Personal Information */}
            {currentStep === 2 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-secondary-700 mb-2">
                      Прізвище
                    </label>
                    <input
                      type="text"
                      {...register('lastName', { required: 'Прізвище обов\'язкове' })}
                      className="input-field"
                      placeholder="Введіть прізвище"
                    />
                    {errors.lastName && (
                      <p className="mt-1 text-sm text-red-600">{errors.lastName.message}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-secondary-700 mb-2">
                      Ім'я
                    </label>
                    <input
                      type="text"
                      {...register('firstName', { required: 'Ім\'я обов\'язкове' })}
                      className="input-field"
                      placeholder="Введіть ім'я"
                    />
                    {errors.firstName && (
                      <p className="mt-1 text-sm text-red-600">{errors.firstName.message}</p>
                    )}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-2">
                    Адреса
                  </label>
                  <input
                    type="text"
                    {...register('address', { required: 'Адреса обов\'язкова' })}
                    className="input-field"
                    placeholder="Введіть повну адресу"
                  />
                  {errors.address && (
                    <p className="mt-1 text-sm text-red-600">{errors.address.message}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-2">
                    Номер особового рахунку
                  </label>
                  <input
                    type="text"
                    {...register('accountNumber', { required: 'Номер рахунку обов\'язковий' })}
                    className="input-field"
                    placeholder="Введіть номер особового рахунку"
                  />
                  {errors.accountNumber && (
                    <p className="mt-1 text-sm text-red-600">{errors.accountNumber.message}</p>
                  )}
                </div>
              </motion.div>
            )}

            {/* Step 3: Debt Information */}
            {currentStep === 3 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-2">
                    Сума боргу (грн)
                  </label>
                  <input
                    type="number"
                    {...register('debtAmount', { 
                      required: 'Сума боргу обов\'язкова',
                      min: { value: 1, message: 'Сума повинна бути більше 0' }
                    })}
                    className="input-field"
                    placeholder="Введіть суму боргу"
                  />
                  {errors.debtAmount && (
                    <p className="mt-1 text-sm text-red-600">{errors.debtAmount.message}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-2">
                    Термін погашення (місяців)
                  </label>
                  <select
                    {...register('repaymentPeriod', { required: 'Термін погашення обов\'язковий' })}
                    className="input-field"
                  >
                    <option value="">Оберіть термін</option>
                    <option value="6">6 місяців</option>
                    <option value="12">12 місяців</option>
                    <option value="18">18 місяців</option>
                    <option value="24">24 місяці</option>
                    <option value="36">36 місяців</option>
                  </select>
                  {errors.repaymentPeriod && (
                    <p className="mt-1 text-sm text-red-600">{errors.repaymentPeriod.message}</p>
                  )}
                </div>

                {/* Monthly Payment Calculation */}
                {monthlyPayment > 0 && (
                  <div className="bg-primary-50 border border-primary-200 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-primary-900">Розрахунок щомісячного платежу</h4>
                        <p className="text-sm text-primary-700">
                          Сума боргу: {watchedValues.debtAmount} грн / {watchedValues.repaymentPeriod} міс.
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-primary-900">{monthlyPayment} грн</div>
                        <div className="text-sm text-primary-700">щомісяця</div>
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            )}

            {/* Step 4: Contact Information */}
            {currentStep === 4 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-2">
                    Номер телефону
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
                    className="input-field"
                    placeholder="+380 XX XXX XX XX"
                  />
                  {errors.phone && (
                    <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-2">
                    Email адреса
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
                    className="input-field"
                    placeholder="your@email.com"
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                  )}
                </div>
              </motion.div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between pt-6 border-t border-secondary-200">
              <button
                type="button"
                onClick={prevStep}
                disabled={currentStep === 1}
                className="btn-secondary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Назад
              </button>
              
              {currentStep < steps.length ? (
                <button
                  type="button"
                  onClick={nextStep}
                  disabled={!isValid}
                  className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Далі
                  <ArrowRight size={20} className="ml-2" />
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={!isValid}
                  className="btn-success disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Подати заявку
                  <FileText size={20} className="ml-2" />
                </button>
              )}
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  )
}

export default ApplicationForm 