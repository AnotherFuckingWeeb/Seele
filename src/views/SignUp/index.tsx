import React from 'react'
import { NavBar } from '../../components/NavBar'
import { Helmet } from 'react-helmet'
import { ISignUpProps } from './SignUpProps'
import { ISignUpState } from './SignUpState'
import { TextBox } from '../../components/TextBox'
import { ButtonStyleOne } from '../../components/Button'
import { Loading } from '../../components/Loading'
import { MessageModal } from '../.././components/MessageModal'
import './style.css'


class SignUp extends React.Component<ISignUpProps, ISignUpState> {

    constructor(props: ISignUpProps) {
        super(props)

        this.state = {
            username: '',
            name: '',
            lastname: '',
            email: '',
            password: '',
            confirmPassword: '',
            response: '',
            responseStatus: '',
            loading: false
        }
    }

    private EnableButton = () : boolean => {
        return (this.state.username && 
                this.state.name && 
                this.state.lastname && 
                this.state.email && 
                this.state.password && 
                this.state.confirmPassword
                ) && this.state.password === this.state.confirmPassword ? true : false
    }

    private onChangeState = (event: React.ChangeEvent<HTMLInputElement>) : void => {
        
        const { value, name } = event.target;

        this.setState({
            ...this.state,
            [name] : value
        });
    }

    private onSubmit = async () : Promise<void> => {
        try {
            const url = 'http://localhost:4000/users';
            const { username, name, lastname, email, password } = this.state ;
            const request = {
                username: username,
                name: name,
                lastname: lastname,
                email: email,
                password: password
            };

            this.setState({ loading: true });

            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(request)
            });

            const data = await response.json();

            this.setState({ loading: false });

            this.setState({ response: data.message, responseStatus: 'SUCESS'});
        } 
        
        catch (error) {
            this.setState({ loading: false });
            this.setState({response: 'A Problem Has Ocurred', responseStatus: 'ERROR'});
        }
    }

    render() : JSX.Element {
        return (
            <main>
                <Loading loading={this.state.loading} />
                <Helmet>
                    <title>Sign Up</title>
                    <style>{'body { background-color: #f4f4f4 }'}</style>
                </Helmet>
                <NavBar/>
                <div className='sign-up-main-container'>
                    <div className='sign-up-form-title'>
                        <h1>Sign Up</h1>
                    </div>
                    { this.state.response ? <MessageModal message={this.state.response} type={this.state.responseStatus as any} /> : null }
                    <div className='sign-up-form-container'>
                        <div className='sign-up-form-logo'>
                            <h1>Seele</h1>
                        </div>
                        <div className='sign-up-form'>
                            <TextBox name='username' value={this.state.username} type='text' placeholder='username' maxLength={32} onChange={this.onChangeState} />
                            <TextBox name='name' value={this.state.name} type='text' placeholder='name' maxLength={50} onChange={this.onChangeState} />
                            <TextBox name='lastname' value={this.state.lastname} type='text' placeholder='lastname' maxLength={50} onChange={this.onChangeState} />
                            <TextBox name='email' value={this.state.email} type='email' placeholder='email' maxLength={254} onChange={this.onChangeState} />
                            <TextBox name='password' value={this.state.password} type='password' placeholder='password' maxLength={32} onChange={this.onChangeState} />
                            <TextBox name='confirmPassword' value={this.state.confirmPassword} type='password' placeholder='password' maxLength={32} onChange={this.onChangeState} />
                            <ButtonStyleOne disabled={this.EnableButton()} title='Sign Up' onClick={this.onSubmit} />
                        </div>
                    </div>
                </div>
            </main>
        )
    }
}

export default SignUp