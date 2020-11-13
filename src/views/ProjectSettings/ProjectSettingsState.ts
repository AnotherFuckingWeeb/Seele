import { IProjectProps } from '../../components/Project/ProjectPropsInterface'

export interface IProjectSettingsState {
    projectId: number;
    projectName: string;
    project: string;
    projects: IProjectProps[];
    loading: boolean;
}