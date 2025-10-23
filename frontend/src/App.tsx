import { Suspense, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';
import { store } from '@store/store';
import { useAuthStore } from '@store/authStore';

// Lazy load pages
import Dashboard from '@pages/Dashboard';
import Editor from '@pages/Editor';
import Collaboration from '@pages/Collaboration';
import Analytics from '@pages/Analytics';
import Settings from '@pages/Settings';
import Login from '@pages/Login';
import Register from '@pages/Register';

// Components
import LoadingScreen from '@components/LoadingScreen';
import HolographicBackground from '@components/3d/HolographicBackground';

// Initialize services
import { initializeAI } from '@services/ai/initAI';
import { initializeWebSocket } from '@services/websocket';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 3,
      staleTime: 5 * 60 * 1000, // 5 minutes
      cacheTime: 10 * 60 * 1000, // 10 minutes
    },
  },
});

function App() {
  const { isAuthenticated, initialize } = useAuthStore();

  useEffect(() => {
    // Initialize authentication
    initialize();

    // Initialize AI services in background
    initializeAI().catch(console.error);

    // Initialize WebSocket connection
    if (isAuthenticated) {
      initializeWebSocket();
    }

    // Register service worker for offline support
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js').catch(console.error);
    }
  }, [initialize, isAuthenticated]);

  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <div className="relative min-h-screen bg-slate-950 text-white">
            {/* 3D Holographic Background */}
            <HolographicBackground />

            {/* Main Content */}
            <Suspense fallback={<LoadingScreen />}>
              <Routes>
                {/* Public Routes */}
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                {/* Protected Routes */}
                <Route
                  path="/"
                  element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />}
                />
                <Route
                  path="/editor/:documentId?"
                  element={isAuthenticated ? <Editor /> : <Navigate to="/login" />}
                />
                <Route
                  path="/collaborate/:sessionId"
                  element={isAuthenticated ? <Collaboration /> : <Navigate to="/login" />}
                />
                <Route
                  path="/analytics"
                  element={isAuthenticated ? <Analytics /> : <Navigate to="/login" />}
                />
                <Route
                  path="/settings"
                  element={isAuthenticated ? <Settings /> : <Navigate to="/login" />}
                />

                {/* Catch all */}
                <Route path="*" element={<Navigate to="/" />} />
              </Routes>
            </Suspense>

            {/* Global Toast Notifications */}
            <Toaster
              position="top-right"
              toastOptions={{
                className: 'bg-slate-800 text-white',
                duration: 4000,
                style: {
                  background: '#1e293b',
                  color: '#fff',
                },
              }}
            />
          </div>
        </BrowserRouter>
      </QueryClientProvider>
    </Provider>
  );
}

export default App;
