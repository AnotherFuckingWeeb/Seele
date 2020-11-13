import React from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { IBoardState } from './BoardState'
import { Taskboard } from '../../components/Taskboard'
import { SingleInputModal } from '../../components/Modals/SingleInputModal'
import { Loading } from '../../components/Loading'
import './style.css'

type TParams =  { projectID: string }

class Board extends React.Component<RouteComponentProps<TParams>, IBoardState> {

    constructor(props: RouteComponentProps<TParams>) {
        super(props)

        this.state = {
            projectName: '',
            error: '',
            taskboards: [],
            show: {
                createTaskboard: false,
                taskDetails: false
            },

            loading: false
        }
    }

    async componentDidMount() : Promise<void> {
       await this.getProjectName();
       await this.getTaskboards();
    }

    private getProjectName = async () : Promise<void> => {
        try {
            const url = `http://localhost:4000/projects/${this.props.match.params.projectID}`;
            this.setState({ loading: true });
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
    
            const data = await response.json();
            this.setState({ projectName: data[0][0].title, loading: false });
        } 
        
        catch (error) {
            this.setState({
                error,
                loading: false
            });

            console.log(this.state.error);
        }
    }

    private getTaskboards = async () : Promise<void> => {
        try {
            const url = `http://localhost:4000/taskboards/project_id=${this.props.match.params.projectID}`;
            this.setState({ loading: true });
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
    
            const data = await response.json();
    
            this.setState({
                taskboards: data[0],
                loading: false
            });
        } 
        
        catch (error) {
            this.setState({
                error,
                loading: false
            });

            console.log(this.state.error);
        }
    }

    private createTaskboard = async (title: string) : Promise<void> => {
        try {
            const url = 'http://localhost:4000/taskboards/';
            const request = {
                project_id: parseInt(this.props.match.params.projectID),
                title: title
            };
    
            this.setState({ loading: true });
    
            await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(request)
            });
    
            await this.getTaskboards();
    
            this.setState({ loading: false });
        } 
        
        catch (error) {
            this.setState({
                error,
                loading: false
            });

            console.log(this.state.error);
        }
    }

    private updateTaskboard = async (id: number, title: string) : Promise<void> => {
        try {
            const url = `http://localhost:4000/taskboards/${id}`;
            const request = {
                id: id,
                title: title,
            };
    
            await fetch(url, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(request)
            });
    
           await this.getTaskboards();
        } 
        
        catch (error) {
            this.setState({
                error,
                loading: false
            });

            console.log(this.state.error);
        }
    } 

    private deleteTaskboard = async (id: number) : Promise<void> => {
        try {
            const url = `http://localhost:4000/taskboards/${id}`;

            await fetch(url, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
            });
    
            await this.getTaskboards();
        } 
        
        catch (error) {
            this.setState({
                error,
                loading: false
            });

            console.log(this.state.error);
        }
    }

    private showCreateTaskBoardModal = () : void => {
        this.setState(prevState => ({
            show: {
                ...prevState.show,
                createTaskboard: !this.state.show.createTaskboard
            }
        }));
    }

    render() : JSX.Element {
        return(
            <div>
                <Helmet>
                    <style>{'body { background-color: #F7F9FB }'}</style>
                    <title>{this.state.projectName}</title>
                </Helmet>
                <Loading loading={this.state.loading} />
                <SingleInputModal name='Create New Taskboard' isClose={!this.state.show.createTaskboard} onClose={this.showCreateTaskBoardModal} onSubmit={this.createTaskboard}  />
                <div className='board-task-label'>
                    <h1>{this.state.projectName}</h1>
                </div>
                <div className='board-taskboards'>
                    {
                        this.state.taskboards.map((taskboard: any) => {
                            return(
                                <Taskboard key={taskboard.id} idName={taskboard.idName} id={taskboard.id} title={taskboard.title} update={this.updateTaskboard} delete={this.deleteTaskboard} />
                            )
                        })
                    }
                    <div className='board-new-taskboard' onClick={this.showCreateTaskBoardModal}>
                        <div className='board-new-taskboard-items-container'>
                            <FontAwesomeIcon style={{marginRight: 10}} icon={faPlus} />
                            <h4>Add New Taskboard</h4>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


export default Board