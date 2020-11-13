import React from 'react'
import { User } from '../../utils/user'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons'
import { Helmet } from 'react-helmet'
import { IProjectProps } from './ProjectsProps'
import { IProjectState } from './ProjectsState'
import { Project } from '../../components/Project'
import { ProjectNavBar } from '../../components/ProjectNavBar'
import { UserPopUp } from '../../components/UserPopUp'
import { SingleInputModal } from '../../components/Modals/SingleInputModal'
import { Loading } from '../../components/Loading'
import './style.css'


class Projects extends React.Component<IProjectProps, IProjectState> {

    private user : User = new User();

    constructor(props: IProjectProps) {
        super(props)

        this.state = {
            search: '',
            error: '',
            loading: true,
            visible: { popUp: false, modal: false },
            projects: []
        }

    }

    async componentDidMount() : Promise<void> {
        await this.getProjects();
    }

    private showUserPanel = () : void => {
        this.setState(prevState => ({
            visible: {
                ...prevState.visible,
                popUp: !this.state.visible.popUp
            }
        }));
    }

    private showModal = () : void => {
        this.setState(prevState => ({
            visible: {
                ...prevState.visible,
                modal: !this.state.visible.modal
            }
        }));
    }

    private getProjects = async () : Promise<void> => {
        try {
            const url = `http://localhost:4000/projects/user_id=${this.user.Id}`;
            this.setState({ loading: true });
            const response = await fetch(url, { method: 'GET', headers: { 'Content-Type': 'application/json' } });
            const data = await response.json();
            this.setState({
                projects: data[0],
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

    private getProjectsByTitle =  async (title: string) : Promise<void> => {
        try {
            const url = `http://localhost:4000/projects/title=${title}`;
            const request = { title };

            this.setState({ loading: true });

            if (request.title === '') {
                await this.getProjects();
            }

            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(request)
            })

            const data = await response.json();

            this.setState({
                projects: data[0],
                loading: false
            })
        } 
        
        catch (error) {
            this.setState({
                error,
                loading: false
            })

            console.log(error)
        }
    }

    private createProject = async (title: string) : Promise<void> => {
        try {
            const url = 'http://localhost:4000/projects';
            const request = {
                user_id: this.user.Id,
                title: title
            };

            this.setState({ loading: true });

            await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(request)
            });

            await this.getProjects();

            this.setState({loading: false});
        } 
        
        catch (error) {
            this.setState({ 
                error, 
                loading: false 
            });
            
            console.log(this.state.error);
        }
    }

    render() : JSX.Element {
        return(
            <main>
                <Loading loading={this.state.loading} />
                <Helmet>
                    <title>Projects</title>
                    <style>{'body { background-color: #ebedef }'}</style>
                </Helmet>
                <SingleInputModal name='Create New Project' isClose={!this.state.visible.modal} onSubmit={this.createProject} onClose={this.showModal} />
                <div>
                    <ProjectNavBar search={this.getProjectsByTitle} username={this.user.Username} profileImage={this.user.ProfileImage} show={this.showUserPanel} />
                    { this.state.visible.popUp ? <UserPopUp name={this.user.Name} lastname={this.user.Lastname} email={this.user.Email} image={this.user.ProfileImage as string} /> : null }
                    <div className='project-label'>
                        <h1>Your Projects</h1>
                    </div>
                    <div className='projects-section'>
                        {
                            this.state.projects.map((project: any) => {
                                return(
                                    <Project key={project.id} id={project.id} title={project.title} date={project.date} />
                                )
                            })
                        }
                        <div className='project-add-project-card' onClick={this.showModal} >
                            <FontAwesomeIcon icon={faPlusCircle} style={{fontSize: 50}}/>
                            <h3>Add a new project</h3>
                        </div>
                    </div>
                </div>
            </main>
        )
    }
}

export default Projects