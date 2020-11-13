import React from 'react'
import { User } from '../../utils/user'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFolder,  faUser, faSignOutAlt } from '@fortawesome/free-solid-svg-icons'
import { IUserPopUpProps } from './UserPopUpPropsInterface'
import './style.css'

export const UserPopUp = (props: IUserPopUpProps) : JSX.Element => {

    const user = new User();

    const SignOut = () : void => {
        user.SignOut();
        window.location.href = './'
    }

    return(
        <div className='user-pop-up'>
            <div className='user-pop-up-data'>
                <div className='user-image-container'>
                    <img src={`http://localhost:4000/uploads/${props.image}`} alt="" />
                </div>
                <div  className='user-profile-data'>
                    <h2>{`${props.name} ${props.lastname}`}</h2>
                    <p>{props.email}</p>
                </div>
            </div>
            <div className='navigation'>
                <div className='yellow-link'>
                    <FontAwesomeIcon icon={faFolder} />
                    <Link style={{textDecoration: 'none', color:'#fff44f'}} to='/projectsettings'>Your Projects</Link>
                </div>
                <div className='green-link'>
                    <FontAwesomeIcon icon={faUser} />
                    <Link style={{textDecoration: 'none', color: '#00ff7f'}} to='/profile'>Your Profile</Link>
                </div>
                <div className='red-link' onClick={SignOut} >
                    <FontAwesomeIcon icon={faSignOutAlt} />
                    <div style={{textDecoration: 'none', color: '#FF0000'}}>Sign Out</div>
                </div>
            </div>
        </div>
    );
}
