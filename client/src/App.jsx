import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import AdminPage from './pages/AdminPage';
import OfficerPage from './pages/OfficerPage';
import CitizenPage from './pages/CitizenPage';

import 'bootstrap/dist/css/bootstrap.min.css';

import './App.css';
import AdminSignup from './components/Auth/AdminRegister';
import RTONavbar from './components/ReusableComponents/Navbar';
import UserList from './components/Admin/userManagement';
import AppointmentsList from './components/Appointments/Appointmentlist';
import LicenseList from './components/licence/licenceslist';
import ReportsList from './components/reports/reportlist';
import VehicleList from './components/vehicle/vehiclelist';
import Unauthorized from './unauthorized';
import ProfileCard from './profile';

const user = JSON.parse(localStorage.getItem('user'))?.user;

function App() {
  return (
    <>

      {/* <AuthProvider> */}

      <Router>
        <RTONavbar />
        <Routes>
          {/* Define routes using element instead of component */}
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/profile" element={<ProfileCard />} />
          <Route path="/admin/register" element={<AdminSignup />} />
          {/* /profile */}

          {/*  admin */}
          {
            user?.role === "Administrator" && (
              <>
                <Route path="/admin" element={<AdminPage />} />
               
                <Route path="/admin/userlist" element={<UserList />} />
                <Route path="/admin/appointments" element={<AppointmentsList />} />
                <Route path="/admin/licenses" element={<LicenseList />} />
                <Route path="/admin/totalreports" element={<ReportsList />} />
                <Route path="/admin/vehicles" element={<VehicleList />} />
                <Route path="/admin/vehicles" element={<VehicleList />} />
                {/* /officer/register */}
              </>

            )
          }
          {/* officer */}
          {
            user?.role === "Officer" && (
              <>
                <Route path="/officer" element={<OfficerPage />} />
                <Route path="/officer/userlist" element={<UserList />} />
                <Route path="/officer/appointments" element={<AppointmentsList />} />
                <Route path="/officer/licenses" element={<LicenseList />} />
                <Route path="/officer/totalreports" element={<ReportsList />} />
                <Route path="/officer/vehicles" element={<VehicleList />} />
                <Route path="/officer/vehicles" element={<VehicleList />} />
              </>
            )
          }

          {/* citizen */}
          {
            user?.role === "Citizen" && (
              <>
                <Route path="/citizen" element={<CitizenPage />} />
                
              </>
            )

          
          }

        <Route  path='*'  element={<Unauthorized/>}  />
        </Routes>
      </Router>
      {/* </AuthProvider> */}
    </>

  );
}

export default App;
