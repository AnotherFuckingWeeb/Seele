import React from 'react'
import { Link } from 'react-router-dom'
import './style.css'

export const NavBar = () : JSX.Element => {
    return(
        <section>
            <header>
                <nav className='navbar' /*style={Styles.navBar}*/>
                    <Link to='/' className='navbar-logo' /*style={Styles.logo}*/>Seele</Link>
                    <div className='navbar-links' /*style={Styles.links}*/>
                        <Link to='/login' className='navbar-login-link' /*style={Styles.loginLink}*/ >Login</Link>
                        <Link to='/signup' className='navbar-sign-up-link' /*style={Styles.signUpLink}*/>Sign Up</Link>
                    </div>
                </nav>
            </header>
    </section>
    );
}
