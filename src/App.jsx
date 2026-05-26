import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { login } from './store/slices/authSlice';
import LandingPage from './components/LandingPage';
import UserDashboardLayout from './modules/UserDashboard/UserDashboardLayout';
import AdminDashboardLayout from './modules/AdminDashboard/AdminDashboardLayout';

// User Dashboard Pages
import Dashboard from './modules/UserDashboard/pages/Dashboard';
import BudgetLab from './modules/UserDashboard/pages/BudgetLab';
import TaxCenter from './modules/UserDashboard/pages/TaxCenter';
import Investments from './modules/UserDashboard/pages/Investments';
import Simulations from './modules/UserDashboard/pages/Simulations';
import AIMentor from './modules/UserDashboard/pages/AIMentor';
import HumanMentors from './modules/UserDashboard/pages/HumanMentors';
import Profile from './modules/UserDashboard/pages/Profile';

// Admin Dashboard Pages
import AdminOverview from './modules/AdminDashboard/pages/Overview';
import AdminUsers from './modules/AdminDashboard/pages/Users';
import AdminEmployees from './modules/AdminDashboard/pages/Employees';
import AdminMentors from './modules/AdminDashboard/pages/Mentors';
import AdminRevenue from './modules/AdminDashboard/pages/Revenue';
import AdminAILogs from './modules/AdminDashboard/pages/AILogs';
import AdminSecurity from './modules/AdminDashboard/pages/Security';
import AdminReports from './modules/AdminDashboard/pages/Reports';

import EmployeeDashboardLayout from './modules/EmployeeDashboard/EmployeeDashboardLayout';

// Employee Dashboard Pages
import EmployeeTickets from './modules/EmployeeDashboard/pages/Tickets';
import EmployeeReports from './modules/EmployeeDashboard/pages/Reports';
import EmployeeModeration from './modules/EmployeeDashboard/pages/CommunityModeration';
import EmployeeNotifications from './modules/EmployeeDashboard/pages/Notifications';
import EmployeeMentorSupport from './modules/EmployeeDashboard/pages/MentorSupport';

// Auth Pages
import LoginPage from './modules/Auth/LoginPage';
import SignupPage from './modules/Auth/SignupPage';
import ForgotPasswordPage from './modules/Auth/ForgotPasswordPage';
import ResetPasswordPage from './modules/Auth/ResetPasswordPage';

import PublicLayout from './components/layout/PublicLayout';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const response = await axios.get('https://fincash-1.onrender.com/api/profile', {
            headers: { Authorization: `Bearer ${token}` }
          });
          if (response.data) {
            dispatch(login({ user: response.data, role: response.data.role }));
          }
        } catch (err) {
          console.error("Auth check failed:", err);
          localStorage.removeItem('token');
        }
      }
    };
    checkAuth();
  }, [dispatch]);

  return (
    <Routes>
      {/* Public Routes with Shared Navbar/Footer */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/human-mentor">
          <Route index element={<HumanMentors mode="all" />} />
          <Route path="free" element={<HumanMentors mode="free" />} />
          <Route path="one-on-one" element={<HumanMentors mode="sessions" />} />
        </Route>
      </Route>

      {/* Auth Pages */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      <Route path="/reset-password" element={<ResetPasswordPage />} />
      
      {/* User Dashboard Routes */}
      <Route path="/user" element={<UserDashboardLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="budget" element={<BudgetLab />} />
        <Route path="taxes" element={<TaxCenter />} />
        <Route path="investments" element={<Investments />} />
        <Route path="simulations" element={<Simulations />} />
        <Route path="ai-mentor" element={<AIMentor />} />
        <Route path="profile" element={<Profile />} />
      </Route>

      {/* Admin Dashboard Routes */}
      <Route path="/admin" element={<AdminDashboardLayout />}>
        <Route index element={<AdminOverview />} />
        <Route path="users" element={<AdminUsers />} />
        <Route path="employees" element={<AdminEmployees />} />
        <Route path="mentors" element={<AdminMentors />} />
        <Route path="revenue" element={<AdminRevenue />} />
        <Route path="ai-logs" element={<AdminAILogs />} />
        <Route path="security" element={<AdminSecurity />} />
        <Route path="reports" element={<AdminReports />} />
      </Route>

      {/* Employee Dashboard Routes */}
      <Route path="/employee" element={<EmployeeDashboardLayout />}>
        <Route index element={<EmployeeTickets />} />
        <Route path="reports" element={<EmployeeReports />} />
        <Route path="moderation" element={<EmployeeModeration />} />
        <Route path="notifications" element={<EmployeeNotifications />} />
        <Route path="mentor-support" element={<EmployeeMentorSupport />} />
      </Route>
    </Routes>
  );
}

export default App;
