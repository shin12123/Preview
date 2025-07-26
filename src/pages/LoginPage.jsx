import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Eye, EyeOff, Mail, Lock, User } from 'lucide-react'
import { toast } from 'react-hot-toast'

const LoginPage = ({ darkMode }) => {
  const [isLogin, setIsLogin] = useState(true)
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    fullName: '',
    confirmPassword: ''
  })
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (isLogin) {
      // Логика входа
      if (formData.email && formData.password) {
        toast.success('Успішний вхід!')
        navigate('/cabinet')
      } else {
        toast.error('Будь ласка, заповніть всі поля')
      }
    } else {
      // Логика регистрации
      if (formData.email && formData.password && formData.fullName && formData.confirmPassword) {
        if (formData.password !== formData.confirmPassword) {
          toast.error('Паролі не співпадають')
          return
        }
        toast.success('Реєстрація успішна!')
        setIsLogin(true)
        setFormData({ email: '', password: '', fullName: '', confirmPassword: '' })
      } else {
        toast.error('Будь ласка, заповніть всі поля')
      }
    }
  }

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div className={`min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-300 ${
      darkMode 
        ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900' 
        : 'bg-gradient-to-br from-blue-50 to-indigo-50'
    }`}>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-md w-full space-y-8"
      >
        <div className="text-center">
          <div className={`mx-auto w-16 h-16 rounded-full flex items-center justify-center mb-6 ${
            darkMode ? 'bg-primary-900' : 'bg-primary-100'
          }`}>
            <span className={`font-bold text-2xl ${
              darkMode ? 'text-primary-400' : 'text-primary-600'
            }`}>
              М
            </span>
          </div>
          <h2 className={`text-3xl font-bold mb-2 ${
            darkMode ? 'text-white' : 'text-gray-900'
          }`}>
            {isLogin ? 'Вхід в систему' : 'Реєстрація'}
          </h2>
          <p className={`${
            darkMode ? 'text-gray-300' : 'text-gray-600'
          }`}>
            {isLogin 
              ? 'Увійдіть в свій особистий кабінет' 
              : 'Створіть новий акаунт для доступу до послуг'
            }
          </p>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className={`p-8 rounded-2xl shadow-soft ${
            darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white'
          }`}
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            {!isLogin && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <label className={`block text-sm font-medium mb-2 ${
                  darkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  ПІБ
                </label>
                <div className="relative">
                  <User className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${
                    darkMode ? 'text-gray-400' : 'text-gray-500'
                  }`} />
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors ${
                      darkMode 
                        ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                        : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                    }`}
                    placeholder="Введіть ваше ПІБ"
                  />
                </div>
              </motion.div>
            )}

            <div>
              <label className={`block text-sm font-medium mb-2 ${
                darkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Email
              </label>
              <div className="relative">
                <Mail className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${
                  darkMode ? 'text-gray-400' : 'text-gray-500'
                }`} />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors ${
                    darkMode 
                      ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                      : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                  }`}
                  placeholder="Введіть ваш email"
                />
              </div>
            </div>

            <div>
              <label className={`block text-sm font-medium mb-2 ${
                darkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Пароль
              </label>
              <div className="relative">
                <Lock className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${
                  darkMode ? 'text-gray-400' : 'text-gray-500'
                }`} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className={`w-full pl-10 pr-12 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors ${
                    darkMode 
                      ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                      : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                  }`}
                  placeholder="Введіть пароль"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className={`absolute right-3 top-1/2 transform -translate-y-1/2 ${
                    darkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {!isLogin && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <label className={`block text-sm font-medium mb-2 ${
                  darkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Підтвердження пароля
                </label>
                <div className="relative">
                  <Lock className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${
                    darkMode ? 'text-gray-400' : 'text-gray-500'
                  }`} />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors ${
                      darkMode 
                        ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                        : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                    }`}
                    placeholder="Підтвердіть пароль"
                  />
                </div>
              </motion.div>
            )}

            {isLogin && (
              <div className="flex items-center justify-between">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className={`w-4 h-4 rounded border-gray-300 ${
                      darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'
                    }`}
                  />
                  <span className={`ml-2 text-sm ${
                    darkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Запам'ятати мене
                  </span>
                </label>
                <Link
                  to="/forgot-password"
                  className={`text-sm ${
                    darkMode ? 'text-primary-400 hover:text-primary-300' : 'text-primary-600 hover:text-primary-700'
                  }`}
                >
                  Забули пароль?
                </Link>
              </div>
            )}

            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors"
            >
              {isLogin ? 'Увійти' : 'Зареєструватися'}
            </motion.button>
          </form>

          <div className="mt-6 text-center">
            <p className={`text-sm ${
              darkMode ? 'text-gray-400' : 'text-gray-600'
            }`}>
              {isLogin ? 'Немає акаунту?' : 'Вже є акаунт?'}
              <button
                onClick={() => {
                  setIsLogin(!isLogin)
                  setFormData({ email: '', password: '', fullName: '', confirmPassword: '' })
                }}
                className={`ml-1 font-medium ${
                  darkMode ? 'text-primary-400 hover:text-primary-300' : 'text-primary-600 hover:text-primary-700'
                }`}
              >
                {isLogin ? 'Зареєструватися' : 'Увійти'}
              </button>
            </p>
          </div>

          {!isLogin && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700"
            >
              <p className={`text-xs text-center ${
                darkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>
                Реєструючись, ви погоджуєтесь з нашими{' '}
                <Link
                  to="/terms"
                  className={`underline ${
                    darkMode ? 'text-primary-400 hover:text-primary-300' : 'text-primary-600 hover:text-primary-700'
                  }`}
                >
                  умовами використання
                </Link>
                {' '}та{' '}
                <Link
                  to="/privacy"
                  className={`underline ${
                    darkMode ? 'text-primary-400 hover:text-primary-300' : 'text-primary-600 hover:text-primary-700'
                  }`}
                >
                  політикою конфіденційності
                </Link>
              </p>
            </motion.div>
          )}
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center"
        >
          <Link
            to="/"
            className={`text-sm ${
              darkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-600 hover:text-gray-700'
            }`}
          >
            ← Повернутися на головну
          </Link>
        </motion.div>
      </motion.div>
    </div>
  )
}

export default LoginPage 