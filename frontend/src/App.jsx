import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import StudentNavbar from './components/StudentNavbar';
import AdminNavbar from './components/AdminNavbar';
import ProtectedRoute from './components/ProtectedRoute';
import ProtectedAdminRoute from './components/ProtectedAdminRoute';

// Student pages
import Dashboard from './pages/student/Dashboard';
import Jobs from './pages/student/Jobs';
import Applications from './pages/student/Applications';
import Profile from './pages/student/Profile';
import Login from './pages/student/Login';
import Signup from './pages/student/Signup';

// Admin pages
import AdminLogin from './pages/admin/Login';
import AdminDashboard from './pages/admin/Dashboard';
import AdminJobs from './pages/admin/Jobs';
import AdminApplications from './pages/admin/Applications';
import AdminCreateJob from './pages/admin/CreateJob';
import AdminStatus from './pages/admin/Status';

const App = () => {
  const location = useLocation();

  const isStudentPath = location.pathname.startsWith('/student');
  const isAdminPath = location.pathname.startsWith('/admin');

  return (
    <>
      {isStudentPath && !location.pathname.includes('/student/login') && !location.pathname.includes('/student/signup') && <StudentNavbar />}
      {isAdminPath && !location.pathname.includes('/admin/login') && <AdminNavbar />}

      <Routes>
        {/* Public Routes */}
        <Route path="/student/login" element={<Login />} />
        <Route path="/student/signup" element={<Signup />} />
        <Route path="/admin/login" element={<AdminLogin />} />

        {/* Student Protected Routes */}
        <Route path="/student/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/student/jobs" element={<ProtectedRoute><Jobs /></ProtectedRoute>} />
        <Route path="/student/applications" element={<ProtectedRoute><Applications /></ProtectedRoute>} />
        <Route path="/student/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />

        {/* Admin Protected Routes */}
        <Route path="/admin/dashboard" element={<ProtectedAdminRoute><AdminDashboard /></ProtectedAdminRoute>} />
        <Route path="/admin/jobs" element={<ProtectedAdminRoute><AdminJobs /></ProtectedAdminRoute>} />
        <Route path="/admin/jobs/new" element={<ProtectedAdminRoute><AdminCreateJob /></ProtectedAdminRoute>} />
        <Route path="/admin/applications" element={<ProtectedAdminRoute><AdminApplications /></ProtectedAdminRoute>} />
        <Route path="/admin/status" element={<ProtectedAdminRoute><AdminStatus /></ProtectedAdminRoute>} />

        {/* Default Route */}
        <Route path="*" element={<Navigate to="/student/login" />} />
      </Routes>
    </>
  );
};

export default App;
