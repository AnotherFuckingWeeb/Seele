import React from 'react'
import { Helmet } from 'react-helmet'
import './style.css'
import Images from '../../images/images'
import { NavBar } from '../../components/NavBar'
import { Link } from 'react-router-dom'

class Home extends React.Component {
    
    render() : JSX.Element {
        return(
            <main>
                <Helmet>
                    <title>Seele</title>
                </Helmet>
                <NavBar/>
                <section>
                    <div className='blue-section'>
                        <div className='description-container'>
                            <div className='description'>
                                <h1>Welcome to Seele!</h1>
                                <p>A trello like application that allows you to organize your projects efficiently</p>
                            </div>
                            <img src={Images.heroA} alt=""/>
                        </div>
                    </div>
                </section>
                <section>
                    <div className='section-one'>
                        <div className='section-one-image'>
                            <img src={Images.updatedLayoutsCollab} alt=""/>
                        </div>
                        <div className='section-one-description'>
                            <h1>Organizing your projects has never been so easy</h1>
                            <p>With Seele you can organize your project into sections, taskboards and cards with all the necessary information</p>
                        </div>
                    </div>
                </section> 
                <section>
                    <div className='section-two'>
                        <div className='section-two-description'>
                            <h1>Free up your mental space</h1>
                            <p>Regain clarity and calmness by getting all those tasks out of your head and onto your to-do list</p>
                        </div>
                        <div className='section-two-list'>
                            <div className='section-two-elements'>
                                <img src={Images.brain} alt=""/>
                                <h1>Bring your ideas to life</h1>
                                <p>
                                    Use all the tools Seele has for you to carry out your projects in a more optimal and less stressful way
                                </p>
                            </div>
                            <div className='section-two-elements'>
                                <img src={Images.task} alt=""/>
                                <h1>Organize your ideas</h1>
                                <p>
                                    Use the tools that Seele offers you to organize the objectives of your projects in a concise and simple way
                                </p>
                            </div>
                            <div className='section-two-elements' >
                                <img src={Images.swords} alt=""/>
                                <h1>Divide and conquer</h1>
                                <p>
                                    Divide the project into sections, objectives and small tasks with the Seele tools to facilitate the development of your project
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
                <section>
                    <div className='section-three section-three-bg '>
                        <div className='section-three-description'>
                            <h1>What are you waiting for?</h1>
                            <p>Make your ideas come true and develop your dream project with ease and professionalism</p>
                            <Link className='sign-up-link' to='/signup'>Sign Up</Link>
                        </div>
                    </div>
                    <footer className='footer'>
                        <h1>Seele</h1>
                    </footer>
                </section>
            </main>
        )
    }
}

export default Home