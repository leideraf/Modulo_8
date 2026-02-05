import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import Notes from './pages/Notes.jsx';
import AuthPanel from './components/AuthPanel.jsx';
import ProtectedRoute from './routes/ProtectedRoute.jsx';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        {/* Mostrar Header solo en rutas autenticadas */}
        <Routes>
          <Route path="/login" element={<AuthPanel />} />
          <Route path="/register" element={<AuthPanel />} />
          <Route
            path="*"
            element={
              <>
                <Header />
                <main className="flex-1">
                  <Routes>
                    <Route
                      path="/notes"
                      element={
                        <ProtectedRoute>
                          <Notes />
                        </ProtectedRoute>
                      }
                    />
                    <Route path="/" element={<Navigate to="/notes" replace />} />
                    <Route path="*" element={<Navigate to="/notes" replace />} />
                  </Routes>
                </main>
                <Footer />
              </>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
