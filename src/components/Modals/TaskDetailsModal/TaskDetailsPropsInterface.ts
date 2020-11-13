import { IModal } from '../ModalInterface' 

export interface ITaskDetailsProps extends IModal {
    id: number;
    onSubmitTask: (name: string, description: string, status: string, isDone: boolean) => Promise<void>;
}