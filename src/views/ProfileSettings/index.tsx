import React from 'react'
import { User } from '../../utils/user'
import { Helmet } from 'react-helmet'
import { IProfileSettingsProps } from './ProfileSettingsProps'
import { IProfileSettingsState } from './ProfileSettingsState'
import { TextBox } from '../../components/TextBox'
import { ButtonStyleThree } from '../../components/Button'
import { MessageModal } from '../../components/MessageModal'
import { Loading } from '../../components/Loading'
import './style.css'


class ProfileSettings extends React.Component<IProfileSettingsProps, IProfileSettingsState> {

    private user : User = new User();

    constructor(props: IProfileSettingsProps ) {
        super(props)

        this.state = {
            name: this.user.Name,
            lastname: this.user.Lastname,
            email: this.user.Email,
            username: this.user.Username,
            image: '',
            response: '',
            responseStatus: 'SUCESS',
            preview: undefined,
            loading: false
        }
    }

    private onChangeState = (event: React.ChangeEvent<HTMLInputElement>) : void => {

        const { name, value } = event.target;

        this.setState({
            ...this.state,
            [name] : value
        });

    }

    private handleChange = (e: any) : void => {
        this.setState({
            preview: e.target.files[0] === undefined ? '' : URL.createObjectURL(e.target.files[0]),
            image: e.target.files[0] === undefined ? null : e.target.files[0].name,
        });
    }

    private updateUser = async () : Promise<void> => {
        try {
            const url = `http://localhost:4000/users/${this.user.Id}`;
            const { username, name, lastname, email, image } = this.state;
            const request = {
                username: username,
                name: name,
                lastname: lastname,
                email: email,
                profileImage: image
            };
    
            this.setState({ loading: true });
    
            const response = await fetch(url, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(request)
            });
    
            const data = await response.json();
            
            this.user.Update(username, name, lastname, email, image);
            this.setState({ response: data.message, responseStatus: 'SUCESS', loading: false });
        } 
        
        catch (error) {
            this.setState({
                response: error,
                responseStatus: 'ERROR',
                loading: false
            });
        }
    }

    private deleteUser = async () : Promise<void> => {
        try {
            const url = `http://localhost:4000/users/${this.user.Id}`;
            this.setState({ loading: true });
            const response = await fetch(url, {
                method: 'DELETE',
                headers: {
                    'Content-type': 'application/json'
                }
            });
    
            const data = await response.json();
    
            this.setState({ response: data.message, responseStatus: 'WARNING', loading: false });
            this.user.SignOut();
            window.location.href = './';
        } 
        
        catch (error) {
            this.setState({
                response: error,
                responseStatus: 'ERROR',
                loading: false
            });
        }
    }

    private displayUploadImage = () : void => {
        let button = document.getElementById('file');
        if (button) button.click();
    }

    render() : JSX.Element {

        return(
            <div className='profile-settings-main'>
                <Loading loading={this.state.loading} />
                <Helmet>
                    <title>{this.state.username}</title>
                    <style>{'body { background-color: #e5e6eb }'}</style>
                </Helmet>
                { this.state.response ? <MessageModal message={this.state.response} type={this.state.responseStatus} /> : null  }
                <div className='profile-settings-profile-card'>
                    <div className='profile-settings-profile-label'>
                        <h2>Your Profile</h2>
                    </div>
                    <form className='profile-settings-profile-picture-and-link-container' action="http://localhost:4000/users/upload" method="POST" encType="multipart/form-data">
                        <div className='profile-settings-profile-image' onClick={this.displayUploadImage}>
                            {
                                this.state.loading ? <h5>loading...</h5> : <img src={this.state.preview !== undefined ? this.state.preview : `http://localhost:4000/uploads/${this.user.ProfileImage}`} alt=""/>
                            }
                        </div>
                        <ButtonStyleThree title="Save Image" onClick={() => {}} color='blue' />
                        <input style={{display: 'none'}} type="file" id="file" name="file" onChange={this.handleChange} />
                    </form>
                    <div className='profile-settings-profile-form'>
                        <div className='profile-settings-input-container'>
                            <TextBox style={{width: 300}} name='name' value={this.state.name} type='text' placeholder='name' maxLength={50} onChange={this.onChangeState}  />
                            <TextBox style={{width: 300}} name='lastname' value={this.state.lastname} type='text' placeholder='lastname' maxLength={50} onChange={this.onChangeState}  />
                        </div>
                        <div className='profile-settings-input-container'>
                            <TextBox style={{width: 300}} name='username' value={this.state.username} type='text' placeholder='username' maxLength={32} onChange={this.onChangeState}  />
                            <TextBox style={{width: 300}} name='email' value={this.state.email} type='email' placeholder='email' maxLength={254} onChange={this.onChangeState}  />
                        </div>
                        <div className='profile-settings-button'>
                            <ButtonStyleThree title='Save' onClick={this.updateUser} color='blue' />  
                            <ButtonStyleThree title='Delete User' onClick={this.deleteUser} color='red' />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


export default ProfileSettings