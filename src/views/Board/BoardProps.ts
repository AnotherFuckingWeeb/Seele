import { RouteComponentProps } from 'react-router-dom'

type TParams = { projectID: string }

export interface IBoardProps {
    route: RouteComponentProps<TParams>;
}