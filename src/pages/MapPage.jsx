import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Navigation,
  Search,
  Filter,
  Star,
  Car,
  Bus,
  Train
} from 'lucide-react'

const MapPage = ({ darkMode }) => {
  const [selectedOffice, setSelectedOffice] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [filter, setFilter] = useState('all')

  const offices = [
    {
      id: 1,
      name: 'Головний офіс',
      address: 'м. Київ, вул. Хрещатик, 1',
      phone: '+380 44 123 45 67',
      email: 'kyiv@mirna-ugoda.com',
      hours: 'Пн-Пт: 9:00-18:00, Сб: 10:00-15:00',
      rating: 4.8,
      reviews: 156,
      services: ['Реструктуризація', 'Консультації', 'Документообіг'],
      coordinates: { lat: 50.4501, lng: 30.5234 },
      type: 'main',
      transport: [
        { type: 'metro', name: 'Майдан Незалежності', distance: '100м' },
        { type: 'bus', name: 'Автобус №24', distance: '200м' },
        { type: 'car', name: 'Парковка', distance: '50м' }
      ]
    },
    {
      id: 2,
      name: 'Офіс на Подолі',
      address: 'м. Київ, вул. Андріївська, 15',
      phone: '+380 44 123 45 68',
      email: 'podil@mirna-ugoda.com',
      hours: 'Пн-Пт: 9:00-18:00',
      rating: 4.6,
      reviews: 89,
      services: ['Реструктуризація', 'Консультації'],
      coordinates: { lat: 50.4598, lng: 30.5196 },
      type: 'branch',
      transport: [
        { type: 'metro', name: 'Контрактова площа', distance: '300м' },
        { type: 'bus', name: 'Автобус №62', distance: '150м' }
      ]
    },
    {
      id: 3,
      name: 'Офіс у Харкові',
      address: 'м. Харків, вул. Сумська, 25',
      phone: '+380 57 123 45 67',
      email: 'kharkiv@mirna-ugoda.com',
      hours: 'Пн-Пт: 9:00-18:00, Сб: 10:00-14:00',
      rating: 4.7,
      reviews: 234,
      services: ['Реструктуризація', 'Консультації', 'Документообіг', 'Юридична підтримка'],
      coordinates: { lat: 49.9935, lng: 36.2304 },
      type: 'regional',
      transport: [
        { type: 'metro', name: 'Університет', distance: '200м' },
        { type: 'bus', name: 'Автобус №12', distance: '100м' },
        { type: 'train', name: 'Харків-Пасажирський', distance: '2км' }
      ]
    },
    {
      id: 4,
      name: 'Офіс у Львові',
      address: 'м. Львів, вул. Сихівська, 10',
      phone: '+380 32 123 45 67',
      email: 'lviv@mirna-ugoda.com',
      hours: 'Пн-Пт: 9:00-18:00',
      rating: 4.5,
      reviews: 167,
      services: ['Реструктуризація', 'Консультації'],
      coordinates: { lat: 49.8397, lng: 24.0297 },
      type: 'regional',
      transport: [
        { type: 'bus', name: 'Автобус №5', distance: '150м' },
        { type: 'train', name: 'Львів-Пасажирський', distance: '3км' }
      ]
    },
    {
      id: 5,
      name: 'Офіс у Одесі',
      address: 'м. Одеса, вул. Дерибасівська, 8',
      phone: '+380 48 123 45 67',
      email: 'odesa@mirna-ugoda.com',
      hours: 'Пн-Пт: 9:00-18:00, Сб: 10:00-15:00',
      rating: 4.9,
      reviews: 198,
      services: ['Реструктуризація', 'Консультації', 'Документообіг'],
      coordinates: { lat: 46.4825, lng: 30.7233 },
      type: 'regional',
      transport: [
        { type: 'bus', name: 'Автобус №15', distance: '100м' },
        { type: 'car', name: 'Парковка', distance: '200м' }
      ]
    }
  ]

  const filteredOffices = offices.filter(office => {
    const matchesSearch = office.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         office.address.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filter === 'all' || office.type === filter
    return matchesSearch && matchesFilter
  })

  const getOfficeTypeLabel = (type) => {
    switch (type) {
      case 'main': return 'Головний офіс'
      case 'branch': return 'Філія'
      case 'regional': return 'Регіональний офіс'
      default: return 'Офіс'
    }
  }

  const getOfficeTypeColor = (type) => {
    switch (type) {
      case 'main': return 'bg-primary-600'
      case 'branch': return 'bg-success-600'
      case 'regional': return 'bg-warning-600'
      default: return 'bg-gray-600'
    }
  }

  const getTransportIcon = (type) => {
    switch (type) {
      case 'metro': return <Navigation className="w-4 h-4" />
      case 'bus': return <Bus className="w-4 h-4" />
      case 'train': return <Train className="w-4 h-4" />
      case 'car': return <Car className="w-4 h-4" />
      default: return <MapPin className="w-4 h-4" />
    }
  }

  return (
    <div className={`min-h-screen py-12 transition-colors duration-300 ${
      darkMode ? 'bg-gray-900' : 'bg-gray-50'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
            <MapPin className="w-8 h-8 text-primary-600" />
          </div>
          <h1 className={`text-4xl font-bold mb-4 ${
            darkMode ? 'text-white' : 'text-gray-900'
          }`}>
            Наші офіси
          </h1>
          <p className={`text-lg ${
            darkMode ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Знайдіть найближчий офіс та отримайте професійну консультацію
          </p>
        </motion.div>

        {/* Search and Filters */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className={`p-6 rounded-2xl shadow-soft mb-8 ${
            darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white'
          }`}
        >
          <div className="grid md:grid-cols-2 gap-6">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Пошук за назвою або адресою..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`w-full pl-12 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors ${
                  darkMode 
                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                }`}
              />
            </div>
            
            <div className="flex items-center space-x-4">
              <Filter className="w-5 h-5 text-gray-400" />
              <span className={`text-sm font-medium ${
                darkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Тип офісу:
              </span>
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className={`text-sm border rounded-lg px-3 py-2 transition-colors ${
                  darkMode 
                    ? 'bg-gray-700 border-gray-600 text-white' 
                    : 'bg-white border-gray-300 text-gray-900'
                }`}
              >
                <option value="all">Всі офіси</option>
                <option value="main">Головний офіс</option>
                <option value="branch">Філії</option>
                <option value="regional">Регіональні офіси</option>
              </select>
            </div>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Offices List */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="lg:col-span-1"
          >
            <div className="space-y-4">
              {filteredOffices.map((office, index) => (
                <motion.div
                  key={office.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                  onClick={() => setSelectedOffice(office)}
                  className={`p-6 rounded-2xl shadow-soft cursor-pointer transition-all duration-200 ${
                    selectedOffice?.id === office.id
                      ? `${darkMode ? 'bg-primary-900 border-primary-500' : 'bg-primary-50 border-primary-200'} border-2`
                      : `${darkMode ? 'bg-gray-800 border border-gray-700 hover:bg-gray-700' : 'bg-white hover:bg-gray-50'}`
                  }`}
                >
                  {/* Office Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="flex items-center space-x-2 mb-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium text-white ${getOfficeTypeColor(office.type)}`}>
                          {getOfficeTypeLabel(office.type)}
                        </span>
                        <div className="flex items-center space-x-1">
                          <Star className="w-4 h-4 text-yellow-400 fill-current" />
                          <span className={`text-sm font-medium ${
                            darkMode ? 'text-gray-300' : 'text-gray-700'
                          }`}>
                            {office.rating}
                          </span>
                          <span className={`text-xs ${
                            darkMode ? 'text-gray-500' : 'text-gray-600'
                          }`}>
                            ({office.reviews})
                          </span>
                        </div>
                      </div>
                      <h3 className={`font-semibold mb-1 ${
                        darkMode ? 'text-white' : 'text-gray-900'
                      }`}>
                        {office.name}
                      </h3>
                    </div>
                  </div>

                  {/* Office Details */}
                  <div className="space-y-3">
                    <div className="flex items-start space-x-2">
                      <MapPin className="w-4 h-4 text-gray-400 mt-0.5" />
                      <span className={`text-sm ${
                        darkMode ? 'text-gray-300' : 'text-gray-700'
                      }`}>
                        {office.address}
                      </span>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Phone className="w-4 h-4 text-gray-400" />
                      <span className={`text-sm ${
                        darkMode ? 'text-gray-300' : 'text-gray-700'
                      }`}>
                        {office.phone}
                      </span>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4 text-gray-400" />
                      <span className={`text-sm ${
                        darkMode ? 'text-gray-300' : 'text-gray-700'
                      }`}>
                        {office.hours}
                      </span>
                    </div>
                  </div>

                  {/* Services */}
                  <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                    <div className="flex flex-wrap gap-1">
                      {office.services.map((service, idx) => (
                        <span
                          key={idx}
                          className={`px-2 py-1 rounded-full text-xs ${
                            darkMode 
                              ? 'bg-gray-700 text-gray-300' 
                              : 'bg-gray-100 text-gray-700'
                          }`}
                        >
                          {service}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Office Details */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="lg:col-span-2"
          >
            {selectedOffice ? (
              <div className={`p-8 rounded-2xl shadow-soft ${
                darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white'
              }`}>
                {/* Office Header */}
                <div className="mb-8">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <div className="flex items-center space-x-2 mb-2">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium text-white ${getOfficeTypeColor(selectedOffice.type)}`}>
                          {getOfficeTypeLabel(selectedOffice.type)}
                        </span>
                        <div className="flex items-center space-x-1">
                          <Star className="w-5 h-5 text-yellow-400 fill-current" />
                          <span className={`text-lg font-semibold ${
                            darkMode ? 'text-white' : 'text-gray-900'
                          }`}>
                            {selectedOffice.rating}
                          </span>
                          <span className={`text-sm ${
                            darkMode ? 'text-gray-500' : 'text-gray-600'
                          }`}>
                            ({selectedOffice.reviews} відгуків)
                          </span>
                        </div>
                      </div>
                      <h2 className={`text-3xl font-bold mb-2 ${
                        darkMode ? 'text-white' : 'text-gray-900'
                      }`}>
                        {selectedOffice.name}
                      </h2>
                    </div>
                  </div>

                  {/* Contact Info */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="flex items-start space-x-3">
                        <MapPin className="w-5 h-5 text-primary-600 mt-0.5" />
                        <div>
                          <h3 className={`font-semibold mb-1 ${
                            darkMode ? 'text-white' : 'text-gray-900'
                          }`}>
                            Адреса
                          </h3>
                          <p className={`${
                            darkMode ? 'text-gray-300' : 'text-gray-700'
                          }`}>
                            {selectedOffice.address}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start space-x-3">
                        <Phone className="w-5 h-5 text-primary-600 mt-0.5" />
                        <div>
                          <h3 className={`font-semibold mb-1 ${
                            darkMode ? 'text-white' : 'text-gray-900'
                          }`}>
                            Телефон
                          </h3>
                          <a
                            href={`tel:${selectedOffice.phone}`}
                            className={`hover:text-primary-600 transition-colors ${
                              darkMode ? 'text-gray-300' : 'text-gray-700'
                            }`}
                          >
                            {selectedOffice.phone}
                          </a>
                        </div>
                      </div>

                      <div className="flex items-start space-x-3">
                        <Mail className="w-5 h-5 text-primary-600 mt-0.5" />
                        <div>
                          <h3 className={`font-semibold mb-1 ${
                            darkMode ? 'text-white' : 'text-gray-900'
                          }`}>
                            Email
                          </h3>
                          <a
                            href={`mailto:${selectedOffice.email}`}
                            className={`hover:text-primary-600 transition-colors ${
                              darkMode ? 'text-gray-300' : 'text-gray-700'
                            }`}
                          >
                            {selectedOffice.email}
                          </a>
                        </div>
                      </div>

                      <div className="flex items-start space-x-3">
                        <Clock className="w-5 h-5 text-primary-600 mt-0.5" />
                        <div>
                          <h3 className={`font-semibold mb-1 ${
                            darkMode ? 'text-white' : 'text-gray-900'
                          }`}>
                            Години роботи
                          </h3>
                          <p className={`${
                            darkMode ? 'text-gray-300' : 'text-gray-700'
                          }`}>
                            {selectedOffice.hours}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Services */}
                    <div>
                      <h3 className={`font-semibold mb-4 ${
                        darkMode ? 'text-white' : 'text-gray-900'
                      }`}>
                        Послуги
                      </h3>
                      <div className="space-y-2">
                        {selectedOffice.services.map((service, idx) => (
                          <div
                            key={idx}
                            className={`flex items-center space-x-2 p-3 rounded-lg ${
                              darkMode ? 'bg-gray-700' : 'bg-gray-50'
                            }`}
                          >
                            <div className="w-2 h-2 bg-primary-600 rounded-full" />
                            <span className={`${
                              darkMode ? 'text-gray-300' : 'text-gray-700'
                            }`}>
                              {service}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Transport */}
                <div className="mb-8">
                  <h3 className={`font-semibold mb-4 ${
                    darkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                    Як дістатися
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    {selectedOffice.transport.map((item, idx) => (
                      <div
                        key={idx}
                        className={`flex items-center space-x-3 p-3 rounded-lg ${
                          darkMode ? 'bg-gray-700' : 'bg-gray-50'
                        }`}
                      >
                        {getTransportIcon(item.type)}
                        <div>
                          <p className={`font-medium ${
                            darkMode ? 'text-white' : 'text-gray-900'
                          }`}>
                            {item.name}
                          </p>
                          <p className={`text-sm ${
                            darkMode ? 'text-gray-400' : 'text-gray-600'
                          }`}>
                            {item.distance}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex-1 bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center space-x-2"
                  >
                    <Phone className="w-5 h-5" />
                    <span>Зателефонувати</span>
                  </motion.button>
                  
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex-1 border border-primary-600 text-primary-600 hover:bg-primary-50 font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center space-x-2"
                  >
                    <Mail className="w-5 h-5" />
                    <span>Написати email</span>
                  </motion.button>
                </div>
              </div>
            ) : (
              <div className={`p-8 rounded-2xl shadow-soft text-center ${
                darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white'
              }`}>
                <MapPin className={`w-16 h-16 mx-auto mb-4 ${
                  darkMode ? 'text-gray-600' : 'text-gray-400'
                }`} />
                <h3 className={`text-lg font-medium mb-2 ${
                  darkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Оберіть офіс
                </h3>
                <p className={`text-sm ${
                  darkMode ? 'text-gray-500' : 'text-gray-600'
                }`}>
                  Виберіть офіс зі списку зліва, щоб побачити детальну інформацію
                </p>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default MapPage 