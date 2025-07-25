import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Eye, EyeOff, Mail, Lock, User } from 'lucide-react'
import { toast } from 'react-hot-toast'

const LoginPage = () => {
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
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="mx-auto w-16 h-16 bg-gradient-to-r from-blue-600 to-blue-800 rounded-full flex items-center justify-center mb-4">
            <span className="text-white font-bold text-2xl">М</span>
          </div>
          <h2 className="text-3xl font-bold text-secondary-900 mb-2">
            {isLogin ? 'Вхід в систему' : 'Реєстрація'}
          </h2>
          <p className="text-secondary-600">
            {isLogin 
              ? 'Увійдіть в свій особистий кабінет' 
              : 'Створіть новий акаунт для доступу до послуг'
            }
          </p>
        </div>

        <div className="card">
          <form onSubmit={handleSubmit} className="space-y-6">
            {!isLogin && (
              <div>
                <label className="block text-sm font-medium text-secondary-700 mb-2">
                  ПІБ
                </label>
                <div className="relative">
                  <User size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary-400" />
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className="input pl-10"
                    placeholder="Введіть ваше ПІБ"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-secondary-700 mb-2">
                Email
              </label>
              <div className="relative">
                <Mail size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary-400" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="input pl-10"
                  placeholder="Введіть ваш email"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-secondary-700 mb-2">
                Пароль
              </label>
              <div className="relative">
                <Lock size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="input pl-10 pr-10"
                  placeholder="Введіть пароль"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-secondary-400 hover:text-secondary-600"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {!isLogin && (
              <div>
                <label className="block text-sm font-medium text-secondary-700 mb-2">
                  Підтвердження пароля
                </label>
                <div className="relative">
                  <Lock size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className="input pl-10"
                    placeholder="Підтвердіть пароль"
                  />
                </div>
              </div>
            )}

            {isLogin && (
              <div className="flex items-center justify-between">
                <label className="flex items-center">
                  <input type="checkbox" className="mr-2" />
                  <span className="text-sm text-secondary-600">Запам\'ятати мене</span>
                </label>
                <Link to="/forgot-password" className="text-sm text-primary-600 hover:text-primary-500">
                  Забули пароль?
                </Link>
              </div>
            )}

            <button
              type="submit"
              className="w-full btn-primary"
            >
              {isLogin ? 'Увійти' : 'Зареєструватися'}
            </button>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-secondary-200" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-secondary-500">Або</span>
              </div>
            </div>

            <div className="mt-6">
              <button className="w-full btn-secondary">
                Увійти через BankID
              </button>
            </div>
          </div>

          <div className="mt-6 text-center">
            <p className="text-sm text-secondary-600">
              {isLogin ? 'Немає акаунта?' : 'Вже є акаунт?'}{' '}
              <button
                onClick={() => {
                  setIsLogin(!isLogin)
                  setFormData({ email: '', password: '', fullName: '', confirmPassword: '' })
                }}
                className="text-primary-600 hover:text-primary-500 font-medium"
              >
                {isLogin ? 'Зареєструватися' : 'Увійти'}
              </button>
            </p>
          </div>
        </div>

        <div className="text-center">
          <Link to="/" className="text-sm text-secondary-600 hover:text-secondary-500">
            ← Повернутися на головну
          </Link>
        </div>
      </div>
    </div>
  )
}

export default LoginPage 