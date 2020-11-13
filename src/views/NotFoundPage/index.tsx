import React from 'react'
import { Helmet } from 'react-helmet'
import './style.css'

class NotFoundPage extends React.Component {

    render() : JSX.Element {
        return(
            <div className='not-found-container'>
                <Helmet>
                    <title>Page Not Found</title>
                    <style>{'body { background-color: #3A80DE; }'}</style>
                </Helmet>
                <h1>
                    Page Not Found
                </h1>
            </div>
        )
    }
}

export default NotFoundPage