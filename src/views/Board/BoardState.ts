import { ITaskboardProps } from '../../components/Taskboard/TaskboardPropsInterface'

export interface IBoardState {
    projectName: string;
    error: string;
    taskboards: ITaskboardProps[];
    loading: boolean;
    show: { createTaskboard: boolean, taskDetails: boolean };
}