import { Link } from 'react-router-dom'

const HomePage = () => {
  return (
    <div className="min-h-screen bg-blue-50 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-blue-900 mb-4">
          Мирна Угода
        </h1>
        <p className="text-xl text-blue-700 mb-8">
          Твій Спокій, Твоя Угода
        </p>
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Сайт працює!
          </h2>
          <p className="text-gray-600 mb-6">
            Реструктуризація боргів за комунальні послуги
          </p>
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition-colors">
            Подати заявку
          </button>
        </div>
      </div>
    </div>
  )
}

export default HomePage 