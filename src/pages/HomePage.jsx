import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  FileText, 
  Calculator, 
  Shield, 
  Clock, 
  CheckCircle,
  ArrowRight,
  Star,
  Users,
  TrendingUp,
  Award,
  Phone,
  Mail,
  MapPin,
  Play,
  Download
} from 'lucide-react'
import { scrollToTop } from '../hooks/useScrollToTop'

const HomePage = ({ darkMode }) => {
  const navigate = useNavigate()

  const handleSubmitApplication = () => {
    scrollToTop()
    navigate('/application')
  }

  const handleCalculatorClick = () => {
    scrollToTop()
    navigate('/calculator')
  }

  const features = [
    {
      icon: FileText,
      title: 'Простий процес',
      description: 'Заповніть заявку онлайн за кілька хвилин'
    },
    {
      icon: Calculator,
      title: 'Розрахунок платежів',
      description: 'Автоматичний розрахунок щомісячних платежів'
    },
    {
      icon: Shield,
      title: 'Безпека',
      description: 'Ваші дані захищені та конфіденційні'
    },
    {
      icon: Clock,
      title: 'Швидкий відгук',
      description: 'Відповідь протягом 24 годин'
    }
  ]

  const stats = [
    { number: '15,000+', label: 'Задоволених клієнтів', icon: Users },
    { number: '95%', label: 'Успішних реструктуризацій', icon: TrendingUp },
    { number: '4.8', label: 'Середній рейтинг', icon: Star },
    { number: '24/7', label: 'Підтримка клієнтів', icon: Award }
  ]

  const testimonials = [
    {
      name: 'Марія Іванова',
      rating: 5,
      text: 'Дуже задоволена роботою компанії! Реструктуризувала борг за комунальні послуги на дуже вигідних умовах.',
      city: 'Київ'
    },
    {
      name: 'Петро Сидоренко',
      rating: 5,
      text: 'Хороший сервіс, все зробили швидко та якісно. Рекомендую всім!',
      city: 'Харків'
    },
    {
      name: 'Анна Коваленко',
      rating: 5,
      text: 'Відмінна робота! Допомогли реструктуризувати борг за електроенергію та воду.',
      city: 'Львів'
    }
  ]

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < rating 
            ? 'text-yellow-400 fill-current' 
            : 'text-gray-300'
        }`}
      />
    ))
  }

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      darkMode 
        ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900' 
        : 'bg-gradient-to-br from-blue-50 to-indigo-100'
    }`}>
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className={`text-5xl md:text-6xl font-bold mb-4 ${
            darkMode ? 'text-white' : 'text-blue-900'
          }`}>
            Мирна Угода
          </h1>
          <p className={`text-2xl md:text-3xl mb-8 ${
            darkMode ? 'text-blue-300' : 'text-blue-700'
          }`}>
            Твій Спокій, Твоя Угода
          </p>
          <div className={`p-8 rounded-2xl shadow-strong max-w-3xl mx-auto ${
            darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white'
          }`}>
            <h2 className={`text-3xl font-semibold mb-4 ${
              darkMode ? 'text-white' : 'text-gray-900'
            }`}>
              Реструктуризація боргів за комунальні послуги
            </h2>
            <p className={`mb-8 text-lg ${
              darkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>
              Отримайте можливість розплатитися з боргами за комунальні послуги 
              на вигідних умовах з розстрочкою платежів
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/application">
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleSubmitApplication}
                  className="bg-primary-600 hover:bg-primary-700 text-white font-semibold py-4 px-8 rounded-xl transition-colors text-lg flex items-center gap-2"
                >
                  Подати заявку
                  <ArrowRight size={20} />
                </motion.button>
              </Link>
              <Link to="/calculator">
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleCalculatorClick}
                  className={`border-2 border-primary-600 text-primary-600 hover:bg-primary-50 font-semibold py-4 px-8 rounded-xl transition-colors text-lg flex items-center gap-2 ${
                    darkMode ? 'hover:bg-primary-900/20' : ''
                  }`}
                >
                  Калькулятор
                  <Calculator size={20} />
                </motion.button>
              </Link>
            </div>
          </div>
        </motion.div>

        {/* Features Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
              className={`p-6 rounded-xl shadow-soft text-center ${
                darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white'
              }`}
            >
              <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${
                darkMode ? 'bg-primary-900' : 'bg-primary-100'
              }`}>
                <feature.icon className="w-8 h-8 text-primary-600" />
              </div>
              <h3 className={`text-xl font-semibold mb-2 ${
                darkMode ? 'text-white' : 'text-gray-900'
              }`}>
                {feature.title}
              </h3>
              <p className={`${
                darkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Stats Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-16"
        >
          <div className={`p-8 rounded-2xl shadow-soft ${
            darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white'
          }`}>
            <h2 className={`text-3xl font-bold text-center mb-8 ${
              darkMode ? 'text-white' : 'text-gray-900'
            }`}>
              Наші досягнення
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                  className="text-center"
                >
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${
                    darkMode ? 'bg-primary-900' : 'bg-primary-100'
                  }`}>
                    <stat.icon className="w-8 h-8 text-primary-600" />
                  </div>
                  <div className={`text-3xl font-bold mb-2 ${
                    darkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                    {stat.number}
                  </div>
                  <div className={`text-sm ${
                    darkMode ? 'text-gray-300' : 'text-gray-600'
                  }`}>
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Testimonials Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mb-16"
        >
          <h2 className={`text-3xl font-bold text-center mb-8 ${
            darkMode ? 'text-white' : 'text-gray-900'
          }`}>
            Відгуки наших клієнтів
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.7 + index * 0.1 }}
                className={`p-6 rounded-xl shadow-soft ${
                  darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white'
                }`}
              >
                <div className="flex mb-4">
                  {renderStars(testimonial.rating)}
                </div>
                <p className={`mb-4 ${
                  darkMode ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  "{testimonial.text}"
                </p>
                <div className="flex items-center justify-between">
                  <div>
                    <div className={`font-semibold ${
                      darkMode ? 'text-white' : 'text-gray-900'
                    }`}>
                      {testimonial.name}
                    </div>
                    <div className={`text-sm ${
                      darkMode ? 'text-gray-400' : 'text-gray-500'
                    }`}>
                      {testimonial.city}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link to="/reviews">
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`border-2 border-primary-600 text-primary-600 hover:bg-primary-50 font-semibold py-3 px-6 rounded-xl transition-colors ${
                  darkMode ? 'hover:bg-primary-900/20' : ''
                }`}
              >
                Дивитися всі відгуки
              </motion.button>
            </Link>
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center"
        >
          <div className={`p-8 rounded-2xl shadow-strong ${
            darkMode ? 'bg-primary-900 border border-primary-700' : 'bg-primary-600'
          } text-white`}>
            <h3 className="text-2xl font-semibold mb-4">
              Готові почати?
            </h3>
            <p className="text-primary-100 mb-6">
              Заповніть заявку прямо зараз і отримайте персональну пропозицію
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/application">
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleSubmitApplication}
                  className="bg-white text-primary-600 font-semibold py-3 px-6 rounded-xl transition-colors flex items-center gap-2"
                >
                  Почати зараз
                  <CheckCircle size={20} />
                </motion.button>
              </Link>
              <Link to="/calculator">
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleCalculatorClick}
                  className="border-2 border-white text-white hover:bg-white hover:text-primary-600 font-semibold py-3 px-6 rounded-xl transition-colors flex items-center gap-2"
                >
                  Розрахувати
                  <Calculator size={20} />
                </motion.button>
              </Link>
            </div>
          </div>
        </motion.div>

        {/* Contact Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.0 }}
          className="mt-16"
        >
          <div className={`p-8 rounded-2xl shadow-soft ${
            darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white'
          }`}>
            <h2 className={`text-3xl font-bold text-center mb-8 ${
              darkMode ? 'text-white' : 'text-gray-900'
            }`}>
              Зв'яжіться з нами
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${
                  darkMode ? 'bg-primary-900' : 'bg-primary-100'
                }`}>
                  <Phone className="w-8 h-8 text-primary-600" />
                </div>
                <h3 className={`font-semibold mb-2 ${
                  darkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  Телефон
                </h3>
                <a 
                  href="tel:+380441234567"
                  className={`hover:text-primary-600 transition-colors ${
                    darkMode ? 'text-gray-300' : 'text-gray-600'
                  }`}
                >
                  +380 44 123 45 67
                </a>
              </div>
              
              <div className="text-center">
                <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${
                  darkMode ? 'bg-primary-900' : 'bg-primary-100'
                }`}>
                  <Mail className="w-8 h-8 text-primary-600" />
                </div>
                <h3 className={`font-semibold mb-2 ${
                  darkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  Email
                </h3>
                <a 
                  href="mailto:info@mirna-ugoda.com"
                  className={`hover:text-primary-600 transition-colors ${
                    darkMode ? 'text-gray-300' : 'text-gray-600'
                  }`}
                >
                  info@mirna-ugoda.com
                </a>
              </div>
              
              <div className="text-center">
                <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${
                  darkMode ? 'bg-primary-900' : 'bg-primary-100'
                }`}>
                  <MapPin className="w-8 h-8 text-primary-600" />
                </div>
                <h3 className={`font-semibold mb-2 ${
                  darkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  Адреса
                </h3>
                <p className={`${
                  darkMode ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  м. Київ, вул. Хрещатик, 1
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default HomePage 