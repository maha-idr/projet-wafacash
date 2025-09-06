// Exemple de routage dans App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import SaisieCommercial from './components/SaisieCommercial';
import AffectationSupport from './components/AffectationSupport';
import ConsultationExport from './components/ConsultationExport';
import { AuthProvider, useAuth } from './contexts/AuthContext';

const ProtectedRoute = ({ children, requiredRole }) => {
  const { user, loading } = useAuth();
  
  if (loading) return <div>Chargement...</div>;
  if (!user) return <Navigate to="/login" replace />;
  if (requiredRole && user.role !== requiredRole && user.role !== 'Admin') {
    return <Navigate to="/unauthorized" replace />;
  }
  
  return children;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route 
            path="/saisie" 
            element={
              <ProtectedRoute requiredRole="Commercial">
                <SaisieCommercial />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/affectation" 
            element={
              <ProtectedRoute requiredRole="Support_IT">
                <AffectationSupport />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/consultation" 
            element={
              <ProtectedRoute>
                <ConsultationExport />
              </ProtectedRoute>
            } 
          />
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/unauthorized" element={<div>Accès non autorisé</div>} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;