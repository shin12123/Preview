import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  Calculator as CalcIcon, 
  DollarSign, 
  Calendar, 
  TrendingUp,
  Info,
  Download,
  Share2,
  RefreshCw
} from 'lucide-react'
import { toast } from 'react-hot-toast'

const Calculator = ({ darkMode }) => {
  const [formData, setFormData] = useState({
    debtAmount: '',
    currentMonthlyPayment: '',
    repaymentPeriod: 12,
    interestRate: 0,
    penaltyRate: 0
  })

  const [results, setResults] = useState(null)
  const [isCalculating, setIsCalculating] = useState(false)

  const calculateRestructuring = () => {
    const {
      debtAmount,
      currentMonthlyPayment,
      repaymentPeriod,
      interestRate,
      penaltyRate
    } = formData

    if (!debtAmount || !currentMonthlyPayment) {
      toast.error('Будь ласка, заповніть всі обов\'язкові поля')
      return
    }

    setIsCalculating(true)

    // Симуляция расчета
    setTimeout(() => {
      const debt = parseFloat(debtAmount)
      const currentPayment = parseFloat(currentMonthlyPayment)
      const period = parseInt(repaymentPeriod)
      const interest = parseFloat(interestRate) / 100
      const penalty = parseFloat(penaltyRate) / 100

      // Расчеты
      const totalInterest = debt * interest * (period / 12)
      const totalPenalty = debt * penalty * (period / 12)
      const totalDebt = debt + totalInterest + totalPenalty
      const newMonthlyPayment = totalDebt / period
      const savings = (currentPayment * period) - totalDebt
      const paymentReduction = ((currentPayment - newMonthlyPayment) / currentPayment) * 100

      setResults({
        totalDebt: totalDebt.toFixed(2),
        newMonthlyPayment: newMonthlyPayment.toFixed(2),
        totalInterest: totalInterest.toFixed(2),
        totalPenalty: totalPenalty.toFixed(2),
        savings: savings.toFixed(2),
        paymentReduction: paymentReduction.toFixed(1),
        totalPayments: (newMonthlyPayment * period).toFixed(2)
      })

      setIsCalculating(false)
      toast.success('Розрахунок завершено!')
    }, 1500)
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const resetCalculator = () => {
    setFormData({
      debtAmount: '',
      currentMonthlyPayment: '',
      repaymentPeriod: 12,
      interestRate: 0,
      penaltyRate: 0
    })
    setResults(null)
  }

  const downloadResults = () => {
    if (!results) return

    const content = `
Розрахунок реструктуризації боргу

Сума боргу: ${formData.debtAmount} грн
Поточний щомісячний платіж: ${formData.currentMonthlyPayment} грн
Період погашення: ${formData.repaymentPeriod} місяців

РЕЗУЛЬТАТИ:
Новий щомісячний платіж: ${results.newMonthlyPayment} грн
Загальна сума до сплати: ${results.totalDebt} грн
Економія: ${results.savings} грн
Зменшення платежу: ${results.paymentReduction}%

Дата розрахунку: ${new Date().toLocaleDateString('uk-UA')}
    `

    const blob = new Blob([content], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'розрахунок-реструктуризації.txt'
    a.click()
    URL.revokeObjectURL(url)
    
    toast.success('Результати завантажено!')
  }

  const shareResults = () => {
    if (navigator.share && results) {
      navigator.share({
        title: 'Розрахунок реструктуризації боргу',
        text: `Мій новий щомісячний платіж: ${results.newMonthlyPayment} грн. Економія: ${results.savings} грн`,
        url: window.location.href
      })
    } else {
      navigator.clipboard.writeText(window.location.href)
      toast.success('Посилання скопійовано!')
    }
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
          className="text-center mb-12"
        >
          <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-6 ${
            darkMode ? 'bg-primary-900' : 'bg-primary-100'
          }`}>
            <CalcIcon className="w-8 h-8 text-primary-600" />
          </div>
          <h1 className={`text-4xl font-bold mb-4 ${
            darkMode ? 'text-white' : 'text-gray-900'
          }`}>
            Калькулятор реструктуризації
          </h1>
          <p className={`text-lg ${
            darkMode ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Розрахуйте вигідні умови реструктуризації вашого боргу
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Calculator Form */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className={`p-8 rounded-2xl shadow-soft ${
              darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white'
            }`}
          >
            <h2 className={`text-2xl font-semibold mb-6 ${
              darkMode ? 'text-white' : 'text-gray-900'
            }`}>
              Введіть дані
            </h2>

            <div className="space-y-6">
              {/* Debt Amount */}
              <div>
                <label className={`block text-sm font-medium mb-2 ${
                  darkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Сума боргу (грн) *
                </label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="number"
                    name="debtAmount"
                    value={formData.debtAmount}
                    onChange={handleInputChange}
                    className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors ${
                      darkMode 
                        ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                        : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                    }`}
                    placeholder="Введіть суму боргу"
                  />
                </div>
              </div>

              {/* Current Monthly Payment */}
              <div>
                <label className={`block text-sm font-medium mb-2 ${
                  darkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Поточний щомісячний платіж (грн) *
                </label>
                <div className="relative">
                  <TrendingUp className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="number"
                    name="currentMonthlyPayment"
                    value={formData.currentMonthlyPayment}
                    onChange={handleInputChange}
                    className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors ${
                      darkMode 
                        ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                        : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                    }`}
                    placeholder="Введіть поточний платіж"
                  />
                </div>
              </div>

              {/* Repayment Period */}
              <div>
                <label className={`block text-sm font-medium mb-2 ${
                  darkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Період погашення (місяців)
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <select
                    name="repaymentPeriod"
                    value={formData.repaymentPeriod}
                    onChange={handleInputChange}
                    className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors ${
                      darkMode 
                        ? 'bg-gray-700 border-gray-600 text-white' 
                        : 'bg-white border-gray-300 text-gray-900'
                    }`}
                  >
                    <option value={6}>6 місяців</option>
                    <option value={12}>12 місяців</option>
                    <option value={18}>18 місяців</option>
                    <option value={24}>24 місяці</option>
                    <option value={36}>36 місяців</option>
                  </select>
                </div>
              </div>

              {/* Interest Rate */}
              <div>
                <label className={`block text-sm font-medium mb-2 ${
                  darkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Відсоткова ставка (% річних)
                </label>
                <input
                  type="number"
                  name="interestRate"
                  value={formData.interestRate}
                  onChange={handleInputChange}
                  step="0.1"
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors ${
                    darkMode 
                      ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                      : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                  }`}
                  placeholder="0"
                />
              </div>

              {/* Penalty Rate */}
              <div>
                <label className={`block text-sm font-medium mb-2 ${
                  darkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Штрафна ставка (% річних)
                </label>
                <input
                  type="number"
                  name="penaltyRate"
                  value={formData.penaltyRate}
                  onChange={handleInputChange}
                  step="0.1"
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors ${
                    darkMode 
                      ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                      : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                  }`}
                  placeholder="0"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-4 pt-4">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={calculateRestructuring}
                  disabled={isCalculating}
                  className="flex-1 bg-primary-600 hover:bg-primary-700 disabled:bg-gray-400 text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center space-x-2"
                >
                  {isCalculating ? (
                    <>
                      <RefreshCw className="w-5 h-5 animate-spin" />
                      <span>Розраховуємо...</span>
                    </>
                  ) : (
                    <>
                      <CalcIcon className="w-5 h-5" />
                      <span>Розрахувати</span>
                    </>
                  )}
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={resetCalculator}
                  className={`px-6 py-3 border rounded-lg transition-colors ${
                    darkMode 
                      ? 'border-gray-600 text-gray-300 hover:bg-gray-700' 
                      : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  Скинути
                </motion.button>
              </div>
            </div>
          </motion.div>

          {/* Results */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-6"
          >
            {results ? (
              <div className={`p-8 rounded-2xl shadow-soft ${
                darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white'
              }`}>
                <h2 className={`text-2xl font-semibold mb-6 ${
                  darkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  Результати розрахунку
                </h2>

                <div className="space-y-4">
                  <div className={`p-4 rounded-lg ${
                    darkMode ? 'bg-green-900/20 border border-green-700' : 'bg-green-50 border border-green-200'
                  }`}>
                    <div className="flex items-center justify-between">
                      <span className={`font-medium ${
                        darkMode ? 'text-green-400' : 'text-green-700'
                      }`}>
                        Новий щомісячний платіж
                      </span>
                      <span className={`text-2xl font-bold ${
                        darkMode ? 'text-green-400' : 'text-green-700'
                      }`}>
                        {results.newMonthlyPayment} грн
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className={`p-4 rounded-lg ${
                      darkMode ? 'bg-blue-900/20 border border-blue-700' : 'bg-blue-50 border border-blue-200'
                    }`}>
                      <div className="text-sm text-gray-500 mb-1">Загальна сума</div>
                      <div className={`text-lg font-semibold ${
                        darkMode ? 'text-blue-400' : 'text-blue-700'
                      }`}>
                        {results.totalDebt} грн
                      </div>
                    </div>

                    <div className={`p-4 rounded-lg ${
                      darkMode ? 'bg-yellow-900/20 border border-yellow-700' : 'bg-yellow-50 border border-yellow-200'
                    }`}>
                      <div className="text-sm text-gray-500 mb-1">Економія</div>
                      <div className={`text-lg font-semibold ${
                        darkMode ? 'text-yellow-400' : 'text-yellow-700'
                      }`}>
                        {results.savings} грн
                      </div>
                    </div>
                  </div>

                  <div className={`p-4 rounded-lg ${
                    darkMode ? 'bg-purple-900/20 border border-purple-700' : 'bg-purple-50 border border-purple-200'
                  }`}>
                    <div className="text-center">
                      <div className="text-sm text-gray-500 mb-1">Зменшення платежу</div>
                      <div className={`text-2xl font-bold ${
                        darkMode ? 'text-purple-400' : 'text-purple-700'
                      }`}>
                        {results.paymentReduction}%
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
                        Відсотки за період:
                      </span>
                      <span className={darkMode ? 'text-gray-300' : 'text-gray-900'}>
                        {results.totalInterest} грн
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
                        Штрафи за період:
                      </span>
                      <span className={darkMode ? 'text-gray-300' : 'text-gray-900'}>
                        {results.totalPenalty} грн
                      </span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-3 pt-4">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={downloadResults}
                      className={`flex-1 flex items-center justify-center space-x-2 py-2 px-4 rounded-lg transition-colors ${
                        darkMode 
                          ? 'bg-gray-700 hover:bg-gray-600 text-gray-300' 
                          : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                      }`}
                    >
                      <Download className="w-4 h-4" />
                      <span>Завантажити</span>
                    </motion.button>
                    
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={shareResults}
                      className={`flex-1 flex items-center justify-center space-x-2 py-2 px-4 rounded-lg transition-colors ${
                        darkMode 
                          ? 'bg-gray-700 hover:bg-gray-600 text-gray-300' 
                          : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                      }`}
                    >
                      <Share2 className="w-4 h-4" />
                      <span>Поділитися</span>
                    </motion.button>
                  </div>
                </div>
              </div>
            ) : (
              <div className={`p-8 rounded-2xl shadow-soft ${
                darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white'
              }`}>
                <div className="text-center">
                  <Info className={`w-16 h-16 mx-auto mb-4 ${
                    darkMode ? 'text-gray-600' : 'text-gray-400'
                  }`} />
                  <h3 className={`text-lg font-medium mb-2 ${
                    darkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Введіть дані для розрахунку
                  </h3>
                  <p className={`text-sm ${
                    darkMode ? 'text-gray-500' : 'text-gray-600'
                  }`}>
                    Заповніть форму зліва, щоб отримати детальний розрахунок реструктуризації вашого боргу
                  </p>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default Calculator 