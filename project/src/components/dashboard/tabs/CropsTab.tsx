import React, { useState } from 'react';
import { AlertCircle, CheckCircle } from 'lucide-react';

const CropsTab: React.FC = () => {
  const [selectedCrop, setSelectedCrop] = useState('cotton');
// Line 5 (or before component start)
type Crop = {
  id: string;
  name: string;
  emoji: string;
  status: 'healthy' | 'attention' | 'excellent' | string;
  growth: number;
  area: string;
  variety: string;
  plantedDate: string;
  expectedHarvest: string;
};

  const crops = [
    {
      id: 'cotton',
      name: 'Cotton',
      emoji: '🌾',
      status: 'healthy',
      growth: 85,
      area: '12 acres',
      variety: 'Bt Cotton',
      plantedDate: '2024-06-15',
      expectedHarvest: '2024-12-15'
    },
    {
      id: 'rice',
      name: 'Rice',
      emoji: '🌾',
      status: 'attention',
      growth: 60,
      area: '8 acres',
      variety: 'Basmati',
      plantedDate: '2024-07-01',
      expectedHarvest: '2024-11-30'
    },
    {
      id: 'turmeric',
      name: 'Turmeric',
      emoji: '🟡',
      status: 'excellent',
      growth: 70,
      area: '5 acres',
      variety: 'Salem',
      plantedDate: '2024-05-20',
      expectedHarvest: '2025-01-15'
    },
    {
      id: 'chili',
      name: 'Chili',
      emoji: '🌶️',
      status: 'healthy',
      growth: 90,
      area: '3 acres',
      variety: 'Guntur Red',
      plantedDate: '2024-06-01',
      expectedHarvest: '2024-10-30'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'excellent':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'healthy':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'attention':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'excellent':
      case 'healthy':
        return <CheckCircle className="w-4 h-4" />;
      case 'attention':
        return <AlertCircle className="w-4 h-4" />;
      default:
        return <AlertCircle className="w-4 h-4" />;
    }
  };

  const selectedCropData = crops.find(crop => crop.id === selectedCrop);

  const CropCard: React.FC<{ crop: Crop }> = ({ crop }) => (
    <div
      onClick={() => setSelectedCrop(crop.id)}
      className={`bg-white rounded-xl p-4 shadow-sm border cursor-pointer transition-all hover:shadow-md ${
        selectedCrop === crop.id ? 'border-green-500 ring-2 ring-green-200' : 'border-gray-200'
      }`}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-3">
          <span className="text-3xl">{crop.emoji}</span>
          <div>
            <h3 className="font-semibold text-gray-800">{crop.name}</h3>
            <p className="text-sm text-gray-600">{crop.area}</p>
          </div>
        </div>
        <div className={`px-2 py-1 rounded-full text-xs font-medium border flex items-center space-x-1 ${getStatusColor(crop.status)}`}>
          {getStatusIcon(crop.status)}
          <span className="capitalize">{crop.status}</span>
        </div>
      </div>
      
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Growth Progress</span>
          <span className="font-medium">{crop.growth}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-green-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${crop.growth}%` }}
          ></div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 flex items-center space-x-3">
            <span className="text-4xl">🌾</span>
            <span>Crop Management</span>
          </h1>
          <p className="text-gray-600 mt-1">Monitor your crops across Hyderabad, Telangana</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {crops.map((crop) => (
          <CropCard key={crop.id} crop={crop} />
        ))}
      </div>

      {selectedCropData && (
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center space-x-4 mb-6">
            <span className="text-5xl">{selectedCropData.emoji}</span>
            <div>
              <h2 className="text-2xl font-bold text-gray-800">{selectedCropData.name}</h2>
              <p className="text-gray-600">Variety: {selectedCropData.variety}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="font-semibold text-gray-800 text-lg">Crop Details</h3>
              
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Area:</span>
                  <span className="font-medium">{selectedCropData.area}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Planted:</span>
                  <span className="font-medium">{selectedCropData.plantedDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Expected Harvest:</span>
                  <span className="font-medium">{selectedCropData.expectedHarvest}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Growth:</span>
                  <span className="font-medium">{selectedCropData.growth}%</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold text-gray-800 text-lg">Current Status</h3>
              
              <div className="space-y-3">
                <div className={`p-3 rounded-lg border ${getStatusColor(selectedCropData.status)}`}>
                  <div className="flex items-center space-x-2">
                    {getStatusIcon(selectedCropData.status)}
                    <span className="font-medium capitalize">{selectedCropData.status}</span>
                  </div>
                </div>
                
                <div className="bg-green-50 p-3 rounded-lg border border-green-200">
                  <h4 className="font-medium text-green-800 mb-2">Recent Updates</h4>
                  <ul className="text-sm text-green-700 space-y-1">
                    <li>• Watered 2 days ago</li>
                    <li>• No pest activity detected</li>
                    <li>• Growth on track</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CropsTab;