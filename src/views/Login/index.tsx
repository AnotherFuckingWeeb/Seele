import React from 'react'
import Cookies from 'universal-cookie'
import { User } from '../../utils/user'
import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'
import { NavBar } from '../../components/NavBar'
import { TextBox } from '../../components/TextBox'
import { ButtonStyleOne } from '../../components/Button' 
import { Loading } from '../../components/Loading'
import { ILoginProps } from './LoginProps'
import { ILoginState } from './LoginState'
import { MessageModal } from '../../components/MessageModal'
import './style.css'

class Login extends React.Component<ILoginProps, ILoginState> {
    
    private user : User = new User();
    private cookies : Cookies = new Cookies();

    constructor(props: ILoginProps) {
        super(props)

        this.state = {
            username: '',
            password: '',
            error: '',
            loading: false
        }
    }

    private Login = async () : Promise<void> => {
        try {
            const url = "http://localhost:4000/users/login";
            
            const request = {
                username: this.state.username,
                password: this.state.password
            }
            
            this.setState({ loading: true });

            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(request)
            })

            const data = await response.json();

            this.user.Update(data[0][0].username, data[0][0].name, data[0][0].lastname, data[0][0].email, data[0][0].profile_image, data[0][0].id)
            
            this.setState({ loading: false });
            window.location.href = './projects'
        } 
        
        catch (error) {
            this.setState({
                error: 'Username or Password are incorrect', 
                loading: false
            });
        }
    }

    private onStateChange = (event: React.ChangeEvent<HTMLInputElement> ) : void => {

        const { name, value } = event.target;

        this.setState({
            ...this.state,
            [name] : value
        });

    }

    render() : JSX.Element {
        return(
            <main>
                <Loading loading={this.state.loading} />
                <Helmet>
                    <title>Login</title>
                    <style>{'body { background-color: #f4f4f4; }'}</style>
                </Helmet>
                <NavBar/>
                <div className='login-container'>
                    <div className='login-form-title'>
                        <h1>Sign In</h1>
                    </div>
                    {this.state.error ? <MessageModal message={this.state.error} type='ERROR' /> : null }
                    <div className='login-form'>
                        <div className='login-form-logo'>
                            <h1>Seele</h1>
                        </div>
                        <div className='form-login'>
                            <TextBox name='username' value={this.state.username} type='text' placeholder='username or email' maxLength={254} onChange={this.onStateChange} />
                            <TextBox name='password' value={this.state.password} type='password' placeholder='password' maxLength={32} onChange={this.onStateChange} />
                            <ButtonStyleOne disabled={this.state.username.length > 0 && this.state.password.length > 0} title='Login' onClick={this.Login} />
                        </div>
                        <div className='login-forgot-password-container'>
                            <Link to='/forgotpassword' className='login-forgot-password'>Forgot Pasword?</Link>
                        </div>
                    </div>
                </div>
            </main>
        )
    }
}

export default Login