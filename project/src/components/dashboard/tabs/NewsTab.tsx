import React, { useState, useEffect } from 'react';
import { Clock, ExternalLink, Filter } from 'lucide-react';

interface NewsItem {
  id: number;
  title: string;
  summary: string;
  category: string;
  source: string;
  timestamp: string;
  image: string;
  readTime: string;
}

interface Category {
  id: string;
  name: string;
  emoji: string;
}

interface NewsCardProps {
  news: NewsItem;
}

const NewsTab: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [newsData, setNewsData] = useState<NewsItem[]>([]);

  useEffect(() => {
    loadNews();
  }, []);

  const loadNews = () => {
    const news: NewsItem[] = [
      {
        id: 1,
        title: 'Telangana Government Announces New Cotton Support Scheme',
        summary: 'State government launches comprehensive support program for cotton farmers with subsidized seeds and equipment.',
        category: 'government',
        source: 'Telangana Today',
        timestamp: '2 hours ago',
        image: '🏛️',
        readTime: '3 min read'
      },
      {
        id: 2,
        title: 'Record Turmeric Harvest Expected in Nizamabad District',
        summary: 'Favorable weather conditions and improved farming techniques lead to bumper turmeric crop predictions.',
        category: 'crops',
        source: 'The Hindu',
        timestamp: '4 hours ago',
        image: '🟡',
        readTime: '2 min read'
      },
      {
        id: 3,
        title: 'Digital Agriculture Platform Launched for Hyderabad Farmers',
        summary: 'New mobile app provides real-time market prices, weather updates, and farming advice to local farmers.',
        category: 'technology',
        source: 'Deccan Chronicle',
        timestamp: '6 hours ago',
        image: '📱',
        readTime: '4 min read'
      },
      {
        id: 4,
        title: 'Monsoon Update: Above Normal Rainfall Expected',
        summary: 'IMD predicts good monsoon season for Telangana, benefiting Kharif crops across the state.',
        category: 'weather',
        source: 'Weather.com',
        timestamp: '8 hours ago',
        image: '🌧️',
        readTime: '2 min read'
      },
      {
        id: 5,
        title: 'Export Opportunities Boost Chili Prices in Guntur Market',
        summary: 'International demand surge leads to significant price increases for red chili varieties.',
        category: 'market',
        source: 'Business Standard',
        timestamp: '12 hours ago',
        image: '🌶️',
        readTime: '3 min read'
      },
      {
        id: 6,
        title: 'Sustainable Farming Workshop Scheduled in Warangal',
        summary: 'Agricultural department organizes training on organic farming and water conservation techniques.',
        category: 'education',
        source: 'Eenadu',
        timestamp: '1 day ago',
        image: '🌱',
        readTime: '5 min read'
      }
    ];

    setNewsData(news);
  };

  const categories: Category[] = [
    { id: 'all', name: 'All News', emoji: '📰' },
    { id: 'government', name: 'Government', emoji: '🏛️' },
    { id: 'crops', name: 'Crops', emoji: '🌾' },
    { id: 'market', name: 'Market', emoji: '💰' },
    { id: 'weather', name: 'Weather', emoji: '🌤️' },
    { id: 'technology', name: 'Technology', emoji: '💻' },
    { id: 'education', name: 'Education', emoji: '📚' }
  ];

  const filteredNews = selectedCategory === 'all' 
    ? newsData 
    : newsData.filter(news => news.category === selectedCategory);

  const NewsCard: React.FC<NewsCardProps> = ({ news }) => (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-all cursor-pointer hover:border-green-300">
      <div className="flex items-start space-x-4">
        <div className="text-4xl">{news.image}</div>
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-2">
            <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full font-medium capitalize">
              {news.category}
            </span>
            <span className="text-xs text-gray-500">{news.readTime}</span>
          </div>
          
          <h3 className="text-lg font-semibold text-gray-800 mb-2 hover:text-green-600 transition-colors">
            {news.title}
          </h3>
          
          <p className="text-gray-600 text-sm mb-3 line-clamp-2">
            {news.summary}
          </p>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 text-xs text-gray-500">
              <span>{news.source}</span>
              <span>•</span>
              <div className="flex items-center space-x-1">
                <Clock className="w-3 h-3" />
                <span>{news.timestamp}</span>
              </div>
            </div>
            
            <button className="flex items-center space-x-1 text-green-600 hover:text-green-700 text-xs font-medium">
              <span>Read More</span>
              <ExternalLink className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 flex items-center space-x-3">
            <span className="text-4xl">📰</span>
            <span>Agricultural News</span>
          </h1>
          <p className="text-gray-600 mt-1">Latest updates from Hyderabad, Telangana</p>
        </div>
        
        <button className="flex items-center space-x-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors">
          <Filter className="w-4 h-4" />
          <span>Filter</span>
        </button>
      </div>

      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              selectedCategory === category.id
                ? 'bg-green-500 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            <span>{category.emoji}</span>
            <span>{category.name}</span>
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-4">
        {filteredNews.map((news) => (
          <NewsCard key={news.id} news={news} />
        ))}
      </div>

      {filteredNews.length === 0 && (
        <div className="text-center py-12">
          <span className="text-6xl mb-4 block">📰</span>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">No news found</h3>
          <p className="text-gray-600">Try selecting a different category</p>
        </div>
      )}
    </div>
  );
};

export default NewsTab;