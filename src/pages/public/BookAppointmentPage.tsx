import React from 'react';
import { Navigate } from 'react-router-dom';

export const BookAppointmentPage: React.FC = () => {
  return <Navigate to="/inquiry" replace />;
};
