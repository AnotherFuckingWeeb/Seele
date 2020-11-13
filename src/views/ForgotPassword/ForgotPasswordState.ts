export interface IForgotPasswordState {
    email: string;
    status: 'SUCESS' | 'WARNING' | 'ERROR';
    message: string;
    loading: boolean;
    response: boolean;
}