import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { auth } from '../firebase';

const AuthGuard = () => {
    let authToken = auth.currentUser;
    return(
        authToken ? <Outlet /> : <Navigate to="/" />
    )
}

export default AuthGuard;