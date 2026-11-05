import { LoginUserSchema, type LoginUser } from "../schemas/userDetailsSchema";

const USER_KEY = "user_data";

export const storeUserSession = (
    user: LoginUser
) => {
    const data = LoginUserSchema.parse(user);

    sessionStorage.setItem(
        USER_KEY,
        JSON.stringify(data)
    );
};

export const getUserSession = (): LoginUser | null => {
    const data = sessionStorage.getItem(USER_KEY);

    if (!data) {
        return null;
    }

    try {
        return LoginUserSchema.parse(
            JSON.parse(data)
        );
    } catch {
        clearUserSession();
        return null;
    }
};

export const clearUserSession = () => {
    sessionStorage.removeItem(USER_KEY);
};

export const isUserLoggedIn = () => {
    return getUserSession() !== null;
};

export const getUserId = (): string => {
    const user = getUserSession();

    return user?.id ?? null;
};

export const getUserDetailsId = (): string | null => {
    const user = getUserSession();

    return user?.user_details?.[0]?.id ?? null;
};

export const getLenderId = (): string | null => {
    const user = getUserSession();

    return user?.user_details?.[0]?.['lender_id'] ?? null;
};

export const getUserTypeId = (): number | null => {
    const user = getUserSession();

    return Number(user?.user_type_id)?? null;
};