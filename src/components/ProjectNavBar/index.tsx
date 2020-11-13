import React, { useState } from 'react'
import { TextBox } from '../TextBox'
import { IProjectsNavBarProps } from './ProjectNavBarPropsInterface'
import './style.css'

export const ProjectNavBar = (props: IProjectsNavBarProps) : JSX.Element => {

    const [search, setSearch] = useState('');

    let onChangeState = (event: React.ChangeEvent<HTMLInputElement>) : void => {
        const { value } = event.target;
        setSearch(value);
    }

    let onSearch = async () : Promise<void> => {
        await props.search(search);
    }

    let onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) : void => {
        if (event.key === 'Enter') {
            onSearch();
        }
    }

    return(
        <div className='projects-navbar'>
            <div className='projects-navbar-input-container'>
                <TextBox name='search' value={search} type='text' placeholder='Search Project...' maxLength={32} onChange={onChangeState} onKeyDown={onKeyDown} />
            </div>
            <div className='projects-navbar-user-profile' onClick={props.show} >
                <div className='projects-navbar-user-profile-image-container'>
                    <img className='projects-navbar-user-profile-image' src={`http://localhost:4000/uploads/${props.profileImage}`} alt="" />
                </div>
                <div className='projects-navbar-user-profile-username'>
                    <h4>{props.username}</h4>
                </div>
            </div>
        </div>
    );
}
