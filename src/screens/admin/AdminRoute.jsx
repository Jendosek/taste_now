import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { isAdmin } from '../../utils/isAdmin';
import AdminPanel from './AdminPanel';

const AdminRoute = () => {
    const { user } = useSelector((state) => state.auth);
    if (!isAdmin(user)) return <Navigate to="/" replace />;
    return <AdminPanel />;
};

export default AdminRoute;
