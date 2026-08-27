import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// Layouts
import { PublicLayout } from './layouts/PublicLayout';
import { AdminLayout } from './layouts/AdminLayout';

// Public Pages
import { HomePage } from './pages/public/HomePage';
import { ServicesPage } from './pages/public/ServicesPage';
import { AboutPage } from './pages/public/AboutPage';
import { InquiryPage } from './pages/public/InquiryPage';
import { ContactPage } from './pages/public/ContactPage';
import { NotFoundPage } from './pages/public/NotFoundPage';

// Admin Pages
import { LoginPage } from './pages/admin/LoginPage';
import { DashboardPage } from './pages/admin/DashboardPage';
import { EnquiriesListPage } from './pages/admin/EnquiriesListPage';
import { EnquiryDetailsPage } from './pages/admin/EnquiryDetailsPage';
import { AdminCustomersPage } from './pages/admin/AdminCustomersPage';
import { AdminSettingsPage } from './pages/admin/AdminSettingsPage';

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Website Routes */}
        <Route path="/" element={<PublicLayout />}>
          <Route index element={<HomePage />} />
          <Route path="services" element={<ServicesPage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="inquiry" element={<InquiryPage />} />
          <Route path="book-appointment" element={<Navigate to="/inquiry" replace />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>

        {/* Garage Admin Login */}
        <Route path="/garage/login" element={<LoginPage />} />

        {/* Garage Admin Portal */}
        <Route path="/garage" element={<AdminLayout />}>
          <Route index element={<Navigate to="/garage/dashboard" replace />} />
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="enquiries" element={<EnquiriesListPage />} />
          <Route path="enquiries/:id" element={<EnquiryDetailsPage />} />
          <Route path="customers" element={<AdminCustomersPage />} />
          <Route path="settings" element={<AdminSettingsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
