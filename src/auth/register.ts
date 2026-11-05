import { api } from '../api/client';
import { storeUserSession } from './session';

export async function registerBorrower(email: string, password: string, password_confirmation: string) {

    await api.get('/sanctum/csrf-cookie');
  
    const { data } = await api.post(
        '/auth/borrower/register',
        { 
            email,
            password,
            password_confirmation 
        }
    );
  
    storeUserSession(data.data);
  
    return data;
  }   

export async function registerLender(
    email: string,
    password: string,
    password_confirmation: string,
    lender_reg_no: string,
    lender_name: string,
    emp_f_name: string,
    emp_l_name: string,
) {
    await api.get('/sanctum/csrf-cookie');

    const { data } = await api.post(
        '/auth/lender/register',
        {
            email,
            password,
            password_confirmation,
            lender_reg_no,
            lender_name,
            emp_f_name,
            emp_l_name,
        }
    );

    storeUserSession(data.data);

    return data;
}