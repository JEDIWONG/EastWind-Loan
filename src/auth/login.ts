import { api } from '../api/client';
import { clearUserSession, storeUserSession } from './session';

export async function login(email: string, password: string) {

  await api.get('/sanctum/csrf-cookie');

  const { data } = await api.post('/auth/login', { email, password });

  storeUserSession(data.data);

  return data;
}   

export async function checkAuth() {
    try {
        const { data } = await api.get('/auth/checkAuth');
        return data;
    } catch { // If not logged in 
        return null;
    }
}   

export async function logout() {
    try {
        await api.post("/auth/logout");
    } catch{
        console.error("Failed to logout");
    }
    finally {
        clearUserSession();
    }
}