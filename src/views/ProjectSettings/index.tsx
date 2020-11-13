import React from 'react'
import { User } from '../../utils/user'
import { Helmet } from 'react-helmet'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons'
import { ProjectSettingsCard } from '../../components/ProjectSettingsCard'
import { IProjectSettingsProps } from './ProjectSettingsProps'
import { IProjectSettingsState } from './ProjectSettingsState'
import { TextBox } from '../../components/TextBox'
import { ButtonStyleThree } from '../../components/Button'
import { Loading } from '../../components/Loading'
import './style.css'

class ProjectSettings extends React.Component<IProjectSettingsProps, IProjectSettingsState> {

    private user : User = new User();

    constructor(props: IProjectSettingsProps) {
        super(props)

        this.state = {
            projectId: 0,
            projectName: 'Project...',
            project: '',
            projects: [],
            loading: false
        }

    }

    async componentDidMount() : Promise<void> {
        await this.getProjects();
    }

    private onChangeState = (event: React.ChangeEvent<HTMLInputElement>) : void => {
        
        const { name, value } = event.target;
    
        this.setState({
            ...this.state,
            [name] : value
        });
    }

    private getProjects = async () : Promise<void> => {
        try {
            const url = `http://localhost:4000/projects/user_id=${this.user.Id}`;
            this.setState({loading: true});
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-type': 'application/json'
                }
            });
            
            const data = await response.json();
            
            this.setState({
                projects: data[0],
                loading: false
            });
        } 
        
        catch (error) {
            this.setState({
                loading: false
            });

            console.log(error);
        }
    }

    private getProjectData = async (id: number) : Promise<void> => {
        try {
            const url = `http://localhost:4000/projects/${id}`;
            this.setState({ loading: true });
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
    
            const data = await response.json();
    
            this.setState({
                projectId: data[0][0].id,
                project: data[0][0].title,
                projectName:  data[0][0].title,
                loading: false
            });
        } 
        
        catch (error) {
            this.setState({
                loading: false
            });

            console.log(error);
        }
    }

    private updateProject = async () : Promise<void> => {
        try {
            const url  = `http://localhost:4000/projects/${this.state.projectId}`;
            const response = {
                title: this.state.project
            };
    
            this.setState({ loading: true });
    
            await fetch(url, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(response)
            });
    
            await this.getProjects();
    
            this.setState({
                loading: false
            });
        } 
        
        catch (error) {
            this.setState({
                loading: false
            });

            console.log(error);
        }
    } 

    private deleteProject = async () : Promise<void> => {
        try {
            const url = `http://localhost:4000/projects/${this.state.projectId}`;
        
            this.setState({ loading: true });
    
            await fetch(url, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
    
            await this.getProjects();
    
            this.setState({ projectName: 'Project...', project: '', projectId: 0, loading: false });
        } 
        
        catch (error) {
            this.setState({
                loading: false
            });
            
            console.log(error);
        }
    } 

    private resetProject = async () : Promise<void> => {
        try {
            const url = `http://localhost:4000/taskboards/project_id=${this.state.projectId}`;
        
            this.setState({ loading: true });
    
            await fetch(url, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
    
            await this.getProjects();
    
            this.setState({ loading: false });
        } 
        
        catch (error) {
            this.setState({
                loading: false
            });

            console.log(error);
        }
    }

    render() : JSX.Element {
        return(
            <div className='project-settings-container'>
                <Loading loading={this.state.loading} />
                <Helmet>
                    <title>Your Projects</title>
                </Helmet>
                <div className='project-settings-project-container'>
                    <div className='project-settings-label'>
                        <h2>Projects</h2>
                    </div>
                    <div className='project-settings-projects'>
                        {
                            this.state.projects.map((projectCard: any) => {
                                return(
                                    <ProjectSettingsCard GetProjectData={this.getProjectData} key={projectCard.id} id={projectCard.id} name={projectCard.title}  />
                                )
                            })
                        }
                    </div>
                </div>
                <div className='project-settings-project-edit-container'>
                    <div className='project-settings-project-edit-card'>
                        <div className='project-settings-project-title'>
                            <h4>{this.state.projectName}</h4>
                            <div className='project-settings-edit-logo'>
                                <FontAwesomeIcon icon={faPencilAlt}/>
                            </div>
                        </div>
                        <div className='project-settings-edit-project-input-container'>
                            <TextBox name='project' type='email' value={this.state.project} placeholder='Edit Project' maxLength={32} onChange={this.onChangeState} />
                        </div>
                        <div className='project-settings-buttons-container'>
                            <div className='project-settings-buttons-reset-delete-container'>
                                <ButtonStyleThree title='Delete Project' onClick={this.deleteProject} color='red' />
                                <ButtonStyleThree title='Reset Project' onClick={this.resetProject } color='red' />
                            </div>
                            <ButtonStyleThree title='Save Changes' onClick={this.updateProject} color='blue' />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ProjectSettings 