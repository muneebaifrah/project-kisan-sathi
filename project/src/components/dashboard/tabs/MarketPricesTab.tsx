import React, { useState, useEffect, useCallback } from 'react';
import { TrendingUp, TrendingDown, BarChart3, RefreshCw } from 'lucide-react';
import { useOffline } from '../../../contexts/OfflineContext';

// Type definitions
interface CropPrice {
  crop: string;
  emoji: string;
  currentPrice: number;
  previousPrice: number;
  unit: string;
  change: number;
  market: string;
  lastUpdated: string;
}

interface MarketAnalysis {
  topGainer: string;
  topLoser: string;
  avgChange: number;
  totalCrops: number;
}

interface PriceHistory {
  date: string;
  cotton: number;
  rice: number;
  turmeric: number;
}

interface MarketData {
  prices: CropPrice[];
  analysis: MarketAnalysis;
  history: PriceHistory[];
}

interface PriceCardProps {
  crop: CropPrice;
}

interface AnalysisCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  color: string;
}

const MarketPricesTab: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState<'tracker' | 'analysis' | 'history'>('tracker');
  const [marketData, setMarketData] = useState<MarketData | null>(null);
  const { isOnline, cacheData } = useOffline();

  const loadMarketData = useCallback(() => {
    const data: MarketData = {
      prices: [
        {
          crop: 'Cotton',
          emoji: '🌾',
          currentPrice: 5800,
          previousPrice: 5650,
          unit: 'quintal',
          change: 2.5,
          market: 'Secunderabad APMC',
          lastUpdated: '2 hours ago'
        },
        {
          crop: 'Rice',
          emoji: '🍚',
          currentPrice: 2100,
          previousPrice: 2125,
          unit: 'quintal',
          change: -1.2,
          market: 'Hyderabad APMC',
          lastUpdated: '1 hour ago'
        },
        {
          crop: 'Turmeric',
          emoji: '🟡',
          currentPrice: 8500,
          previousPrice: 8050,
          unit: 'quintal',
          change: 5.8,
          market: 'Nizamabad APMC',
          lastUpdated: '3 hours ago'
        },
        {
          crop: 'Chili',
          emoji: '🌶️',
          currentPrice: 12000,
          previousPrice: 11625,
          unit: 'quintal',
          change: 3.2,
          market: 'Guntur APMC',
          lastUpdated: '4 hours ago'
        },
        {
          crop: 'Maize',
          emoji: '🌽',
          currentPrice: 1850,
          previousPrice: 1920,
          unit: 'quintal',
          change: -3.6,
          market: 'Karimnagar APMC',
          lastUpdated: '5 hours ago'
        },
        {
          crop: 'Sugarcane',
          emoji: '🎋',
          currentPrice: 3200,
          previousPrice: 3150,
          unit: 'ton',
          change: 1.6,
          market: 'Medak APMC',
          lastUpdated: '6 hours ago'
        }
      ],
      analysis: {
        topGainer: 'Turmeric',
        topLoser: 'Maize',
        avgChange: 1.2,
        totalCrops: 6
      },
      history: [
        { date: '2024-01-01', cotton: 5200, rice: 2000, turmeric: 7800 },
        { date: '2024-02-01', cotton: 5400, rice: 2050, turmeric: 8000 },
        { date: '2024-03-01', cotton: 5600, rice: 2100, turmeric: 8200 },
        { date: '2024-04-01', cotton: 5800, rice: 2100, turmeric: 8500 }
      ]
    };

    setMarketData(data);
    if (isOnline) {
      cacheData('marketPrices', data);
    }
  }, [isOnline, cacheData]);

  useEffect(() => {
    loadMarketData();
  }, [loadMarketData]);

  const PriceCard: React.FC<PriceCardProps> = ({ crop }) => (
    <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-3">
          <span className="text-3xl">{crop.emoji}</span>
          <div>
            <h3 className="font-semibold text-gray-800">{crop.crop}</h3>
            <p className="text-xs text-gray-600">{crop.market}</p>
          </div>
        </div>
        <div className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${
          crop.change >= 0 
            ? 'bg-green-100 text-green-800' 
            : 'bg-red-100 text-red-800'
        }`}>
          {crop.change >= 0 ? (
            <TrendingUp className="w-3 h-3" />
          ) : (
            <TrendingDown className="w-3 h-3" />
          )}
          <span>{Math.abs(crop.change)}%</span>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-gray-600 text-sm">Current Price</span>
          <span className="text-xl font-bold text-gray-800">
            ₹{crop.currentPrice.toLocaleString()}/{crop.unit}
          </span>
        </div>
        <div className="flex justify-between items-center text-sm">
          <span className="text-gray-500">Previous</span>
          <span className="text-gray-600">₹{crop.previousPrice.toLocaleString()}</span>
        </div>
        <div className="text-xs text-gray-500 text-right">
          Updated {crop.lastUpdated}
        </div>
      </div>
    </div>
  );

  const AnalysisCard: React.FC<AnalysisCardProps> = ({ title, value, icon, color }) => (
    <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
      <div className="flex items-center space-x-3">
        <div className={`p-2 rounded-lg ${color}`}>
          {icon}
        </div>
        <div>
          <p className="text-gray-600 text-sm">{title}</p>
          <p className="text-xl font-bold text-gray-800">{value}</p>
        </div>
      </div>
    </div>
  );

  if (!marketData) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 flex items-center space-x-3">
            <span className="text-4xl">💰</span>
            <span>Market Prices</span>
          </h1>
          <p className="text-gray-600 mt-1">Live prices from Telangana APMCs</p>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="flex bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setSelectedTab('tracker')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                selectedTab === 'tracker' 
                  ? 'bg-white text-green-600 shadow-sm' 
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              Price Tracker
            </button>
            <button
              onClick={() => setSelectedTab('analysis')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                selectedTab === 'analysis' 
                  ? 'bg-white text-green-600 shadow-sm' 
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              Market Analysis
            </button>
            <button
              onClick={() => setSelectedTab('history')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                selectedTab === 'history' 
                  ? 'bg-white text-green-600 shadow-sm' 
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              Price History
            </button>
          </div>
          
          <button
            onClick={loadMarketData}
            className="flex items-center space-x-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Refresh</span>
          </button>
        </div>
      </div>

      {selectedTab === 'tracker' && (
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            {marketData.prices.map((crop: CropPrice, index: number) => (
              <PriceCard key={index} crop={crop} />
            ))}
          </div>
          
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
            <div className="flex items-start space-x-3">
              <span className="text-2xl">💡</span>
              <div>
                <h4 className="font-semibold text-blue-800 mb-1">Market Insight</h4>
                <p className="text-blue-700 text-sm">
                  Turmeric prices are showing strong growth due to increased export demand. 
                  Rice prices remain stable with good harvest yields in Telangana.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {selectedTab === 'analysis' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <AnalysisCard
              title="Top Gainer"
              value={marketData.analysis.topGainer}
              icon={<TrendingUp className="w-5 h-5 text-green-600" />}
              color="bg-green-100"
            />
            <AnalysisCard
              title="Top Loser"
              value={marketData.analysis.topLoser}
              icon={<TrendingDown className="w-5 h-5 text-red-600" />}
              color="bg-red-100"
            />
            <AnalysisCard
              title="Avg Change"
              value={`+${marketData.analysis.avgChange}%`}
              icon={<BarChart3 className="w-5 h-5 text-blue-600" />}
              color="bg-blue-100"
            />
            <AnalysisCard
              title="Total Crops"
              value={marketData.analysis.totalCrops}
              icon={<span className="text-purple-600">🌾</span>}
              color="bg-purple-100"
            />
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Market Trends</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">📈</span>
                  <div>
                    <p className="font-medium text-green-800">Positive Trend</p>
                    <p className="text-sm text-green-600">Cotton, Turmeric, Chili showing growth</p>
                  </div>
                </div>
                <span className="text-green-600 font-semibold">3 crops</span>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">📉</span>
                  <div>
                    <p className="font-medium text-red-800">Declining Trend</p>
                    <p className="text-sm text-red-600">Rice, Maize prices dropping</p>
                  </div>
                </div>
                <span className="text-red-600 font-semibold">2 crops</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {selectedTab === 'history' && (
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Price History (Last 4 Months)</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Date</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Cotton (₹/quintal)</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Rice (₹/quintal)</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Turmeric (₹/quintal)</th>
                </tr>
              </thead>
              <tbody>
                {marketData.history.map((entry: PriceHistory, index: number) => (
                  <tr key={index} className="border-b border-gray-100">
                    <td className="py-3 px-4 text-gray-800">{entry.date}</td>
                    <td className="py-3 px-4 text-gray-800">₹{entry.cotton.toLocaleString()}</td>
                    <td className="py-3 px-4 text-gray-800">₹{entry.rice.toLocaleString()}</td>
                    <td className="py-3 px-4 text-gray-800">₹{entry.turmeric.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default MarketPricesTab;