import { useState, useEffect } from 'react'
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

const ChatSupport = () => {
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

  // Отключен автоматический скролл
  // useEffect(() => {
  //   if (messages.length > initialMessages.length) {
  //     scrollToBottom()
  //   }
  // }, [messages])

  // const scrollToBottom = () => {
  //   // Небольшая задержка для плавного скролла
  //   setTimeout(() => {
  //     messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  //   }, 100)
  // }

  const handleSendMessage = () => {
    if (!newMessage.trim()) return

    const userMessage = {
      id: messages.length + 1,
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
      const supportMessage = {
        id: messages.length + 2,
        text: getSupportResponse(newMessage),
        sender: 'support',
        timestamp: new Date(),
        avatar: '👨‍💼'
      }
      setMessages(prev => [...prev, supportMessage])
      setIsTyping(false)
    }, 2000)
  }

  const getSupportResponse = (message) => {
    const lowerMessage = message.toLowerCase()
    
    if (lowerMessage.includes('реструктуризація') || lowerMessage.includes('реструктуризация')) {
      return 'Реструктуризація - це процес зміни умов погашення заборгованості, який дозволяє розбити великий борг на менші частини та погашати його протягом більш тривалого періоду. Це допомагає уникнути судових процесів та зробити погашення боргу більш доступним.'
    }
    
    if (lowerMessage.includes('заявка') || lowerMessage.includes('заявку')) {
      return 'Для подачі заявки на реструктуризацію вам потрібно заповнити форму на нашому сайті. Вона включає вибір комунального підприємства, особисті дані, інформацію про борг та контактні дані. Після подачі заявки ми автоматично створимо договір реструктуризації.'
    }
    
    if (lowerMessage.includes('договір') || lowerMessage.includes('договор')) {
      return 'Договір реструктуризації генерується автоматично на основі ваших даних. Він містить всі умови реструктуризації, суму боргу, щомісячний платіж та термін погашення. Договір можна підписати електронно за допомогою BankID або Дія.Підпис.'
    }
    
    if (lowerMessage.includes('платіж') || lowerMessage.includes('платеж') || lowerMessage.includes('гроші')) {
      return 'Щомісячний платіж розраховується шляхом ділення суми боргу на термін погашення. Наприклад, якщо борг 12000 грн на 12 місяців, то щомісячний платіж буде 1000 грн. Платежі можна здійснювати через банк, пошту або онлайн.'
    }
    
    if (lowerMessage.includes('термін') || lowerMessage.includes('срок')) {
      return 'Термін реструктуризації зазвичай становить від 6 до 36 місяців, залежно від суми боргу та ваших можливостей. Ви можете обрати термін, який вам зручний, але він не може перевищувати 36 місяців.'
    }
    
    return 'Дякую за ваше повідомлення! Я передам ваше питання спеціалісту, який зв\'яжеться з вами найближчим часом. Також ви можете зателефонувати нам за номером +380 44 123 45 67 або написати на email info@mirna-ugoda.ua'
  }

  const handleTopicSelect = (topicId) => {
    setSelectedTopic(topicId)
    const topicMessage = `Мені потрібна допомога з темою: ${topics.find(t => t.id === topicId)?.title}`
    setNewMessage(topicMessage)
  }

  const formatTime = (date) => {
    return date.toLocaleTimeString('uk-UA', { 
      hour: '2-digit', 
      minute: '2-digit' 
    })
  }

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-secondary-900 mb-4">
            Підтримка
          </h1>
          <p className="text-lg text-secondary-600">
            Отримайте допомогу від наших спеціалістів
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Topics Sidebar */}
          <div className="lg:col-span-1">
            <div className="space-y-6">
              {/* Contact Info */}
              <div className="card">
                <h3 className="text-lg font-semibold text-secondary-900 mb-4 flex items-center">
                  <Phone size={20} className="mr-2 text-primary-600" />
                  Контакти
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <Phone size={16} className="text-secondary-400" />
                    <span className="text-sm">+380 44 123 45 67</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Mail size={16} className="text-secondary-400" />
                    <span className="text-sm">info@mirna-ugoda.ua</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Clock size={16} className="text-secondary-400" />
                    <span className="text-sm">Пн-Пт: 9:00-18:00</span>
                  </div>
                </div>
              </div>

              {/* Topics */}
              <div className="card">
                <h3 className="text-lg font-semibold text-secondary-900 mb-4">
                  Популярні теми
                </h3>
                <div className="space-y-3">
                  {topics.map((topic) => {
                    const Icon = topic.icon
                    return (
                      <button
                        key={topic.id}
                        onClick={() => handleTopicSelect(topic.id)}
                        className={`w-full text-left p-3 rounded-lg border transition-all duration-200 ${
                          selectedTopic === topic.id
                            ? 'border-primary-300 bg-primary-50'
                            : 'border-secondary-200 hover:border-primary-300 hover:bg-primary-50'
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          <Icon size={20} className="text-primary-600" />
                          <div>
                            <p className="font-medium text-secondary-900">{topic.title}</p>
                            <p className="text-xs text-secondary-500">{topic.description}</p>
                          </div>
                        </div>
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* FAQ */}
              <div className="card">
                <h3 className="text-lg font-semibold text-secondary-900 mb-4">
                  Часті питання
                </h3>
                <div className="space-y-3">
                  <div className="text-sm">
                    <p className="font-medium text-secondary-900 mb-1">
                      Які документи потрібні для реструктуризації?
                    </p>
                    <p className="text-secondary-600">
                      Паспорт, довідка про доходи, документи про борг.
                    </p>
                  </div>
                  <div className="text-sm">
                    <p className="font-medium text-secondary-900 mb-1">
                      Скільки часу розглядається заявка?
                    </p>
                    <p className="text-secondary-600">
                      Зазвичай 3-5 робочих днів.
                    </p>
                  </div>
                  <div className="text-sm">
                    <p className="font-medium text-secondary-900 mb-1">
                      Чи можна змінити термін погашення?
                    </p>
                    <p className="text-secondary-600">
                      Так, можна подати нову заявку на зміну умов.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Chat Area */}
          <div className="lg:col-span-2">
            <div className="card h-[600px] flex flex-col">
              {/* Chat Header */}
              <div className="border-b border-secondary-200 p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-primary-600 rounded-full flex items-center justify-center">
                      <MessageCircle size={20} className="text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-secondary-900">Онлайн підтримка</h3>
                      <p className="text-sm text-secondary-500">Відповідаємо протягом 2 хвилин</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-success-600 rounded-full"></div>
                    <span className="text-sm text-success-600">Онлайн</span>
                  </div>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`flex items-end space-x-2 max-w-xs lg:max-w-md ${
                      message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                    }`}>
                      <div className="w-8 h-8 rounded-full bg-secondary-200 flex items-center justify-center text-sm">
                        {message.avatar}
                      </div>
                      <div className={`rounded-lg px-4 py-2 ${
                        message.sender === 'user'
                          ? 'bg-primary-600 text-white'
                          : 'bg-secondary-100 text-secondary-900'
                      }`}>
                        <p className="text-sm">{message.text}</p>
                        <p className={`text-xs mt-1 ${
                          message.sender === 'user' ? 'text-primary-100' : 'text-secondary-500'
                        }`}>
                          {formatTime(message.timestamp)}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
                
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="flex items-end space-x-2">
                      <div className="w-8 h-8 rounded-full bg-secondary-200 flex items-center justify-center text-sm">
                        👨‍💼
                      </div>
                      <div className="bg-secondary-100 rounded-lg px-4 py-2">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-secondary-400 rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-secondary-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                          <div className="w-2 h-2 bg-secondary-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                
                {/* Убран автоматический скролл */}
              </div>

              {/* Message Input */}
              <div className="border-t border-secondary-200 p-4">
                <div className="flex space-x-3">
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder="Введіть ваше повідомлення..."
                    className="input-field flex-1"
                    disabled={isTyping}
                  />
                  <button
                    onClick={handleSendMessage}
                    disabled={!newMessage.trim() || isTyping}
                    className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Send size={20} />
                  </button>
                </div>
                <p className="text-xs text-secondary-500 mt-2">
                  Натисніть Enter для відправки повідомлення
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ChatSupport 