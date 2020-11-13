export interface IProfileSettingsState {
    name: string;
    lastname: string;
    username: string;
    email: string;
    response: string;
    responseStatus: 'SUCESS' | 'WARNING' | 'ERROR';
    preview: any;
    image: string;
    loading: boolean;
}