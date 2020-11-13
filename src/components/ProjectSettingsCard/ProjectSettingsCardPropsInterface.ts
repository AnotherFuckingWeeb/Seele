export interface IProjectSettingsCardProps {
    id: number;
    name: string;
    GetProjectData: (id: number) => Promise<void>;
}