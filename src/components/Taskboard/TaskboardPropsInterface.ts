export interface ITaskboardProps {
    id: number,
    title: string,
    idName: string,
    update: (id: number, name: string) => Promise<void>
    delete: (id: number) => Promise<void>
}