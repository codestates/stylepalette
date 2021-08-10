// action types
export const LOG_IN = 'LOG_IN';
export const LOG_OUT = 'LOG_OUT';

interface LoginProps {
    username: string;
    password: string;
}
// actions creator functions
export const logIn = (data: LoginProps) => {
    return {
        type: 'LOG_IN',
        payload: data,
    };
};

export const logOut = (data: any) => {
    return {
        type: 'LOG_OUT',
        payload: data,
    };
};
