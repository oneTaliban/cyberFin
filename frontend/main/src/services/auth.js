import { authAPI } from "./api"
import { useNavigate } from "react-router-dom";



export const logout = async () => {
    const  navigate = useNavigate();
    try {
        await authAPI.logout();
    } catch (error) {
        console.error("Logout error: ", error);
    } finally {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('user');
        navigate('/dashboard');
    }
};