export interface ISignUpState {
    username: string;
    name: string;
    lastname: string;
    email: string;
    password: string;
    confirmPassword: string;
    response: string;
    loading: boolean;
    responseStatus: string;
}