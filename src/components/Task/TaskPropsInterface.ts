export interface ITaskProps {
    id: number;
    title: string;
    description? : string;
    status: string;
    isDone: boolean;
    taskID : string;
    draggable: boolean;
    Update: (id: number, name: string, description: string, status: string, isDone: boolean) => Promise<void>;
    Delete: (id: number) => Promise<void>;
}