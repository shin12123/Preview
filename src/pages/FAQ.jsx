import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Search, 
  ChevronDown, 
  HelpCircle,
  FileText,
  Shield,
  Clock,
  DollarSign,
  Phone,
  Mail
} from 'lucide-react'

const FAQ = ({ darkMode }) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [openItems, setOpenItems] = useState(new Set())

  const faqData = [
    {
      id: 1,
      category: 'Загальні питання',
      icon: HelpCircle,
      questions: [
        {
          question: 'Що таке реструктуризація боргу?',
          answer: 'Реструктуризація боргу - це процес зміни умов погашення існуючого боргу. Це може включати зменшення щомісячних платежів, продовження терміну погашення або зниження відсоткових ставок.'
        },
        {
          question: 'Чи можу я подати заявку на реструктуризацію?',
          answer: 'Так, якщо у вас є борги за комунальні послуги та ви маєте намір їх погасити, ви можете подати заявку на реструктуризацію. Наші спеціалісти оцінять вашу ситуацію та запропонують найкращі умови.'
        },
        {
          question: 'Скільки часу займає процес реструктуризації?',
          answer: 'Зазвичай процес займає від 3 до 7 робочих днів після подачі всіх необхідних документів. Ми намагаємося обробляти заявки якомога швидше.'
        }
      ]
    },
    {
      id: 2,
      category: 'Документи та процедури',
      icon: FileText,
      questions: [
        {
          question: 'Які документи потрібні для подачі заявки?',
          answer: 'Для подачі заявки вам потрібно надати: паспорт або інший документ, що посвідчує особу, документи про борг (квитанції, рахунки), довідку про доходи (за бажанням), та інші документи залежно від вашої ситуації.'
        },
        {
          question: 'Чи можна подати заявку онлайн?',
          answer: 'Так, ви можете подати заявку онлайн через наш сайт. Це швидко, зручно та безпечно. Всі дані захищені та передаються по захищеному з\'єднанню.'
        },
        {
          question: 'Чи потрібно особисто приходити в офіс?',
          answer: 'Ні, особистий візит не обов\'язковий. Весь процес можна пройти онлайн. Якщо у вас виникнуть питання, наші спеціалісти готові допомогти по телефону або в чаті.'
        }
      ]
    },
    {
      id: 3,
      category: 'Умови та вимоги',
      icon: Shield,
      questions: [
        {
          question: 'Які умови реструктуризації?',
          answer: 'Умови реструктуризації залежать від суми боргу, терміну прострочення та вашої платоспроможності. Ми завжди намагаємося знайти компромісне рішення, яке буде зручним для вас.'
        },
        {
          question: 'Чи можна реструктуризувати борг кількох комунальних підприємств?',
          answer: 'Так, ми працюємо з різними комунальними підприємствами та можемо допомогти реструктуризувати борги за різні послуги одночасно.'
        },
        {
          question: 'Чи є мінімальна сума боргу для реструктуризації?',
          answer: 'Мінімальна сума боргу залежить від політики конкретного комунального підприємства. Зазвичай це від 1000 грн, але краще уточнити у нашого спеціаліста.'
        }
      ]
    },
    {
      id: 4,
      category: 'Платежі та терміни',
      icon: DollarSign,
      questions: [
        {
          question: 'Як часто потрібно платити після реструктуризації?',
          answer: 'Після реструктуризації ви платите щомісячно, як правило, до 20 числа кожного місяця. Точний графік платежів буде вказаний у договорі.'
        },
        {
          question: 'Що буде, якщо я не зможу платити вчасно?',
          answer: 'Якщо у вас виникнуть труднощі з платежами, негайно зв\'яжіться з нами. Ми завжди готові переглянути умови та знайти рішення, яке підходить вам.'
        },
        {
          question: 'Чи можна достроково погасити борг?',
          answer: 'Так, ви можете достроково погасити борг без додаткових комісій. Це дозволить вам економити на відсотках.'
        }
      ]
    },
    {
      id: 5,
      category: 'Підтримка та консультації',
      icon: Phone,
      questions: [
        {
          question: 'Як зв\'язатися з вашою підтримкою?',
          answer: 'Ви можете зв\'язатися з нами через чат на сайті, зателефонувати на гарячу лінію або написати на email. Наші спеціалісти працюють з 9:00 до 18:00 щодня.'
        },
        {
          question: 'Чи надаєте ви безкоштовні консультації?',
          answer: 'Так, перша консультація завжди безкоштовна. Наші спеціалісти готові відповісти на всі ваші питання та допомогти зробити правильний вибір.'
        },
        {
          question: 'Чи можна отримати консультацію онлайн?',
          answer: 'Так, ми надаємо онлайн консультації через чат, відеодзвінки або телефон. Це зручно та економить ваш час.'
        }
      ]
    }
  ]

  const toggleItem = (categoryId, questionIndex) => {
    const key = `${categoryId}-${questionIndex}`
    const newOpenItems = new Set(openItems)
    
    if (newOpenItems.has(key)) {
      newOpenItems.delete(key)
    } else {
      newOpenItems.add(key)
    }
    
    setOpenItems(newOpenItems)
  }

  const filteredData = faqData.map(category => ({
    ...category,
    questions: category.questions.filter(q =>
      q.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      q.answer.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(category => category.questions.length > 0)

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
            <HelpCircle className="w-8 h-8 text-primary-600" />
          </div>
          <h1 className={`text-4xl font-bold mb-4 ${
            darkMode ? 'text-white' : 'text-gray-900'
          }`}>
            Часті питання
          </h1>
          <p className={`text-lg ${
            darkMode ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Знайдіть відповіді на найпопулярніші питання про реструктуризацію боргів
          </p>
        </motion.div>

        {/* Search */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8"
        >
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Пошук питання..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`w-full pl-12 pr-4 py-4 border rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors ${
                darkMode 
                  ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-400' 
                  : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
              } shadow-soft`}
            />
          </div>
        </motion.div>

        {/* FAQ Categories */}
        <div className="space-y-8">
          <AnimatePresence>
            {filteredData.map((category, categoryIndex) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 + categoryIndex * 0.1 }}
                className={`rounded-2xl shadow-soft overflow-hidden ${
                  darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white'
                }`}
              >
                {/* Category Header */}
                <div className={`p-6 border-b ${
                  darkMode ? 'border-gray-700' : 'border-gray-200'
                }`}>
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-lg ${
                      darkMode ? 'bg-primary-900' : 'bg-primary-100'
                    }`}>
                      <category.icon className="w-5 h-5 text-primary-600" />
                    </div>
                    <h2 className={`text-xl font-semibold ${
                      darkMode ? 'text-white' : 'text-gray-900'
                    }`}>
                      {category.category}
                    </h2>
                  </div>
                </div>

                {/* Questions */}
                <div className="divide-y divide-gray-200 dark:divide-gray-700">
                  {category.questions.map((item, questionIndex) => {
                    const key = `${category.id}-${questionIndex}`
                    const isOpen = openItems.has(key)

                    return (
                      <motion.div
                        key={key}
                        initial={false}
                        className={`${
                          darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'
                        } transition-colors`}
                      >
                        <button
                          onClick={() => toggleItem(category.id, questionIndex)}
                          className={`w-full px-6 py-4 text-left flex items-center justify-between transition-colors ${
                            darkMode ? 'text-gray-300' : 'text-gray-700'
                          }`}
                        >
                          <span className="font-medium pr-4">{item.question}</span>
                          <ChevronDown 
                            className={`w-5 h-5 transition-transform duration-200 ${
                              isOpen ? 'rotate-180' : ''
                            }`}
                          />
                        </button>
                        
                        <AnimatePresence>
                          {isOpen && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.3 }}
                              className="overflow-hidden"
                            >
                              <div className={`px-6 pb-4 ${
                                darkMode ? 'text-gray-400' : 'text-gray-600'
                              }`}>
                                {item.answer}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.div>
                    )
                  })}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Contact Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className={`mt-12 p-8 rounded-2xl shadow-soft ${
            darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white'
          }`}
        >
          <div className="text-center">
            <h3 className={`text-2xl font-semibold mb-4 ${
              darkMode ? 'text-white' : 'text-gray-900'
            }`}>
              Не знайшли відповідь?
            </h3>
            <p className={`mb-6 ${
              darkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>
              Зв\'яжіться з нашими спеціалістами, і ми допоможемо вам
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:+380441234567"
                className={`flex items-center justify-center space-x-2 px-6 py-3 rounded-lg transition-colors ${
                  darkMode 
                    ? 'bg-primary-600 hover:bg-primary-700 text-white' 
                    : 'bg-primary-600 hover:bg-primary-700 text-white'
                }`}
              >
                <Phone className="w-5 h-5" />
                <span>Зателефонувати</span>
              </a>
              
              <a
                href="mailto:support@mirna-ugoda.com"
                className={`flex items-center justify-center space-x-2 px-6 py-3 rounded-lg transition-colors ${
                  darkMode 
                    ? 'border border-gray-600 text-gray-300 hover:bg-gray-700' 
                    : 'border border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
              >
                <Mail className="w-5 h-5" />
                <span>Написати email</span>
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default FAQ 