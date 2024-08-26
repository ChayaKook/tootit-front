import React from 'react';
import { Button } from 'primereact/button';
import LoginForm from '../login-form/loginForm.component';
import { Route, useNavigate } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import AuthService from '../../services/auth.service';
const AdminDashboard =  () => {

  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  AuthService.validateToken({ token }).then((data) => {
    if (data==false) {
    //  return <Navigate to="/login" />;
     navigate('/login')
  }})
  
  return (
    <div>
      <h1>ברוך שובך, מנהל</h1>
      <Button label="Admin Button" className="p-button-raised" />
      
    </div>
  );
}

export default AdminDashboard;
