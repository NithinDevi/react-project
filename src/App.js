import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import LoginPage from './auth/Login';
import ProtectedRoute from './auth/ProtectedRoute';
import TrackInsights from './components/trackInsights/TrackInsights';


const App = () => (
  <Router>
    <Toaster position="top-right" reverseOrder={false} />
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/trackinsights"
        element={
          <ProtectedRoute>
            <TrackInsights />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  </Router>
);

export default App;