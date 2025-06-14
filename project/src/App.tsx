import { useState, useEffect } from 'react';
import AuthScreen from './components/auth/AuthScreen';
import Dashboard from './components/dashboard/Dashboard';
import { AuthContextProvider } from './contexts/AuthContext';
import { OfflineContextProvider } from './contexts/OfflineContext';
import LoadingScreen from './components/common/LoadingScreen';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is already logged in
    const token = localStorage.getItem('authToken');
    if (token) {
      setIsAuthenticated(true);
    }
    
    // Simulate initial loading
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <AuthContextProvider>
      <OfflineContextProvider>
        <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 relative overflow-hidden">
          {/* Dark Green Background Watermark */}
          <div className="fixed inset-0 opacity-10 pointer-events-none">
            <div className="absolute inset-0 bg-repeat opacity-40" 
                 style={{
                   backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23166534' fill-opacity='0.6' fill-rule='evenodd'%3E%3Cpath d='M30 30c0-11.046-8.954-20-20-20S0 18.954 0 30s8.954 20 20 20 20-8.954 20-20zm0 0c11.046 0 20-8.954 20-20S41.046 0 30 0 10 8.954 10 20s8.954 20 20 20z'/%3E%3C/g%3E%3C/svg%3E")`,
                 }}>
            </div>
            <div className="absolute top-10 left-10 text-green-800 opacity-25 text-8xl transform rotate-12">
              🌾
            </div>
            <div className="absolute top-1/2 right-20 text-green-700 opacity-20 text-6xl transform -rotate-12">
              🚜
            </div>
            <div className="absolute bottom-20 left-1/3 text-green-800 opacity-25 text-7xl transform rotate-45">
              🌱
            </div>
            <div className="absolute top-1/4 left-1/2 text-green-700 opacity-15 text-5xl transform -rotate-45">
              🌽
            </div>
            <div className="absolute bottom-1/3 right-1/4 text-green-800 opacity-20 text-6xl transform rotate-30">
              🍃
            </div>
          </div>

          {!isAuthenticated ? (
            <AuthScreen onAuthenticated={() => setIsAuthenticated(true)} />
          ) : (
            <Dashboard />
          )}
        </div>
      </OfflineContextProvider>
    </AuthContextProvider>
  );
}

export default App;