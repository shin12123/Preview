import { Link } from 'react-router-dom'
import { 
  Phone, 
  Mail, 
  MapPin, 
  Heart
} from 'lucide-react'
import { scrollToTop } from '../hooks/useScrollToTop'
import logo from '../../logo.png'

const Footer = ({ darkMode }) => {
  const currentYear = new Date().getFullYear()

  const footerLinks = {
    'Основні послуги': [
      { name: 'Реструктуризація боргу', href: '/application' },
      { name: 'Калькулятор платежів', href: '/calculator' },
      { name: 'Статус заявки', href: '/status' },
      { name: 'Особистий кабінет', href: '/cabinet' }
    ],
    'Інформація': [
      { name: 'FAQ', href: '/faq' },
      { name: 'Відгуки клієнтів', href: '/reviews' },
      { name: 'Карта офісів', href: '/map' },
      { name: 'Підтримка', href: '/chat' }
    ],
    'Компанія': [
      { name: 'Про нас', href: '/' },
      { name: 'Контакти', href: '/' },
      { name: 'Політика конфіденційності', href: '/' },
      { name: 'Умови використання', href: '/' }
    ]
  }

  const handleNavigation = () => {
    scrollToTop()
  }

  return (
    <footer className={`transition-colors duration-300 ${
      darkMode 
        ? 'bg-gray-900 border-t border-gray-800' 
        : 'bg-white border-t border-gray-200'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-3 mb-4">
              <img 
                src={logo}
                alt="Логотип Мирна Угода"
                className="w-10 h-10 rounded-lg object-cover bg-white shadow"
              />
              <div>
                <h3 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  Мирна Угода
                </h3>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Твій Спокій, Твоя Угода
                </p>
              </div>
            </div>
            
            <p className={`text-sm mb-6 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Професійна допомога у реструктуризації боргів за комунальні послуги. 
              Ми допомагаємо людям повернути контроль над своїми фінансами.
            </p>

            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Phone className={`w-4 h-4 ${darkMode ? 'text-primary-400' : 'text-primary-600'}`} />
                <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  +380 44 123 45 67
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className={`w-4 h-4 ${darkMode ? 'text-primary-400' : 'text-primary-600'}`} />
                <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  info@mirna-ugoda.ua
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className={`w-4 h-4 ${darkMode ? 'text-primary-400' : 'text-primary-600'}`} />
                <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  м. Київ, вул. Хрещатик, 1
                </span>
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className={`font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                {category}
              </h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.href}
                      onClick={handleNavigation}
                      className={`text-sm transition-colors hover:text-primary-600 ${
                        darkMode ? 'text-gray-300 hover:text-primary-400' : 'text-gray-600'
                      }`}
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Copyright */}
        <div className={`border-t mt-8 pt-8 ${
          darkMode ? 'border-gray-800' : 'border-gray-200'
        }`}>
          <div className="text-center">
            <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              <p className="flex items-center justify-center space-x-1 mb-2">
                <span>Зроблено з</span>
                <Heart className="w-4 h-4 text-red-500 fill-current" />
                <span>в Україні</span>
              </p>
              <p>
                © {currentYear} Мирна Угода. Всі права захищені.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer 