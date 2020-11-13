import { IProjectProps } from '../../components/Project/ProjectPropsInterface'

export interface IProjectState {
    search: string;
    error: string;
    loading: boolean;
    visible: { popUp: boolean, modal: boolean };
    projects: IProjectProps[];
}