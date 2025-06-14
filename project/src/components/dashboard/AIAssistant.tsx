import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Send, Mic, MicOff, Volume2 } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useOffline } from '../../contexts/OfflineContext';

interface Message {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
}

const AIAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { user } = useAuth();
  const { isOnline, getCachedData } = useOffline();

  const recognition = useRef<any>(null);
  const synthesis = useRef<SpeechSynthesis | null>(null);

  useEffect(() => {
    // Initialize speech recognition
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
      recognition.current = new SpeechRecognition();
      recognition.current.continuous = false;
      recognition.current.interimResults = false;
      
      // Set language based on user preference
      const lang = getLanguageCode(user?.language || 'english');
      recognition.current.lang = lang;

      recognition.current.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInputText(transcript);
        handleSendMessage(transcript);
      };

      recognition.current.onend = () => {
        setIsListening(false);
      };
    }

    // Initialize speech synthesis
    synthesis.current = window.speechSynthesis;

    // Add welcome message
    if (messages.length === 0) {
      addBotMessage(getWelcomeMessage(user?.language || 'english'));
    }
  }, [user?.language]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const getLanguageCode = (language: string): string => {
    switch (language) {
      case 'hindi': return 'hi-IN';
      case 'telugu': return 'te-IN';
      case 'urdu': return 'ur-PK';
      default: return 'en-IN';
    }
  };

  const getWelcomeMessage = (language: string): string => {
    switch (language) {
      case 'hindi': return 'नमस्ते! मैं आपका कृषि सहायक हूं। मैं खेती, फसल, मौसम और बाजार की कीमतों के बारे में आपकी मदद कर सकता हूं।';
      case 'telugu': return 'నమస్కారం! నేను మీ వ్యవసాయ సహాయకుడిని. వ్యవసాయం, పంటలు, వాతావరణం మరియు మార్కెట్ ధరల గురించి మీకు సహాయం చేయగలను.';
      case 'urdu': return 'السلام علیکم! میں آپ کا زرعی معاون ہوں۔ میں کھیتی باڑی، فصلوں، موسم اور بازاری قیمتوں کے بارے میں آپ کی مدد کر سکتا ہوں۔';
      default: return 'Hello! I\'m your Agricultural Assistant. I can help you with farming, crops, weather, and market prices in Hyderabad, Telangana.';
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const addBotMessage = (text: string) => {
    const message: Message = {
      id: Date.now().toString(),
      text,
      isBot: true,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, message]);
    speakMessage(text);
  };

  const speakMessage = (text: string) => {
    if (synthesis.current && user?.language) {
      setIsSpeaking(true);
      const utterance = new SpeechSynthesisUtterance(text);
      
      // Set Indian voice based on language
      const voices = synthesis.current.getVoices();
      const langCode = getLanguageCode(user.language);
      
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
      
      utterance.onend = () => {
        setIsSpeaking(false);
      };
      
      synthesis.current.speak(utterance);
    }
  };

  const stopSpeaking = () => {
    if (synthesis.current) {
      synthesis.current.cancel();
      setIsSpeaking(false);
    }
  };

  const handleSendMessage = (text?: string) => {
    const messageText = text || inputText.trim();
    if (!messageText) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: messageText,
      isBot: false,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');

    // Simulate AI response
    setTimeout(() => {
      const response = generateResponse(messageText.toLowerCase(), user?.language || 'english');
      addBotMessage(response);
    }, 1000);
  };

  const generateResponse = (query: string, language: string): string => {
    // Get cached data for offline responses
    const weatherData = getCachedData('weather');
    const marketData = getCachedData('marketPrices');
    
    if (query.includes('weather') || query.includes('मौसम') || query.includes('వాతావరణం') || query.includes('موسم')) {
      if (language === 'hindi') {
        return `आज हैदराबाद में मौसम: ${weatherData?.temperature || '28'}°C, ${weatherData?.humidity || '65'}% नमी। ${weatherData?.condition || 'आंशिक रूप से बादल'} की स्थिति है।`;
      } else if (language === 'telugu') {
        return `నేడు హైదరాబాద్‌లో వాతావరణం: ${weatherData?.temperature || '28'}°C, ${weatherData?.humidity || '65'}% తేమ। ${weatherData?.condition || 'పాక్షిక మేఘావృతం'} స్థితి.`;
      } else if (language === 'urdu') {
        return `آج حیدرآباد میں موسم: ${weatherData?.temperature || '28'}°C، ${weatherData?.humidity || '65'}% نمی۔ ${weatherData?.condition || 'جزوی طور پر ابر آلود'} حالات ہیں۔`;
      } else {
        return `Today's weather in Hyderabad: ${weatherData?.temperature || '28'}°C, ${weatherData?.humidity || '65'}% humidity. ${weatherData?.condition || 'Partly cloudy'} conditions.`;
      }
    }

    if (query.includes('price') || query.includes('market') || query.includes('कीमत') || query.includes('ధర') || query.includes('قیمت')) {
      if (language === 'hindi') {
        return `आज के बाजार भाव: कपास ${marketData?.cotton?.price || '₹5,800/क्विंटल'}, चावल ${marketData?.rice?.price || '₹2,100/क्विंटल'}, हल्दी ${marketData?.turmeric?.price || '₹8,500/क्विंटल'}`;
      } else if (language === 'telugu') {
        return `నేటి మార్కెట్ ధరలు: పత్తి ${marketData?.cotton?.price || '₹5,800/క్వింటల్'}, వరి ${marketData?.rice?.price || '₹2,100/క్వింటల్'}, పసుపు ${marketData?.turmeric?.price || '₹8,500/క్వింటల్'}`;
      } else if (language === 'urdu') {
        return `آج کے بازاری ریٹ: کپاس ${marketData?.cotton?.price || '₹5,800/کوئنٹل'}, چاول ${marketData?.rice?.price || '₹2,100/کوئنٹل'}, ہلدی ${marketData?.turmeric?.price || '₹8,500/کوئنٹل'}`;
      } else {
        return `Today's market prices: Cotton ${marketData?.cotton?.price || '₹5,800/quintal'}, Rice ${marketData?.rice?.price || '₹2,100/quintal'}, Turmeric ${marketData?.turmeric?.price || '₹8,500/quintal'}`;
      }
    }

    if (query.includes('crop') || query.includes('farming') || query.includes('फसल') || query.includes('పంట') || query.includes('فصل')) {
      if (language === 'hindi') {
        return 'तेलंगाना में इस समय कपास, चावल, और हल्दी की फसल अच्छी है। नियमित पानी और कीट नियंत्रण का ध्यान रखें।';
      } else if (language === 'telugu') {
        return 'తెలంగాణలో ఈ సమయంలో పత్తి, వరి మరియు పసుపు పంటలు బాగా ఉన్నాయి. క్రమం తప్పకుండా నీరు మరియు కీటక నియంత్రణ జాగ్రత్తలు తీసుకోండి.';
      } else if (language === 'urdu') {
        return 'تلنگانہ میں اس وقت کپاس، چاول اور ہلدی کی فصل اچھی ہے۔ باقاعدگی سے پانی اور کیڑوں کے کنٹرول کا خیال رکھیں۔';
      } else {
        return 'Cotton, rice, and turmeric crops are doing well in Telangana this season. Maintain regular watering and pest control.';
      }
    }

    // Default responses
    const defaultResponses = {
      hindi: 'मैं आपकी खेती से जुड़ी किसी भی समस्या में मदद कर सकता हूं। मौसम, फसल, बाजार की कीमतों के बारे में पूछें।',
      telugu: 'వ్యవసాయ సంబంధిత ఏ విషయంలోనైనా మీకు సహాయం చేయగలను. వాతావరణం, పంటలు, మార్కెట్ ధరల గురించి అడగండి.',
      urdu: 'میں آپ کے کھیتی باڑی کے کسی بھی مسئلے میں مدد کر سکتا ہوں۔ موسم، فصلوں، مارکیٹ کی قیمتوں کے بارے میں پوچھیں۔',
      english: 'I can help you with any farming-related questions. Ask me about weather, crops, market prices, or farming techniques in Hyderabad, Telangana.'
    };

    return defaultResponses[language as keyof typeof defaultResponses] || defaultResponses.english;
  };

  const startListening = () => {
    if (recognition.current) {
      setIsListening(true);
      recognition.current.start();
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-green-500 text-white rounded-full shadow-lg hover:bg-green-600 transition-all duration-200 flex items-center justify-center z-50 hover:scale-110"
      >
        <MessageCircle className="w-6 h-6" />
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-end justify-end p-6 z-50">
          <div className="bg-white rounded-2xl shadow-2xl w-96 h-96 flex flex-col">
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <span className="text-lg">🤖</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">AI Assistant</h3>
                  <p className="text-xs text-gray-600">
                    {isOnline ? 'Online' : 'Offline Mode'}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                {isSpeaking && (
                  <button
                    onClick={stopSpeaking}
                    className="p-1 text-green-600 hover:bg-green-50 rounded"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                )}
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 text-gray-400 hover:text-gray-600"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-2xl ${
                      message.isBot
                        ? 'bg-gray-100 text-gray-800'
                        : 'bg-green-500 text-white'
                    }`}
                  >
                    <p className="text-sm">{message.text}</p>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            <div className="p-4 border-t border-gray-200">
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Ask about farming, weather, crops..."
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
                />
                <button
                  onClick={startListening}
                  disabled={isListening}
                  className={`p-2 rounded-lg transition-colors ${
                    isListening
                      ? 'bg-red-100 text-red-600'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                </button>
                <button
                  onClick={() => handleSendMessage()}
                  className="p-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AIAssistant;