import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  FileText, 
  Calculator, 
  Shield, 
  Clock, 
  CheckCircle,
  ArrowRight
} from 'lucide-react'

const HomePage = () => {
  const navigate = useNavigate()

  const handleSubmitApplication = () => {
    navigate('/application')
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl font-bold text-blue-900 mb-4">
            Мирна Угода
          </h1>
          <p className="text-2xl text-blue-700 mb-8">
            Твій Спокій, Твоя Угода
          </p>
          <div className="bg-white p-8 rounded-2xl shadow-xl max-w-2xl mx-auto">
            <h2 className="text-3xl font-semibold text-gray-900 mb-4">
              Реструктуризація боргів за комунальні послуги
            </h2>
            <p className="text-gray-600 mb-8 text-lg">
              Отримайте можливість розплатитися з боргами за комунальні послуги 
              на вигідних умовах з розстрочкою платежів
            </p>
            <Link to="/application">
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleSubmitApplication}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-8 rounded-xl transition-colors text-lg flex items-center gap-2 mx-auto"
              >
                Подати заявку
                <ArrowRight size={20} />
              </motion.button>
            </Link>
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
              className="bg-white p-6 rounded-xl shadow-lg text-center"
            >
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <feature.icon className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center"
        >
          <div className="bg-blue-600 text-white p-8 rounded-2xl">
            <h3 className="text-2xl font-semibold mb-4">
              Готові почати?
            </h3>
            <p className="text-blue-100 mb-6">
              Заповніть заявку прямо зараз і отримайте персональну пропозицію
            </p>
            <Link to="/application">
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleSubmitApplication}
                className="bg-white text-blue-600 font-semibold py-3 px-6 rounded-xl transition-colors flex items-center gap-2 mx-auto"
              >
                Почати зараз
                <CheckCircle size={20} />
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default HomePage 