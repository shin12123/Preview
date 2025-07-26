import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Moon, Sun, Menu, X, Search, Bell, User, ChevronDown, Settings, LogOut } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'react-hot-toast'

const Header = ({ darkMode, setDarkMode }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [isScrolled, setIsScrolled] = useState(false)
  const [notifications, setNotifications] = useState([
    { id: 1, title: 'Заявка затверджена', message: 'Ваша заявка на реструктуризацію затверджена', time: '2 хв тому', read: false },
    { id: 2, title: 'Новий договір', message: 'Договір реструктуризації готовий до підписання', time: '1 год тому', read: false },
    { id: 3, title: 'Оновлення системи', message: 'Система буде оновлена завтра о 02:00', time: '3 год тому', read: true }
  ])
  const [showNotifications, setShowNotifications] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()

  // Симуляция данных пользователя
  const [user] = useState({
    name: 'Іван Петренко',
    email: 'ivan@example.com',
    avatar: null,
    notifications: 3
  })

  const navigation = [
    { name: 'Головна', href: '/' },
    { name: 'Калькулятор', href: '/calculator' },
    { name: 'Статус заявки', href: '/status' },
    { name: 'Карта', href: '/map' },
    { name: 'Відгуки', href: '/reviews' },
    { name: 'Підтримка', href: '/chat' },
  ]

  // Данные для поиска
  const searchData = [
    { title: 'Реструктуризація боргу', url: '/application', category: 'Послуги' },
    { title: 'Калькулятор платежів', url: '/calculator', category: 'Інструменти' },
    { title: 'Статус заявки', url: '/status', category: 'Особистий кабінет' },
    { title: 'Карта офісів', url: '/map', category: 'Контакти' },
    { title: 'Відгуки клієнтів', url: '/reviews', category: 'Інформація' },
    { title: 'Підтримка', url: '/chat', category: 'Допомога' },
    { title: 'FAQ', url: '/faq', category: 'Допомога' },
    { title: 'Особистий кабінет', url: '/cabinet', category: 'Особистий кабінет' },
  ]

  const isActive = (path) => location.pathname === path

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
    toast.success(darkMode ? 'Світла тема увімкнена' : 'Темна тема увімкнена')
  }

  const handleNavigation = () => {
    // Плавный скролл наверх
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
    
    // Закрываем мобильное меню
    setIsMenuOpen(false)
    setIsSearchOpen(false)
    setIsProfileOpen(false)
    setShowNotifications(false)
  }

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      const results = searchData.filter(item => 
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.category.toLowerCase().includes(searchQuery.toLowerCase())
      )
      
      if (results.length > 0) {
        toast.success(`Знайдено ${results.length} результатів`)
        // Переходим к первому результату
        navigate(results[0].url)
        setSearchQuery('')
        setIsSearchOpen(false)
      } else {
        toast.error('Нічого не знайдено')
      }
    }
  }

  const handleLogout = () => {
    toast.success('Ви вийшли з системи')
    setIsProfileOpen(false)
  }

  const markNotificationAsRead = (id) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === id ? { ...notif, read: true } : notif
      )
    )
  }

  const getFilteredSearchResults = () => {
    if (!searchQuery.trim()) return []
    return searchData.filter(item => 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase())
    ).slice(0, 5)
  }

  // Отслеживание скролла для изменения стиля header
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Автоматический скролл наверх при изменении маршрута
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }, [location.pathname])

  // Закрытие выпадающих меню при клике вне их
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.header-dropdown')) {
        setIsProfileOpen(false)
        setIsSearchOpen(false)
        setShowNotifications(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${
      darkMode 
        ? `bg-gray-900/95 backdrop-blur-sm border-b ${isScrolled ? 'border-gray-700 shadow-lg' : 'border-gray-700'}` 
        : `bg-white/95 backdrop-blur-sm border-b ${isScrolled ? 'border-gray-200 shadow-lg' : 'border-gray-200'}`
    }`}>
      <div className="max-w-screen-2xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex justify-between items-center h-16">
          {/* Logo - уменьшенный размер */}
          <motion.div 
            className="flex items-center flex-shrink-0"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <Link to="/" onClick={handleNavigation} className="flex items-center space-x-2">
              <motion.div 
                className="w-10 h-10 bg-gradient-to-r from-primary-600 to-primary-800 rounded-lg flex items-center justify-center"
                whileHover={{ rotate: 5 }}
                transition={{ duration: 0.2 }}
              >
                <span className="text-white font-bold text-lg">М</span>
              </motion.div>
              <div className="hidden sm:block">
                <h1 className={`text-base font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  Мирна Угода
                </h1>
                <p className={`text-xs leading-tight ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Твій Спокій, Твоя Угода
                </p>
              </div>
            </Link>
          </motion.div>

          {/* Desktop Navigation - оптимизированная */}
          <nav className="hidden lg:flex items-center space-x-4 mx-8 flex-1 justify-center">
            {navigation.map((item) => (
              <motion.div
                key={item.name}
                whileHover={{ y: -1 }}
                transition={{ duration: 0.2 }}
              >
                <Link
                to={item.href}
                  onClick={handleNavigation}
                  className={`px-6 py-2 rounded text-sm font-medium transition-all duration-200 whitespace-nowrap ${
                  isActive(item.href)
                      ? `${darkMode ? 'text-primary-400 bg-primary-900/50' : 'text-primary-600 bg-primary-50'} border-b border-primary-500`
                      : `${darkMode ? 'text-gray-300 hover:text-primary-400 hover:bg-gray-800' : 'text-gray-600 hover:text-primary-600 hover:bg-primary-50'}`
                }`}
              >
                {item.name}
              </Link>
              </motion.div>
            ))}
          </nav>

          {/* Desktop Actions - компактная группировка */}
          <div className="hidden lg:flex items-center space-x-3">
            {/* Utility Actions */}
            <div className="flex items-center space-x-2">
              {/* Search Button */}
              <motion.button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className={`p-2 rounded-lg transition-colors duration-200 ${
                  darkMode 
                    ? 'text-gray-300 hover:bg-gray-800' 
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Search size={18} />
              </motion.button>

              {/* Dark Mode Toggle */}
              <motion.button
                onClick={toggleDarkMode}
                className={`p-2 rounded-lg transition-colors duration-200 ${
                  darkMode 
                    ? 'text-yellow-400 hover:bg-gray-800' 
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
                whileHover={{ scale: 1.05, rotate: 180 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.3 }}
              >
                {darkMode ? <Sun size={18} /> : <Moon size={18} />}
              </motion.button>

              {/* Notifications */}
              <div className="relative header-dropdown">
                <motion.button
                  onClick={() => setShowNotifications(!showNotifications)}
                  className={`relative p-2 rounded-lg transition-colors duration-200 ${
                    darkMode 
                      ? 'text-gray-300 hover:bg-gray-800' 
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Bell size={18} />
                  {notifications.filter(n => !n.read).length > 0 && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className={`absolute -top-1 -right-1 w-4 h-4 rounded-full text-xs font-bold flex items-center justify-center ${
                        darkMode ? 'bg-red-500 text-white' : 'bg-red-500 text-white'
                      }`}
                    >
                      {notifications.filter(n => !n.read).length}
                    </motion.span>
                  )}
                </motion.button>

                <AnimatePresence>
                  {showNotifications && (
                    <motion.div
                      initial={{ opacity: 0, y: -10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className={`absolute right-0 mt-2 w-80 rounded-lg shadow-lg ${
                        darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
                      }`}
                    >
                      <div className="p-4">
                        <div className="flex items-center justify-between mb-4">
                          <h3 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                            Уведомления
                          </h3>
                          <button
                            onClick={() => setNotifications(prev => prev.map(n => ({ ...n, read: true })))}
                            className={`text-xs ${darkMode ? 'text-primary-400 hover:text-primary-300' : 'text-primary-600 hover:text-primary-700'}`}
                          >
                            Відмітити всі як прочитані
                          </button>
                        </div>
                        
                        <div className="space-y-2 max-h-64 overflow-y-auto">
                          {notifications.length > 0 ? (
                            notifications.map((notification) => (
                              <motion.div
                                key={notification.id}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className={`p-3 rounded-lg cursor-pointer transition-colors ${
                                  notification.read 
                                    ? (darkMode ? 'bg-gray-700/50' : 'bg-gray-50') 
                                    : (darkMode ? 'bg-primary-900/20' : 'bg-primary-50')
                                } ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
                                onClick={() => markNotificationAsRead(notification.id)}
                              >
                                <div className="flex items-start justify-between">
                                  <div className="flex-1">
                                    <p className={`font-medium text-sm ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                                      {notification.title}
                                    </p>
                                    <p className={`text-xs mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                      {notification.message}
                                    </p>
                                    <p className={`text-xs mt-2 ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                                      {notification.time}
                                    </p>
                                  </div>
                                  {!notification.read && (
                                    <div className={`w-2 h-2 rounded-full ${darkMode ? 'bg-primary-400' : 'bg-primary-600'}`}></div>
                                  )}
                                </div>
                              </motion.div>
                            ))
                          ) : (
                            <p className={`text-center text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                              Немає нових уведомлень
                            </p>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Separator */}
            <div className={`w-px h-6 ${darkMode ? 'bg-gray-700' : 'bg-gray-300'}`}></div>
            
            {/* Profile Dropdown */}
            <div className="relative header-dropdown">
              <motion.button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className={`flex items-center space-x-2 p-2 rounded-lg transition-colors duration-200 ${
                  darkMode 
                    ? 'text-gray-300 hover:bg-gray-800' 
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  darkMode ? 'bg-primary-600' : 'bg-primary-100'
                }`}>
                  <User size={16} className={darkMode ? 'text-white' : 'text-primary-600'} />
                </div>
                <span className="text-sm font-medium hidden xl:block">{user.name}</span>
                <ChevronDown size={16} className={`transition-transform ${isProfileOpen ? 'rotate-180' : ''}`} />
              </motion.button>

              <AnimatePresence>
                {isProfileOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className={`absolute right-0 mt-2 w-64 rounded-lg shadow-lg ${
                      darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
                    }`}
                  >
                    <div className="p-4">
                      <div className="flex items-center space-x-3 mb-4">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          darkMode ? 'bg-primary-600' : 'bg-primary-100'
                        }`}>
                          <User size={20} className={darkMode ? 'text-white' : 'text-primary-600'} />
                        </div>
                        <div>
                          <p className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                            {user.name}
                          </p>
                          <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                            {user.email}
                          </p>
                        </div>
                      </div>
                      
                      <div className="space-y-1">
            <Link
                          to="/cabinet"
                          onClick={handleNavigation}
                          className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm transition-colors ${
                            darkMode 
                              ? 'text-gray-300 hover:bg-gray-700' 
                              : 'text-gray-700 hover:bg-gray-100'
                          }`}
                        >
                          <User size={16} />
                          <span>Особистий кабінет</span>
                        </Link>
                        <button
                          onClick={handleLogout}
                          className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm transition-colors w-full text-left ${
                            darkMode 
                              ? 'text-gray-300 hover:bg-gray-700' 
                              : 'text-gray-700 hover:bg-gray-100'
                          }`}
                        >
                          <LogOut size={16} />
                          <span>Вийти</span>
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* CTA Button */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
            <Link
              to="/application"
                onClick={handleNavigation}
                className="bg-primary-600 hover:bg-primary-700 text-white font-medium py-2 px-6 rounded-lg transition-all duration-200 shadow-soft min-w-[170px] whitespace-nowrap"
            >
              Подати заявку
            </Link>
            </motion.div>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden flex items-center space-x-1">
            {/* Search Button Mobile */}
            <motion.button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className={`p-1.5 rounded-lg transition-colors duration-200 ${
                darkMode 
                  ? 'text-gray-300 hover:bg-gray-800' 
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Search size={18} />
            </motion.button>

            <motion.button
              onClick={toggleDarkMode}
              className={`p-1.5 rounded-lg transition-colors duration-200 ${
                darkMode 
                  ? 'text-yellow-400 hover:bg-gray-800' 
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
              whileHover={{ scale: 1.05, rotate: 180 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.3 }}
            >
              {darkMode ? <Sun size={18} /> : <Moon size={18} />}
            </motion.button>
            
            {/* Animated Burger Button */}
            <motion.button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`relative w-8 h-8 rounded-lg transition-colors duration-200 ${
                darkMode 
                  ? 'text-gray-300 hover:bg-gray-800' 
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="relative w-5 h-5 mx-auto">
                {/* Top line */}
                <motion.div
                  className={`absolute top-0 left-0 w-5 h-0.5 rounded-full transition-colors ${
                    darkMode ? 'bg-gray-300' : 'bg-gray-600'
                  }`}
                  animate={{
                    rotate: isMenuOpen ? 45 : 0,
                    y: isMenuOpen ? 6 : 0,
                  }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                />
                
                {/* Middle line */}
                <motion.div
                  className={`absolute top-2 left-0 w-5 h-0.5 rounded-full transition-colors ${
                    darkMode ? 'bg-gray-300' : 'bg-gray-600'
                  }`}
                  animate={{
                    opacity: isMenuOpen ? 0 : 1,
                    x: isMenuOpen ? -20 : 0,
                  }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                />
                
                {/* Bottom line */}
                <motion.div
                  className={`absolute top-4 left-0 w-5 h-0.5 rounded-full transition-colors ${
                    darkMode ? 'bg-gray-300' : 'bg-gray-600'
                  }`}
                  animate={{
                    rotate: isMenuOpen ? -45 : 0,
                    y: isMenuOpen ? -6 : 0,
                  }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                />
              </div>
            </motion.button>
          </div>
        </div>

        {/* Search Bar */}
        <AnimatePresence>
          {isSearchOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="py-3 border-t border-gray-200 dark:border-gray-700"
            >
              <div className="relative header-dropdown">
                <form onSubmit={handleSearch} className="relative">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Пошук по сайту..."
                    className={`w-full px-4 py-2 pl-10 rounded-lg border transition-colors text-sm ${
                      darkMode 
                        ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                        : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                    }`}
                  />
                  <Search 
                    size={18} 
                    className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${
                      darkMode ? 'text-gray-400' : 'text-gray-500'
                    }`} 
                  />
                </form>

                {/* Search Results */}
                {searchQuery.trim() && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`absolute top-full left-0 right-0 mt-2 rounded-lg shadow-lg z-50 ${
                      darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
                    }`}
                  >
                    <div className="p-2">
                      {getFilteredSearchResults().length > 0 ? (
                        getFilteredSearchResults().map((result, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.05 }}
                          >
                            <Link
                              to={result.url}
                              onClick={() => {
                                setSearchQuery('')
                                setIsSearchOpen(false)
                                handleNavigation()
                              }}
                              className={`block p-3 rounded-lg transition-colors ${
                                darkMode 
                                  ? 'hover:bg-gray-700 text-gray-300' 
                                  : 'hover:bg-gray-100 text-gray-700'
                              }`}
                            >
                              <div className="flex items-center justify-between">
                                <div>
                                  <p className="font-medium text-sm">{result.title}</p>
                                  <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                                    {result.category}
                                  </p>
                                </div>
                                <Search size={14} className={darkMode ? 'text-gray-400' : 'text-gray-500'} />
                              </div>
                            </Link>
                          </motion.div>
                        ))
                      ) : (
                        <div className={`p-3 text-center text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                          Нічого не знайдено
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Mobile Navigation */}
        <AnimatePresence>
        {isMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className={`lg:hidden border-t overflow-hidden ${
                darkMode ? 'border-gray-700' : 'border-gray-200'
              }`}
            >
              <motion.div 
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
                className="px-2 pt-2 pb-3 space-y-1"
              >
                {navigation.map((item, index) => (
                  <motion.div
                    key={item.name}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.3, delay: 0.1 + index * 0.05 }}
                  >
                <Link
                  to={item.href}
                      onClick={handleNavigation}
                      className={`block px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                    isActive(item.href)
                          ? `${darkMode ? 'text-primary-400 bg-primary-900/50' : 'text-primary-600 bg-primary-50'}`
                          : `${darkMode ? 'text-gray-300 hover:text-primary-400 hover:bg-gray-800' : 'text-gray-600 hover:text-primary-600 hover:bg-primary-50'}`
                  }`}
                >
                  {item.name}
                </Link>
                  </motion.div>
                ))}
                <motion.div
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.3, delay: 0.1 + navigation.length * 0.05 }}
                  className="pt-4 space-y-2"
                >
                  <Link
                    to="/cabinet"
                    onClick={handleNavigation}
                    className={`font-medium py-2 px-4 transition-all duration-200 w-full text-center block ${
                      darkMode 
                        ? 'text-primary-400 hover:text-primary-300' 
                        : 'text-primary-600 hover:text-primary-700'
                    }`}
                  >
                    Особистий кабінет
                </Link>
                <Link
                  to="/application"
                    onClick={handleNavigation}
                    className="bg-primary-600 hover:bg-primary-700 text-white font-medium py-2 px-4 rounded-lg transition-all duration-200 w-full text-center block shadow-soft"
                >
                  Подати заявку
                </Link>
                </motion.div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  )
}

export default Header 