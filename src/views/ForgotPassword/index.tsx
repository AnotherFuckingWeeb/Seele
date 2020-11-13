import React from 'react'
import { NavBar } from '../../components/NavBar'
import { Helmet } from 'react-helmet' 
import { IForgotPasswordProps } from './ForgotPasswordProps'
import { IForgotPasswordState } from './ForgotPasswordState' 
import { MessageModal } from '../../components/MessageModal'
import { TextBox } from '../../components/TextBox'
import { ButtonStyleOne } from '../../components/Button'
import './style.css'

class ForgotPassword extends React.Component<IForgotPasswordProps, IForgotPasswordState> {

    constructor(props: IForgotPasswordProps) {
        super(props)

        this.state = {
            email: '',
            message: '',
            status: 'SUCESS',
            loading: false,
            response: false
        }

    }

    private onStateChange = (event: React.ChangeEvent<HTMLInputElement>) : void => {

        const { name, value } = event.target;

        this.setState({
            ...this.state,
            [name] : value
        });
    } 

    private sendEmail = async () : Promise<void> => {
        try {
            const url = 'http://localhost:4000/users/send-email';

            const request = {
                email: this.state.email
            };
    
            this.setState({
                loading: true
            });
    
            await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(request)
            });
    
            this.setState({
                message: 'An Email Has Been Sent To Your Account',
                status: 'SUCESS',
                response: true,
                loading: false
            });
        } 
        
        catch (error) {
            this.setState({
                message: error,
                status: 'ERROR',
                response: true,
                loading: false
            });
        }
    } 

    render() : JSX.Element {
        return(
            <div>
                <Helmet>
                    <title>Forgot Password</title>
                    <style>{'body { background-color: #f4f4f4; }'}</style>
                </Helmet>
                <NavBar />
                <div className='forgot-password-container'>
                    {
                        this.state.response ? <MessageModal type={this.state.status} message={this.state.message}/> : null
                    }
                    <div className='forgot-password-form'>
                        <div className='forgot-password-message'>
                            <h3 className='forgot-password-title-spacing'>Forgot Password</h3>
                            <p>Enter your email associated with your account to send an email with your password</p>
                        </div>
                        <TextBox name='email' style={{textAlign: 'center'}} value={this.state.email} type='email' placeholder='enter your email account' maxLength={254} onChange={this.onStateChange} />
                        <ButtonStyleOne title='send email' onClick={this.sendEmail} disabled={this.state.email.length > 0} />
                    </div>
                </div>
            </div>
        )
    }
}

export default ForgotPassword