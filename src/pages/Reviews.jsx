import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Star, 
  MessageCircle, 
  Filter,
  ThumbsUp,
  ThumbsDown,
  Send,
  User,
  Calendar,
  CheckCircle
} from 'lucide-react'
import { toast } from 'react-hot-toast'

const Reviews = ({ darkMode }) => {
  const [reviews, setReviews] = useState([
    {
      id: 1,
      name: 'Марія Іванова',
      rating: 5,
      date: '2025-01-20',
      text: 'Дуже задоволена роботою компанії! Реструктуризувала борг за комунальні послуги на дуже вигідних умовах. Щомісячний платіж зменшився на 40%. Спеціалісти професійні та уважні.',
      helpful: 12,
      notHelpful: 1,
      verified: true
    },
    {
      id: 2,
      name: 'Петро Сидоренко',
      rating: 4,
      date: '2025-01-18',
      text: 'Хороший сервіс, все зробили швидко та якісно. Єдиний мінус - довго чекав відповіді на email. Але в цілому рекомендую.',
      helpful: 8,
      notHelpful: 2,
      verified: true
    },
    {
      id: 3,
      name: 'Анна Коваленко',
      rating: 5,
      date: '2025-01-15',
      text: 'Відмінна робота! Допомогли реструктуризувати борг за електроенергію та воду. Процес зайняв всього 3 дні. Дуже дякую!',
      helpful: 15,
      notHelpful: 0,
      verified: true
    },
    {
      id: 4,
      name: 'Олександр Петренко',
      rating: 3,
      date: '2025-01-12',
      text: 'Сервіс непоганий, але умови могли б бути кращими. Платіж зменшився тільки на 20%. Хоча в цілому задоволений.',
      helpful: 5,
      notHelpful: 3,
      verified: true
    },
    {
      id: 5,
      name: 'Тетяна Мельник',
      rating: 5,
      date: '2025-01-10',
      text: 'Професійний підхід до справи. Спеціалісти детально пояснили всі умови, допомогли з документами. Результат перевершив очікування!',
      helpful: 20,
      notHelpful: 1,
      verified: true
    }
  ])

  const [filter, setFilter] = useState('all')
  const [sortBy, setSortBy] = useState('date')
  const [showReviewForm, setShowReviewForm] = useState(false)
  const [newReview, setNewReview] = useState({
    name: '',
    rating: 5,
    text: ''
  })

  const averageRating = reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length
  const totalReviews = reviews.length

  const ratingStats = {
    5: reviews.filter(r => r.rating === 5).length,
    4: reviews.filter(r => r.rating === 4).length,
    3: reviews.filter(r => r.rating === 3).length,
    2: reviews.filter(r => r.rating === 2).length,
    1: reviews.filter(r => r.rating === 1).length
  }

  const filteredReviews = reviews
    .filter(review => {
      if (filter === 'all') return true
      if (filter === '5') return review.rating === 5
      if (filter === '4') return review.rating === 4
      if (filter === '3') return review.rating === 3
      if (filter === '2') return review.rating === 2
      if (filter === '1') return review.rating === 1
      return true
    })
    .sort((a, b) => {
      if (sortBy === 'date') return new Date(b.date) - new Date(a.date)
      if (sortBy === 'rating') return b.rating - a.rating
      if (sortBy === 'helpful') return b.helpful - a.helpful
      return 0
    })

  const handleHelpful = (reviewId, isHelpful) => {
    setReviews(prev => prev.map(review => 
      review.id === reviewId 
        ? { 
            ...review, 
            helpful: isHelpful ? review.helpful + 1 : review.helpful,
            notHelpful: !isHelpful ? review.notHelpful + 1 : review.notHelpful
          }
        : review
    ))
  }

  const handleSubmitReview = (e) => {
    e.preventDefault()
    
    if (!newReview.name.trim() || !newReview.text.trim()) {
      toast.error('Будь ласка, заповніть всі поля')
      return
    }

    const review = {
      id: reviews.length + 1,
      name: newReview.name,
      rating: newReview.rating,
      date: new Date().toISOString().split('T')[0],
      text: newReview.text,
      helpful: 0,
      notHelpful: 0,
      verified: false
    }

    setReviews(prev => [review, ...prev])
    setNewReview({ name: '', rating: 5, text: '' })
    setShowReviewForm(false)
    toast.success('Дякуємо за ваш відгук!')
  }

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
            Відгуки клієнтів
          </h1>
          <p className={`text-lg ${
            darkMode ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Дізнайтеся, що говорять про нас наші клієнти
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Stats Sidebar */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-1"
          >
            <div className={`p-6 rounded-2xl shadow-soft ${
              darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white'
            }`}>
              {/* Overall Rating */}
              <div className="text-center mb-6">
                <div className="text-3xl font-bold text-primary-600 mb-2">
                  {averageRating.toFixed(1)}
                </div>
                <div className="flex justify-center mb-2">
                  {renderStars(Math.round(averageRating))}
                </div>
                <div className={`text-sm ${
                  darkMode ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  {totalReviews} відгуків
                </div>
              </div>

              {/* Rating Breakdown */}
              <div className="space-y-2 mb-6">
                {[5, 4, 3, 2, 1].map(rating => (
                  <div key={rating} className="flex items-center space-x-2">
                    <div className="flex">
                      {renderStars(rating)}
                    </div>
                    <div className={`flex-1 h-2 rounded-full ${
                      darkMode ? 'bg-gray-700' : 'bg-gray-200'
                    }`}>
                      <div 
                        className="h-full bg-yellow-400 rounded-full"
                        style={{ 
                          width: `${(ratingStats[rating] / totalReviews) * 100}%` 
                        }}
                      />
                    </div>
                    <span className={`text-sm w-8 text-right ${
                      darkMode ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      {ratingStats[rating]}
                    </span>
                  </div>
                ))}
              </div>

              {/* Write Review Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setShowReviewForm(true)}
                className="w-full bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors"
              >
                Написати відгук
              </motion.button>
            </div>
          </motion.div>

          {/* Reviews List */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="lg:col-span-3"
          >
            {/* Filters */}
            <div className={`p-4 rounded-xl shadow-soft mb-6 ${
              darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white'
            }`}>
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex items-center space-x-2">
                  <Filter className="w-5 h-5 text-gray-400" />
                  <span className={`text-sm font-medium ${
                    darkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Фільтр:
                  </span>
                  <select
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    className={`text-sm border rounded-lg px-3 py-1 transition-colors ${
                      darkMode 
                        ? 'bg-gray-700 border-gray-600 text-white' 
                        : 'bg-white border-gray-300 text-gray-900'
                    }`}
                  >
                    <option value="all">Всі відгуки</option>
                    <option value="5">5 зірок</option>
                    <option value="4">4 зірки</option>
                    <option value="3">3 зірки</option>
                    <option value="2">2 зірки</option>
                    <option value="1">1 зірка</option>
                  </select>
                </div>

                <div className="flex items-center space-x-2">
                  <span className={`text-sm font-medium ${
                    darkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Сортування:
                  </span>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className={`text-sm border rounded-lg px-3 py-1 transition-colors ${
                      darkMode 
                        ? 'bg-gray-700 border-gray-600 text-white' 
                        : 'bg-white border-gray-300 text-gray-900'
                    }`}
                  >
                    <option value="date">За датою</option>
                    <option value="rating">За рейтингом</option>
                    <option value="helpful">За корисністю</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Reviews */}
            <div className="space-y-6">
              <AnimatePresence>
                {filteredReviews.map((review, index) => (
                  <motion.div
                    key={review.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className={`p-6 rounded-2xl shadow-soft ${
                      darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white'
                    }`}
                  >
                    {/* Review Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          darkMode ? 'bg-gray-700' : 'bg-gray-100'
                        }`}>
                          <User className="w-5 h-5 text-gray-500" />
                        </div>
                        <div>
                          <div className="flex items-center space-x-2">
                            <h3 className={`font-semibold ${
                              darkMode ? 'text-white' : 'text-gray-900'
                            }`}>
                              {review.name}
                            </h3>
                            {review.verified && (
                              <CheckCircle className="w-4 h-4 text-green-500" />
                            )}
                          </div>
                          <div className="flex items-center space-x-2 text-sm text-gray-500">
                            <Calendar className="w-4 h-4" />
                            <span>{new Date(review.date).toLocaleDateString('uk-UA')}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex">
                        {renderStars(review.rating)}
                      </div>
                    </div>

                    {/* Review Text */}
                    <p className={`mb-4 ${
                      darkMode ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      {review.text}
                    </p>

                    {/* Review Actions */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <button
                          onClick={() => handleHelpful(review.id, true)}
                          className={`flex items-center space-x-1 text-sm transition-colors ${
                            darkMode 
                              ? 'text-gray-400 hover:text-green-400' 
                              : 'text-gray-500 hover:text-green-600'
                          }`}
                        >
                          <ThumbsUp className="w-4 h-4" />
                          <span>{review.helpful}</span>
                        </button>
                        <button
                          onClick={() => handleHelpful(review.id, false)}
                          className={`flex items-center space-x-1 text-sm transition-colors ${
                            darkMode 
                              ? 'text-gray-400 hover:text-red-400' 
                              : 'text-gray-500 hover:text-red-600'
                          }`}
                        >
                          <ThumbsDown className="w-4 h-4" />
                          <span>{review.notHelpful}</span>
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>

        {/* Review Form Modal */}
        <AnimatePresence>
          {showReviewForm && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
              onClick={() => setShowReviewForm(false)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className={`w-full max-w-md p-6 rounded-2xl shadow-strong ${
                  darkMode ? 'bg-gray-800' : 'bg-white'
                }`}
                onClick={(e) => e.stopPropagation()}
              >
                <h3 className={`text-xl font-semibold mb-4 ${
                  darkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  Написати відгук
                </h3>

                <form onSubmit={handleSubmitReview} className="space-y-4">
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${
                      darkMode ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      Ваше ім'я
                    </label>
                    <input
                      type="text"
                      value={newReview.name}
                      onChange={(e) => setNewReview(prev => ({ ...prev, name: e.target.value }))}
                      className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors ${
                        darkMode 
                          ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                          : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                      }`}
                      placeholder="Введіть ваше ім'я"
                    />
                  </div>

                  <div>
                    <label className={`block text-sm font-medium mb-2 ${
                      darkMode ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      Рейтинг
                    </label>
                    <div className="flex space-x-1">
                      {[1, 2, 3, 4, 5].map(rating => (
                        <button
                          key={rating}
                          type="button"
                          onClick={() => setNewReview(prev => ({ ...prev, rating }))}
                          className="focus:outline-none"
                        >
                          <Star
                            className={`w-6 h-6 ${
                              rating <= newReview.rating 
                                ? 'text-yellow-400 fill-current' 
                                : 'text-gray-300'
                            }`}
                          />
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className={`block text-sm font-medium mb-2 ${
                      darkMode ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      Ваш відгук
                    </label>
                    <textarea
                      value={newReview.text}
                      onChange={(e) => setNewReview(prev => ({ ...prev, text: e.target.value }))}
                      rows={4}
                      className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors ${
                        darkMode 
                          ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                          : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                      }`}
                      placeholder="Поділіться вашими враженнями..."
                    />
                  </div>

                  <div className="flex space-x-3">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="submit"
                      className="flex-1 bg-primary-600 hover:bg-primary-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors flex items-center justify-center space-x-2"
                    >
                      <Send className="w-4 h-4" />
                      <span>Надіслати</span>
                    </motion.button>
                    
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="button"
                      onClick={() => setShowReviewForm(false)}
                      className={`px-4 py-2 border rounded-lg transition-colors ${
                        darkMode 
                          ? 'border-gray-600 text-gray-300 hover:bg-gray-700' 
                          : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      Скасувати
                    </motion.button>
                  </div>
                </form>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default Reviews 