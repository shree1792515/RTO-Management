import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import authService from '../services/authService';

const useAuth = () => {
    const { setUser, setIsAuthenticated } = useContext(AuthContext);
    const [loading, setLoading] = useState(true);

    const login = async (credentials) => {
        try {
            const user = await authService.login(credentials);
            setUser(user);
            setIsAuthenticated(true);
        } catch (error) {
            throw new Error('Login failed');
        }
    };

    const signup = async (userData) => {
        try {
            const user = await authService.signup(userData);
            setUser(user);
            setIsAuthenticated(true);
        } catch (error) {
            throw new Error('Signup failed');
        }
    };

    const logout = async () => {
        await authService.logout();
        setUser(null);
        setIsAuthenticated(false);
    };

    const checkAuthStatus = async () => {
        try {
            const user = await authService.checkAuth();
            setUser(user);
            setIsAuthenticated(true);
        } catch (error) {
            setUser(null);
            setIsAuthenticated(false);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        checkAuthStatus();
    }, []);

    return { login, signup, logout, loading };
};

export default useAuth;