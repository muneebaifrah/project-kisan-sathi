import React, { useState } from 'react';
import { Wifi, WifiOff, Download, Volume2, User } from 'lucide-react';
import { useAuth } from '../../../contexts/AuthContext';
import { useOffline } from '../../../contexts/OfflineContext';

// Type definitions
interface SettingSectionProps {
  title: string;
  children: React.ReactNode;
}

interface ToggleSwitchProps {
  enabled: boolean;
  onChange: () => void;
  label: string;
  description: string;
}

const SettingsTab: React.FC = () => {
  const { user, updateUser } = useAuth();
  const { isOnline, enableOfflineMode, isOfflineModeEnabled } = useOffline();
  const [settings, setSettings] = useState({
    language: user?.language || 'english',
    notifications: true,
    voiceEnabled: true,
    offlineMode: isOfflineModeEnabled,
    voiceLanguage: user?.language || 'english'
  });

  const languages = [
    { code: 'english', name: 'English', native: 'English' },
    { code: 'hindi', name: 'Hindi', native: 'हिंदी' },
    { code: 'telugu', name: 'Telugu', native: 'తెలుగు' },
    { code: 'urdu', name: 'Urdu', native: 'اردو' }
  ];

  const handleLanguageChange = (language: string) => {
    setSettings({ ...settings, language, voiceLanguage: language });
    updateUser({ language });
  };

  const handleOfflineModeToggle = () => {
    if (!settings.offlineMode) {
      enableOfflineMode();
    }
    setSettings({ ...settings, offlineMode: !settings.offlineMode });
  };

  const testVoice = () => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(getTestMessage(settings.voiceLanguage));
      
      // Set Indian voice based on selected language
      const voices = window.speechSynthesis.getVoices();
      const langCode = getLanguageCode(settings.voiceLanguage);
      
      // Find Indian voice for the selected language
      let voice = voices.find(v => 
        v.lang === langCode && 
        (v.name.includes('India') || v.name.includes('Indian'))
      );
      
      // Fallback to any voice of the language
      if (!voice) {
        voice = voices.find(v => v.lang.startsWith(langCode.split('-')[0]));
      }
      
      // Final fallback to English Indian voice
      if (!voice) {
        voice = voices.find(v => 
          v.lang === 'en-IN' || 
          (v.lang.startsWith('en') && v.name.includes('India'))
        );
      }
      
      if (voice) {
        utterance.voice = voice;
      }
      
      utterance.rate = 0.8;
      utterance.pitch = 1;
      
      window.speechSynthesis.speak(utterance);
    }
  };

  const getLanguageCode = (language: string): string => {
    switch (language) {
      case 'hindi': return 'hi-IN';
      case 'telugu': return 'te-IN';
      case 'urdu': return 'ur-PK';
      default: return 'en-IN';
    }
  };

  const getTestMessage = (language: string): string => {
    switch (language) {
      case 'hindi': return 'नमस्ते! यह आपका कृषि सहायक है। आवाज परीक्षण सफल है।';
      case 'telugu': return 'నమస్కారం! ఇది మీ వ్యవసాయ సహాయకుడు. వాయిస్ టెస్ట్ విజయవంతం.';
      case 'urdu': return 'السلام علیکم! یہ آپ کا زرعی معاون ہے۔ آواز کی جانچ کامیاب ہے۔';
      default: return 'Hello! This is your Agricultural Assistant. Voice test successful.';
    }
  };

  const SettingSection: React.FC<SettingSectionProps> = ({ title, children }) => (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">{title}</h3>
      {children}
    </div>
  );

  const ToggleSwitch: React.FC<ToggleSwitchProps> = ({ enabled, onChange, label, description }) => (
    <div className="flex items-center justify-between">
      <div>
        <p className="font-medium text-gray-800">{label}</p>
        <p className="text-sm text-gray-600">{description}</p>
      </div>
      <button
        onClick={onChange}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
          enabled ? 'bg-green-500' : 'bg-gray-300'
        }`}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
            enabled ? 'translate-x-6' : 'translate-x-1'
          }`}
        />
      </button>
    </div>
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-800 flex items-center space-x-3">
          <span className="text-4xl">⚙️</span>
          <span>Settings</span>
        </h1>
        <p className="text-gray-600 mt-1">Customize your agricultural assistant experience</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SettingSection title="🌐 Language & Regional Settings">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Interface Language
              </label>
              <select
                value={settings.language}
                onChange={(e) => handleLanguageChange(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                {languages.map((lang) => (
                  <option key={lang.code} value={lang.code}>
                    {lang.name} ({lang.native})
                  </option>
                ))}
              </select>
            </div>
            
            <div className="bg-green-50 border border-green-200 rounded-lg p-3">
              <p className="text-green-800 text-sm">
                <strong>Region:</strong> Hyderabad, Telangana <br />
                <strong>Currency:</strong> Indian Rupee (₹) <br />
                <strong>Units:</strong> Metric System
              </p>
            </div>
          </div>
        </SettingSection>

        <SettingSection title="🔊 Voice & Audio Settings">
          <div className="space-y-4">
            <ToggleSwitch
              enabled={settings.voiceEnabled}
              onChange={() => setSettings({ ...settings, voiceEnabled: !settings.voiceEnabled })}
              label="Voice Assistant"
              description="Enable AI voice responses in Indian languages"
            />
            
            {settings.voiceEnabled && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Voice Language
                  </label>
                  <select
                    value={settings.voiceLanguage}
                    onChange={(e) => setSettings({ ...settings, voiceLanguage: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  >
                    {languages.map((lang) => (
                      <option key={lang.code} value={lang.code}>
                        {lang.name} ({lang.native})
                      </option>
                    ))}
                  </select>
                </div>
                
                <button
                  onClick={testVoice}
                  className="flex items-center space-x-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                >
                  <Volume2 className="w-4 h-4" />
                  <span>Test Indian Voice</span>
                </button>
              </>
            )}
          </div>
        </SettingSection>

        <SettingSection title="📱 Connectivity & Offline Mode">
          <div className="space-y-4">
            <div className="flex items-center space-x-3 p-3 rounded-lg bg-gray-50">
              {isOnline ? (
                <Wifi className="w-5 h-5 text-green-500" />
              ) : (
                <WifiOff className="w-5 h-5 text-red-500" />
              )}
              <div>
                <p className="font-medium text-gray-800">
                  Connection Status: {isOnline ? 'Online' : 'Offline'}
                </p>
                <p className="text-sm text-gray-600">
                  {isOnline ? 'Connected to internet' : 'Working in offline mode'}
                </p>
              </div>
            </div>

            <ToggleSwitch
              enabled={settings.offlineMode}
              onChange={handleOfflineModeToggle}
              label="Offline Mode"
              description="Automatically work offline when no internet"
            />
            
            {settings.offlineMode && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                <div className="flex items-center space-x-2 mb-2">
                  <Download className="w-4 h-4 text-blue-600" />
                  <span className="text-blue-800 font-medium">Offline Ready</span>
                </div>
                <p className="text-blue-700 text-sm mb-3">
                  Essential data automatically cached: Weather, Market Prices, Farming Tips
                </p>
                <p className="text-blue-600 text-sm">
                  ✓ No downloads required - works instantly offline
                </p>
              </div>
            )}
          </div>
        </SettingSection>

        <SettingSection title="🔔 Notifications">
          <div className="space-y-4">
            <ToggleSwitch
              enabled={settings.notifications}
              onChange={() => setSettings({ ...settings, notifications: !settings.notifications })}
              label="Push Notifications"
              description="Receive alerts about weather, prices, and farming tips"
            />
            
            {settings.notifications && (
              <div className="space-y-3 ml-4">
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="weather" className="rounded text-green-500" defaultChecked />
                  <label htmlFor="weather" className="text-sm text-gray-700">Weather alerts</label>
                </div>
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="market" className="rounded text-green-500" defaultChecked />
                  <label htmlFor="market" className="text-sm text-gray-700">Market price updates</label>
                </div>
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="farming" className="rounded text-green-500" defaultChecked />
                  <label htmlFor="farming" className="text-sm text-gray-700">Farming reminders</label>
                </div>
              </div>
            )}
          </div>
        </SettingSection>

        <SettingSection title="👤 Account Information">
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <User className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="font-medium text-gray-800">{user?.name}</p>
                <p className="text-sm text-gray-600">{user?.email}</p>
              </div>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-3">
              <div className="text-sm text-gray-600 space-y-1">
                <p><strong>Phone:</strong> {user?.phone || 'Not provided'}</p>
                <p><strong>Location:</strong> {user?.location || 'Hyderabad, Telangana'}</p>
                <p><strong>Farm Size:</strong> {user?.farmSize || 'Not specified'}</p>
              </div>
            </div>
            
            <button className="w-full bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600 transition-colors">
              Edit Profile
            </button>
          </div>
        </SettingSection>

        <SettingSection title="📚 Help & Support">
          <div className="space-y-3">
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
              <p className="text-yellow-800 text-sm font-medium">🚧 Working on it</p>
              <p className="text-yellow-700 text-xs">Help and support features coming soon</p>
            </div>
            <button className="w-full text-left py-2 px-3 rounded-lg hover:bg-gray-50 transition-colors opacity-50 cursor-not-allowed">
              📖 User Guide (Coming Soon)
            </button>
            <button className="w-full text-left py-2 px-3 rounded-lg hover:bg-gray-50 transition-colors opacity-50 cursor-not-allowed">
              💬 Contact Support (Coming Soon)
            </button>
            <button className="w-full text-left py-2 px-3 rounded-lg hover:bg-gray-50 transition-colors opacity-50 cursor-not-allowed">
              🔒 Privacy Policy (Coming Soon)
            </button>
            <button className="w-full text-left py-2 px-3 rounded-lg hover:bg-gray-50 transition-colors opacity-50 cursor-not-allowed">
              ℹ️ About App (Coming Soon)
            </button>
          </div>
        </SettingSection>
      </div>

      <div className="bg-green-50 border border-green-200 rounded-xl p-6">
        <div className="flex items-start space-x-3">
          <span className="text-2xl">💡</span>
          <div>
            <h4 className="font-semibold text-green-800 mb-1">Tip</h4>
            <p className="text-green-700 text-sm">
              The app automatically works offline with cached data. Voice assistant supports pure Indian voices 
              for Hindi, Telugu, Urdu, and English. Change language settings to hear responses in your preferred language.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsTab;