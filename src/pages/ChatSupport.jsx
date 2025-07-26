import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { toast } from 'react-hot-toast'
import { 
  Send, 
  Phone, 
  Mail, 
  MessageCircle, 
  User, 
  Clock,
  CheckCircle,
  AlertCircle,
  FileText,
  Building,
  HelpCircle
} from 'lucide-react'

const ChatSupport = ({ darkMode }) => {
  const [messages, setMessages] = useState([])
  const [newMessage, setNewMessage] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [selectedTopic, setSelectedTopic] = useState('')

  const topics = [
    {
      id: 'general',
      title: 'Загальні питання',
      description: 'Загальна інформація про реструктуризацію',
      icon: HelpCircle
    },
    {
      id: 'application',
      title: 'Подача заявки',
      description: 'Допомога з оформленням заявки',
      icon: FileText
    },
    {
      id: 'contract',
      title: 'Договір реструктуризації',
      description: 'Питання щодо договору',
      icon: FileText
    },
    {
      id: 'payment',
      title: 'Платежі',
      description: 'Питання щодо платежів',
      icon: Building
    },
    {
      id: 'technical',
      title: 'Технічна підтримка',
      description: 'Технічні проблеми з сайтом',
      icon: MessageCircle
    }
  ]

  // Моковые сообщения для демонстрации
  const initialMessages = [
    {
      id: 1,
      text: 'Доброго дня! Чим можу допомогти?',
      sender: 'support',
      timestamp: new Date(Date.now() - 300000),
      avatar: '👨‍💼'
    },
    {
      id: 2,
      text: 'Доброго дня! У мене є питання щодо реструктуризації боргу.',
      sender: 'user',
      timestamp: new Date(Date.now() - 240000),
      avatar: '👤'
    },
    {
      id: 3,
      text: 'Звичайно! Я готовий допомогти вам з питаннями реструктуризації. Що саме вас цікавить?',
      sender: 'support',
      timestamp: new Date(Date.now() - 180000),
      avatar: '👨‍💼'
    }
  ]

  useEffect(() => {
    setMessages(initialMessages)
  }, [])

  const handleSendMessage = () => {
    if (!newMessage.trim()) return

    const userMessage = {
      id: Date.now(),
      text: newMessage,
      sender: 'user',
      timestamp: new Date(),
      avatar: '👤'
    }

    setMessages(prev => [...prev, userMessage])
    setNewMessage('')
    setIsTyping(true)

    // Симуляция ответа поддержки
    setTimeout(() => {
      const supportResponse = getSupportResponse(newMessage)
      const supportMessage = {
        id: Date.now() + 1,
        text: supportResponse,
        sender: 'support',
        timestamp: new Date(),
        avatar: '👨‍💼'
      }
      setMessages(prev => [...prev, supportMessage])
      setIsTyping(false)
    }, 1500)
  }

  const getSupportResponse = (message) => {
    const lowerMessage = message.toLowerCase()
    
    if (lowerMessage.includes('реструктуризація') || lowerMessage.includes('реструктуризация')) {
      return 'Реструктуризація боргу - це процес зміни умов погашення заборгованості. Ми допомагаємо зменшити щомісячні платежі та розтягнути термін погашення на більш комфортний період.'
    }
    
    if (lowerMessage.includes('заявка') || lowerMessage.includes('заявку')) {
      return 'Для подачі заявки перейдіть на сторінку "Подати заявку" та заповніть форму. Вам потрібно буде вказати особисті дані, суму боргу та контактну інформацію.'
    }
    
    if (lowerMessage.includes('договір') || lowerMessage.includes('договор')) {
      return 'Після схвалення заявки ми підготуємо договір реструктуризації. Ви зможете ознайомитися з ним у особистому кабінеті та завантажити для підписання.'
    }
    
    if (lowerMessage.includes('платіж') || lowerMessage.includes('платеж')) {
      return 'Після підписання договору ви будете здійснювати платежі згідно з новим графіком. Сума щомісячного платежу буде меншою, ніж раніше.'
    }
    
    return 'Дякую за ваше повідомлення! Наш спеціаліст детально вивчить ваше питання та надасть відповідь найближчим часом. Якщо питання термінове, можете зателефонувати нам за номером +380 44 123 45 67.'
  }

  const handleTopicSelect = (topicId) => {
    setSelectedTopic(topicId)
    const topic = topics.find(t => t.id === topicId)
    if (topic) {
      toast.success(`Обрано тему: ${topic.title}`)
    }
  }

  const formatTime = (date) => {
    return date.toLocaleTimeString('uk-UA', { 
      hour: '2-digit', 
      minute: '2-digit' 
    })
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
            <MessageCircle className="w-8 h-8 text-primary-600" />
          </div>
          <h1 className={`text-4xl font-bold mb-4 ${
            darkMode ? 'text-white' : 'text-gray-900'
          }`}>
            Підтримка
          </h1>
          <p className={`text-lg ${
            darkMode ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Отримайте допомогу від наших спеціалістів
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Topics Sidebar */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-1"
          >
            <div className={`p-6 rounded-2xl shadow-soft ${
              darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white'
            }`}>
              <h2 className={`text-xl font-semibold mb-6 ${
                darkMode ? 'text-white' : 'text-gray-900'
              }`}>
                Теми звернень
              </h2>
              <div className="space-y-3">
                {topics.map((topic) => (
                  <button
                    key={topic.id}
                    onClick={() => handleTopicSelect(topic.id)}
                    className={`w-full p-4 rounded-xl text-left transition-all duration-200 ${
                      selectedTopic === topic.id
                        ? `${darkMode ? 'bg-primary-900/20 border-primary-700' : 'bg-primary-50 border-primary-200'} border`
                        : `${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'}`
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-lg ${
                        darkMode ? 'bg-gray-700' : 'bg-gray-100'
                      }`}>
                        <topic.icon className={`w-5 h-5 ${
                          darkMode ? 'text-primary-400' : 'text-primary-600'
                        }`} />
                      </div>
                      <div>
                        <h3 className={`font-medium ${
                          darkMode ? 'text-white' : 'text-gray-900'
                        }`}>
                          {topic.title}
                        </h3>
                        <p className={`text-sm ${
                          darkMode ? 'text-gray-400' : 'text-gray-600'
                        }`}>
                          {topic.description}
                        </p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>

              {/* Contact Info */}
              <div className={`mt-8 p-4 rounded-xl ${
                darkMode ? 'bg-gray-700/50' : 'bg-gray-50'
              }`}>
                <h3 className={`font-semibold mb-3 ${
                  darkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  Контакти
                </h3>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Phone className={`w-4 h-4 ${
                      darkMode ? 'text-primary-400' : 'text-primary-600'
                    }`} />
                    <span className={`${
                      darkMode ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      +380 44 123 45 67
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Mail className={`w-4 h-4 ${
                      darkMode ? 'text-primary-400' : 'text-primary-600'
                    }`} />
                    <span className={`${
                      darkMode ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      support@mirna-ugoda.ua
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Chat Area */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="lg:col-span-2"
          >
            <div className={`h-[600px] rounded-2xl shadow-soft flex flex-col ${
              darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white'
            }`}>
              {/* Chat Header */}
              <div className={`p-4 border-b ${
                darkMode ? 'border-gray-700' : 'border-gray-200'
              }`}>
                <div className="flex items-center space-x-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    darkMode ? 'bg-primary-900' : 'bg-primary-100'
                  }`}>
                    <User className={`w-5 h-5 ${
                      darkMode ? 'text-primary-400' : 'text-primary-600'
                    }`} />
                  </div>
                  <div>
                    <h3 className={`font-semibold ${
                      darkMode ? 'text-white' : 'text-gray-900'
                    }`}>
                      Спеціаліст підтримки
                    </h3>
                    <div className="flex items-center space-x-2">
                      <div className={`w-2 h-2 rounded-full ${
                        darkMode ? 'bg-green-400' : 'bg-green-500'
                      }`}></div>
                      <span className={`text-sm ${
                        darkMode ? 'text-gray-400' : 'text-gray-600'
                      }`}>
                        Онлайн
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`max-w-xs lg:max-w-md ${
                      message.sender === 'user' ? 'order-2' : 'order-1'
                    }`}>
                      <div className={`flex items-end space-x-2 ${
                        message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                      }`}>
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${
                          message.sender === 'user' 
                            ? (darkMode ? 'bg-primary-600' : 'bg-primary-500')
                            : (darkMode ? 'bg-gray-600' : 'bg-gray-500')
                        }`}>
                          {message.avatar}
                        </div>
                        <div className={`px-4 py-2 rounded-2xl ${
                          message.sender === 'user'
                            ? `${darkMode ? 'bg-primary-600 text-white' : 'bg-primary-500 text-white'}`
                            : `${darkMode ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-900'}`
                        }`}>
                          <p className="text-sm">{message.text}</p>
                          <p className={`text-xs mt-1 ${
                            message.sender === 'user'
                              ? 'text-primary-100'
                              : darkMode ? 'text-gray-400' : 'text-gray-500'
                          }`}>
                            {formatTime(message.timestamp)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}

                {/* Typing Indicator */}
                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex justify-start"
                  >
                    <div className="max-w-xs lg:max-w-md">
                      <div className="flex items-end space-x-2">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          darkMode ? 'bg-gray-600' : 'bg-gray-500'
                        }`}>
                          👨‍💼
                        </div>
                        <div className={`px-4 py-2 rounded-2xl ${
                          darkMode ? 'bg-gray-700' : 'bg-gray-100'
                        }`}>
                          <div className="flex space-x-1">
                            <div className={`w-2 h-2 rounded-full animate-bounce ${
                              darkMode ? 'bg-gray-400' : 'bg-gray-500'
                            }`}></div>
                            <div className={`w-2 h-2 rounded-full animate-bounce ${
                              darkMode ? 'bg-gray-400' : 'bg-gray-500'
                            }`} style={{ animationDelay: '0.1s' }}></div>
                            <div className={`w-2 h-2 rounded-full animate-bounce ${
                              darkMode ? 'bg-gray-400' : 'bg-gray-500'
                            }`} style={{ animationDelay: '0.2s' }}></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Message Input */}
              <div className={`p-4 border-t ${
                darkMode ? 'border-gray-700' : 'border-gray-200'
              }`}>
                <div className="flex space-x-3">
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder="Введіть ваше повідомлення..."
                    className={`flex-1 px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors ${
                      darkMode 
                        ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                        : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                    }`}
                  />
                  <button
                    onClick={handleSendMessage}
                    disabled={!newMessage.trim()}
                    className="bg-primary-600 hover:bg-primary-700 disabled:bg-primary-400 text-white p-3 rounded-lg transition-colors"
                  >
                    <Send className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default ChatSupport 