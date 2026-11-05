import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const AUTH_TOKEN_KEY = "auth_token";
const USER_KEY = "auth_user";
const EXPIRED_AT_KEY = "auth_expired_at";

export interface BorrowerDetails {
    id: number;
    email:string; 
    user_id: string;
    employment_status_id: string;
    employment_status_name: string;
    borrower_nric: string;
    borrower_phone_no: string;
    borrower_f_name: string;
    borrower_l_name: string;
    borrower_age: number;
    borrower_gender: string;
    borrower_occupation: string;
}

export interface LoanReviewerDetails {
    id: number;
    email:string; 
    user_id: string;

    lender_id:number;
    lender_name: string;
    lender_email: string;
    lender_phone_no: string;

    reviewer_f_name:string;
    reviewer_l_name:string; 
    reviewer_phone_no:string;
}

export interface LoginUser {
    id: number;
    email: string;
    user_type_id: number;
    user_details: BorrowerDetails | LoanReviewerDetails | null;
}

interface LoginResponse {
    success: boolean;
    message: string;
    data: LoginUser;
    expired_at: string;
    token: string;
}

export const login = async (
    email: string,
    password: string
) => {
    const response = await axios.post<LoginResponse>(
        `${API_URL}/auth/login`,
        {
            "email":email,
            "password":password,
        }
    );

    const data = response.data;

    if (data.success) {
        storeUserLoginSession(data);
    }

    return data;
};

export const storeUserLoginSession = (
    data: LoginResponse
) => {
    localStorage.setItem(
        AUTH_TOKEN_KEY,
        data.token
    );

    localStorage.setItem(
        USER_KEY,
        JSON.stringify(data.data)
    );

    localStorage.setItem(
        EXPIRED_AT_KEY,
        data.expired_at
    );
};

export const checkIfLoginTokenExpired = () => {
    const expiredAt = localStorage.getItem(
        EXPIRED_AT_KEY
    );  

    if (!expiredAt) {
        return true;
    }

    const expirationTime = new Date(expiredAt).getTime();

    return Date.now() >= expirationTime;
};

export const checkIfUserLogin = () => {
    const token = localStorage.getItem(AUTH_TOKEN_KEY);

    if (checkIfLoginTokenExpired()) {
        clearUserLoginSession();
        return false;
    }

    if (token) {
        return true;
    }

    return false;
};

export const getAuthToken = () => {
    return localStorage.getItem(AUTH_TOKEN_KEY);
};

export const getLoginUserDetails = (): BorrowerDetails |LoanReviewerDetails| null => {
    const user = localStorage.getItem(USER_KEY);

    if (!user) {
        return null;
    }

    try {
        const data: LoginUser = JSON.parse(user);

        return {
            email:data.email,
            ...data.user_details[0] 
        };
        
    } catch {
        return null;
    }
};

export const getUserId = (): number | null => {
    const user = localStorage.getItem(USER_KEY);

    if (!user) {
        return null;
    }

    try {
        const data: LoginUser = JSON.parse(user);
        return data.id;
    } catch {
        return null;
    }
};

export const getUserDetailsId = (): number | null => {
    const user = localStorage.getItem(USER_KEY);

    if (!user) {
        return null;
    }
    
    try {
        const data: LoginUser = JSON.parse(user);
        return data.user_details[0].id ?? null;
    } catch {
        return null;
    }
};

export const getUserTypeId = (): number | null => {
    const user = localStorage.getItem(USER_KEY);

    if (!user) {
        return null;
    }

    try {
        const data: LoginUser = JSON.parse(user);
        return data.user_type_id;
    } catch {
        return null;
    }
};

export const logout = async () => {
    const token = getAuthToken();

    try {
        if (token) {
            await axios.post(
                `${API_URL}/auth/logout`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
        }
    } finally {
        clearUserLoginSession();
        window.location.reload();
    };
};

export const clearUserLoginSession = () => {
    localStorage.removeItem(AUTH_TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    localStorage.removeItem(EXPIRED_AT_KEY);
};