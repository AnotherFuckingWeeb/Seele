export interface IProjectsNavBarProps {
    username: string;
    profileImage: string | null;
    search: (title: string) => Promise<void>;
    show: () => void;
}