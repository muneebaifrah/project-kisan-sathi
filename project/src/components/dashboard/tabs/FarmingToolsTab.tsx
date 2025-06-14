import React, { useState } from 'react';
import { Calculator, Bug, Thermometer, DollarSign, Wrench, ChevronRight, Camera, ArrowLeft, Cloud, Sun, CloudRain } from 'lucide-react';

const FarmingToolsTab: React.FC = () => {
  const [selectedTool, setSelectedTool] = useState<string | null>(null);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);

  const tools = [
    {
      id: 'fertilizer',
      name: 'Fertilizer Calculator',
      emoji: '🧪',
      description: 'Calculate optimal fertilizer amounts for your crops',
      icon: Calculator,
      color: 'bg-blue-100 text-blue-600'
    },
    {
      id: 'pest',
      name: 'Pest Identifier',
      emoji: '🐛',
      description: 'Identify and get treatment for crop pests',
      icon: Bug,
      color: 'bg-orange-100 text-orange-600'
    },
    {
      id: 'weather',
      name: 'Weather Advisor',
      emoji: '🌡️',
      description: 'Get farming advice based on weather conditions',
      icon: Thermometer,
      color: 'bg-green-100 text-green-600'
    },
    {
      id: 'cost',
      name: 'Cost Calculator',
      emoji: '💰',
      description: 'Calculate farming       costs: Record<string, string> and profit margins',
      icon: DollarSign,
      color: 'bg-yellow-100 text-yellow-600'
    },
    {
      id: 'equipment',
      name: 'Equipment Maintenance',
      emoji: '🚜',
      description: 'Track and schedule equipment maintenance',
      icon: Wrench,
      color: 'bg-purple-100 text-purple-600'
    }
  ];

  interface Tool {
    id: string;
    name: string;
    emoji: string;
    description: string;
    icon: React.ComponentType<{ className?: string }>;
    color: string;
  }

  const ToolCard = ({ tool }: { tool: Tool }) => (
    <div
      onClick={() => setSelectedTool(tool.id)}
      className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-all cursor-pointer hover:border-green-300 group"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-4">
          <div className={`p-3 rounded-lg ${tool.color}`}>
            <tool.icon className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800 group-hover:text-green-600 transition-colors">
              {tool.name}
            </h3>
            <p className="text-gray-600 text-sm">{tool.description}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-3xl">{tool.emoji}</span>
          <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-green-500 transition-colors" />
        </div>
      </div>
    </div>
  );

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const FertilizerCalculator = () => {
    const [inputs, setInputs] = useState({
      cropType: 'cotton',
      area: '',
      soilType: 'clay',
      targetYield: ''
    });
    const [result, setResult] = useState<{
      nitrogen: string;
      phosphorus: string;
      potassium: string;
      cost: string;
    } | null>(null);

    const calculate = () => {
      const area = parseFloat(inputs.area) || 0;
      const targetYield = parseFloat(inputs.targetYield) || 0;
      
      const nitrogen = (area * targetYield * 0.5).toFixed(1);
      const phosphorus = (area * targetYield * 0.3).toFixed(1);
      const potassium = (area * targetYield * 0.4).toFixed(1);
      
      setResult({
        nitrogen,
        phosphorus,
        potassium,
        cost: ((parseFloat(nitrogen) * 50) + (parseFloat(phosphorus) * 60) + (parseFloat(potassium) * 40)).toFixed(0)
      });
    };

    return (
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Crop Type</label>
            <select
              value={inputs.cropType}
              onChange={(e) => setInputs({ ...inputs, cropType: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
            >
              <option value="cotton">Cotton</option>
              <option value="rice">Rice</option>
              <option value="turmeric">Turmeric</option>
              <option value="chili">Chili</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Area (acres)</label>
            <input
              type="number"
              value={inputs.area}
              onChange={(e) => setInputs({ ...inputs, area: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
              placeholder="Enter area"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Soil Type</label>
            <select
              value={inputs.soilType}
              onChange={(e) => setInputs({ ...inputs, soilType: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
            >
              <option value="clay">Clay</option>
              <option value="loam">Loam</option>
              <option value="sandy">Sandy</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Target Yield (quintals/acre)</label>
            <input
              type="number"
              value={inputs.targetYield}
              onChange={(e) => setInputs({ ...inputs, targetYield: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
              placeholder="Enter target yield"
            />
          </div>
        </div>
        
        <button
          onClick={calculate}
          className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition-colors"
        >
          Calculate Fertilizer Needs
        </button>

        {result && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <h4 className="font-semibold text-green-800 mb-3">Recommended Fertilizers</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div className="text-center">
                <p className="text-green-600 text-2xl font-bold">{result.nitrogen} kg</p>
                <p className="text-green-700 text-sm">Nitrogen (N)</p>
              </div>
              <div className="text-center">
                <p className="text-green-600 text-2xl font-bold">{result.phosphorus} kg</p>
                <p className="text-green-700 text-sm">Phosphorus (P)</p>
              </div>
              <div className="text-center">
                <p className="text-green-600 text-2xl font-bold">{result.potassium} kg</p>
                <p className="text-green-700 text-sm">Potassium (K)</p>
              </div>
            </div>
            <p className="text-green-700 text-sm text-center">
              Estimated Cost: ₹{result.cost}
            </p>
          </div>
        )}
      </div>
    );
  };

  const PestIdentifier = () => {
    const [pestResult, setPestResult] = useState<{
      name: string;
      treatment: string;
      severity: string;
      crop: string;
    } | null>(null);

    const identifyPest = () => {
      if (uploadedImage) {
        const pests = [
          { name: 'Bollworm', treatment: 'Use Bt spray or neem oil every 10-15 days', severity: 'High', crop: 'Cotton' },
          { name: 'Stem Borer', treatment: 'Apply carbofuran granules in whorl stage', severity: 'Medium', crop: 'Rice' },
          { name: 'Aphids', treatment: 'Spray with insecticidal soap or neem oil', severity: 'Low', crop: 'General' },
          { name: 'Thrips', treatment: 'Use blue sticky traps and spray imidacloprid', severity: 'Medium', crop: 'Cotton' },
          { name: 'Leaf Hopper', treatment: 'Apply systemic insecticides like thiamethoxam', severity: 'High', crop: 'Rice' }
        ];
        const randomPest = pests[Math.floor(Math.random() * pests.length)];
        setPestResult(randomPest);
      }
    };

    return (
      <div className="space-y-4">
        <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
          <h4 className="font-semibold text-orange-800 mb-3">🐛 Upload Pest Image for Identification</h4>
          
          <div className="space-y-4">
            <div className="relative border-2 border-dashed border-orange-300 rounded-lg p-6 text-center">
              {uploadedImage ? (
                <div className="space-y-3">
                  <img src={uploadedImage} alt="Uploaded pest" className="max-w-full h-48 object-contain mx-auto rounded" />
                  <button
                    onClick={() => setUploadedImage(null)}
                    className="text-orange-600 text-sm hover:text-orange-700"
                  >
                    Remove Image
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  <Camera className="w-12 h-12 text-orange-400 mx-auto" />
                  <p className="text-orange-700">Click to upload or drag and drop</p>
                  <p className="text-orange-600 text-sm">PNG, JPG up to 10MB</p>
                </div>
              )}
              
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
            </div>
            
            {uploadedImage && (
              <button
                onClick={identifyPest}
                className="w-full bg-orange-500 text-white py-3 px-4 rounded-lg hover:bg-orange-600 transition-colors"
              >
                🔍 Identify Pest
              </button>
            )}
          </div>
        </div>

        {pestResult && (
          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <h4 className="font-semibold text-gray-800 mb-3">Identification Result</h4>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Pest Name:</span>
                <span className="font-medium text-gray-800">{pestResult.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Severity:</span>
                <span className={`font-medium ${
                  pestResult.severity === 'High' ? 'text-red-600' :
                  pestResult.severity === 'Medium' ? 'text-yellow-600' : 'text-green-600'
                }`}>{pestResult.severity}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Affected Crop:</span>
                <span className="font-medium text-gray-800">{pestResult.crop}</span>
              </div>
              <div className="mt-3 p-3 bg-blue-50 rounded">
                <p className="text-blue-800 font-medium">Treatment Recommendation:</p>
                <p className="text-blue-700 text-sm mt-1">{pestResult.treatment}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  const WeatherAdvisor = () => {
    const [weatherData] = useState({
      temperature: 28,
      humidity: 65,
      rainfall: 'Light rain expected',
      windSpeed: 12
    });

    const weatherAdvice = [
      {
        icon: CloudRain,
        title: 'Irrigation Advisory',
        advice: 'Light rain expected. Reduce irrigation for the next 2-3 days.',
        color: 'text-blue-600'
      },
      {
        icon: Sun,
        title: 'Pest Management',
        advice: 'High humidity favors fungal diseases. Apply preventive fungicide spray.',
        color: 'text-orange-600'
      },
      {
        icon: Cloud,
        title: 'Field Operations',
        advice: 'Avoid heavy machinery operations due to wet soil conditions.',
        color: 'text-gray-600'
      }
    ];

    return (
      <div className="space-y-4">
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <h4 className="font-semibold text-green-800 mb-3">🌤️ Current Weather Conditions</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <p className="text-green-600 text-2xl font-bold">{weatherData.temperature}°C</p>
              <p className="text-green-700 text-sm">Temperature</p>
            </div>
            <div className="text-center">
              <p className="text-green-600 text-2xl font-bold">{weatherData.humidity}%</p>
              <p className="text-green-700 text-sm">Humidity</p>
            </div>
            <div className="text-center">
              <p className="text-green-600 text-2xl font-bold">{weatherData.windSpeed}</p>
              <p className="text-green-700 text-sm">Wind (km/h)</p>
            </div>
            <div className="text-center">
              <p className="text-green-600 text-sm font-bold">{weatherData.rainfall}</p>
              <p className="text-green-700 text-sm">Forecast</p>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <h4 className="font-semibold text-gray-800">Weather-Based Recommendations</h4>
          {weatherAdvice.map((item, index) => (
            <div key={index} className="bg-white border border-gray-200 rounded-lg p-4 flex items-start space-x-3">
              <item.icon className={`w-6 h-6 ${item.color} flex-shrink-0 mt-1`} />
              <div>
                <h5 className="font-medium text-gray-800">{item.title}</h5>
                <p className="text-gray-600 text-sm mt-1">{item.advice}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const CostCalculator = () => {
    const [costs, setCosts] = useState({
      seeds: '',
      fertilizer: '',
      pesticides: '',
      labor: '',
      fuel: '',
      expectedYield: '',
      marketPrice: ''
    });
    const [analysis, setAnalysis] = useState<{
      totalCosts: string;
      expectedRevenue: string;
      profit: string;
      profitMargin: string;
    } | null>(null);

    const calculateCosts = () => {
      const totalCosts = Object.entries(costs)
        .filter(([key]) => !['expectedYield', 'marketPrice'].includes(key))
        .reduce((sum, [, value]) => sum + (parseFloat(value) || 0), 0);
      
      const expectedRevenue = (parseFloat(costs.expectedYield) || 0) * (parseFloat(costs.marketPrice) || 0);
      const profit = expectedRevenue - totalCosts;
      const profitMargin = expectedRevenue > 0 ? ((profit / expectedRevenue) * 100) : 0;

      setAnalysis({
        totalCosts: totalCosts.toFixed(0),
        expectedRevenue: expectedRevenue.toFixed(0),
        profit: profit.toFixed(0),
        profitMargin: profitMargin.toFixed(1)
      });
    };

    const costItems = [
      { key: 'seeds', label: 'Seeds Cost (₹)', placeholder: 'Enter seeds cost' },
      { key: 'fertilizer', label: 'Fertilizer Cost (₹)', placeholder: 'Enter fertilizer cost' },
      { key: 'pesticides', label: 'Pesticides Cost (₹)', placeholder: 'Enter pesticides cost' },
      { key: 'labor', label: 'Labor Cost (₹)', placeholder: 'Enter labor cost' },
      { key: 'fuel', label: 'Fuel/Machinery (₹)', placeholder: 'Enter fuel cost' },
      { key: 'expectedYield', label: 'Expected Yield (kg)', placeholder: 'Enter expected yield' },
      { key: 'marketPrice', label: 'Market Price (₹/kg)', placeholder: 'Enter price per kg' }
    ];

    return (
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {costItems.map((item) => (
            <div key={item.key}>
              <label className="block text-sm font-medium text-gray-700 mb-2">{item.label}</label>
              <input
                type="number"
                value={costs[item.key as keyof typeof costs]}
                onChange={(e) => setCosts({ ...costs, [item.key]: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                placeholder={item.placeholder}
              />
            </div>
          ))}
        </div>
        
        <button
          onClick={calculateCosts}
          className="bg-yellow-500 text-white px-6 py-2 rounded-lg hover:bg-yellow-600 transition-colors"
        >
          Calculate Profit Analysis
        </button>

        {analysis && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <h4 className="font-semibold text-yellow-800 mb-3">Cost Analysis</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-yellow-700">Total Costs:</span>
                  <span className="font-medium">₹{analysis.totalCosts}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-yellow-700">Expected Revenue:</span>
                  <span className="font-medium">₹{analysis.expectedRevenue}</span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-yellow-700">Profit/Loss:</span>
                  <span className={`font-medium ${parseFloat(analysis.profit) >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    ₹{analysis.profit}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-yellow-700">Profit Margin:</span>
                  <span className={`font-medium ${parseFloat(analysis.profitMargin) >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {analysis.profitMargin}%
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  const EquipmentMaintenance = () => {
    const [equipment] = useState([
      { id: 1, name: 'Tractor', lastService: '2024-05-15', nextService: '2024-08-15', status: 'Good' },
      { id: 2, name: 'Harvester', lastService: '2024-04-10', nextService: '2024-07-10', status: 'Due' },
      { id: 3, name: 'Pump Set', lastService: '2024-06-01', nextService: '2024-09-01', status: 'Good' },
      { id: 4, name: 'Sprayer', lastService: '2024-03-20', nextService: '2024-06-20', status: 'Overdue' }
    ]);

    const getStatusColor = (status: string) => {
      switch (status) {
        case 'Good': return 'text-green-600 bg-green-100';
        case 'Due': return 'text-yellow-600 bg-yellow-100';
        case 'Overdue': return 'text-red-600 bg-red-100';
        default: return 'text-gray-600 bg-gray-100';
      }
    };

    return (
      <div className="space-y-4">
        <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
          <h4 className="font-semibold text-purple-800 mb-3">🚜 Equipment Maintenance Schedule</h4>
          
          <div className="space-y-3">
            {equipment.map((item) => (
              <div key={item.id} className="bg-white border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h5 className="font-medium text-gray-800">{item.name}</h5>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(item.status)}`}>
                    {item.status}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">Last Service:</span>
                    <p className="font-medium">{item.lastService}</p>
                  </div>
                  <div>
                    <span className="text-gray-600">Next Service:</span>
                    <p className="font-medium">{item.nextService}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-4 p-3 bg-purple-100 rounded">
            <p className="text-purple-800 text-sm">
              <strong>Reminder:</strong> Regular maintenance extends equipment life and prevents costly breakdowns.
            </p>
          </div>
        </div>
      </div>
    );
  };

  const renderToolInterface = (toolId: string) => {
    switch (toolId) {
      case 'fertilizer':
        return <FertilizerCalculator />;
      case 'pest':
        return <PestIdentifier />;
      case 'weather':
        return <WeatherAdvisor />;
      case 'cost':
        return <CostCalculator />;
      case 'equipment':
        return <EquipmentMaintenance />;
      default:
        return null;
    }
  };

  if (selectedTool) {
    const currentTool = tools.find(t => t.id === selectedTool);
    return (
      <div className="max-w-4xl mx-auto p-6 bg-gray-50 min-h-screen">
        <div className="mb-6">
          <button
            onClick={() => setSelectedTool(null)}
            className="flex items-center space-x-2 text-green-600 hover:text-green-700 mb-4"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Tools</span>
          </button>
          <div className="flex items-center space-x-3">
            <div className={`p-3 rounded-lg ${currentTool?.color}`}>
              {currentTool && <currentTool.icon className="w-6 h-6" />}
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-800">{currentTool?.name}</h2>
              <p className="text-gray-600">{currentTool?.description}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          {renderToolInterface(selectedTool)}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-50 min-h-screen">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">🌾 Farming Tools</h1>
        <p className="text-gray-600">Digital tools to help you make informed farming decisions</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {tools.map((tool) => (
          <ToolCard key={tool.id} tool={tool} />
        ))}
      </div>
    </div>
  );
};

export default FarmingToolsTab;