import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-blue-800 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">М</span>
              </div>
              <div>
                <h3 className="text-lg font-bold">Мирна Угода</h3>
                <p className="text-gray-400 text-sm">Твій Спокій, Твоя Угода</p>
              </div>
            </div>
            <p className="text-gray-300 mb-4 max-w-md">
              Допомагаємо громадянам вирішувати питання з комунальними послугами 
              через реструктуризацію боргів. Крок до порозуміння.
            </p>
            <div className="flex items-center space-x-4 text-gray-400">
              <div className="flex items-center space-x-2">
                <span>🛡️</span>
                <span className="text-sm">Безпечно</span>
              </div>
              <div className="flex items-center space-x-2">
                <span>❤️</span>
                <span className="text-sm">Надійно</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Швидкі посилання</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-white transition-colors">
                  Головна
                </Link>
              </li>
              <li>
                <Link to="/application" className="text-gray-300 hover:text-white transition-colors">
                  Подати заявку
                </Link>
              </li>
              <li>
                <Link to="/status" className="text-gray-300 hover:text-white transition-colors">
                  Статус заявки
                </Link>
              </li>
              <li>
                <Link to="/chat" className="text-gray-300 hover:text-white transition-colors">
                  Підтримка
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Контакти</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <span className="text-blue-400">📞</span>
                <span className="text-gray-300">+380 44 123 45 67</span>
              </div>
              <div className="flex items-center space-x-3">
                <span className="text-blue-400">✉️</span>
                <span className="text-gray-300">info@mirna-ugoda.ua</span>
              </div>
              <div className="flex items-center space-x-3">
                <span className="text-blue-400">📍</span>
                <span className="text-gray-300">Київ, Україна</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © 2025 Мирна Угода. Всі права захищені.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link to="/privacy" className="text-gray-400 hover:text-white text-sm transition-colors">
              Політика конфіденційності
            </Link>
            <Link to="/terms" className="text-gray-400 hover:text-white text-sm transition-colors">
              Умови використання
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer 