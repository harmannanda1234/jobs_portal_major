import { Routes, Route, Navigate } from 'react-router-dom'
import StudentNavbar from './components/StudentNavbar'
import Dashboard from './pages/student/Dashboard'
import Jobs from './pages/student/Jobs'
import Applications from './pages/student/Applications'
import Profile from './pages/student/Profile'
import Login from './pages/student/Login'
import Signup from './pages/student/Signup'
import AdminLogin from './pages/admin/Login';
import AdminDashboard from './pages/admin/Dashboard';
import AdminJobs from './pages/admin/Jobs';
import AdminApplications from './pages/admin/Applications';
import AdminCreateJob from './pages/admin/CreateJob';
import AdminStatus from './pages/admin/Status';
import AdminNavbar from './components/AdminNavbar';
import ProtectedAdminRoute from './components/ProtectedAdminRoute';
import ProtectedRoute from './components/ProtectedRoute';
const App = () => {
  return (
    <>
      <StudentNavbar />
      <Routes>
        <Route path="/student/login" element={<Login />} />
        <Route path="/student/signup" element={<Signup />} />

        <Route path="/student/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/student/jobs" element={<ProtectedRoute><Jobs /></ProtectedRoute>} />
        <Route path="/student/applications" element={<ProtectedRoute><Applications /></ProtectedRoute>} />
        <Route path="/student/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />

        <Route path="*" element={<Navigate to="/student/dashboard" />} />
      </Routes>
      <AdminNavbar />
      <Routes>
        
        <Route path="/admin/*" element={<AdminNavbar />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<ProtectedAdminRoute><AdminDashboard /></ProtectedAdminRoute>} />
        <Route path="/admin/jobs" element={<ProtectedAdminRoute><AdminJobs /></ProtectedAdminRoute>} />
        <Route path="/admin/jobs/new" element={<ProtectedAdminRoute><AdminCreateJob /></ProtectedAdminRoute>} />
        <Route path="/admin/applications" element={<ProtectedAdminRoute><AdminApplications /></ProtectedAdminRoute>} />
        <Route path="/admin/status" element={<ProtectedAdminRoute><AdminStatus /></ProtectedAdminRoute>} />
        <Route path="*" element={<Navigate to="/admin/dashboard" />} />
      </Routes>
    </>
  )
}
export default App
console.log("App.jsx is loaded!");