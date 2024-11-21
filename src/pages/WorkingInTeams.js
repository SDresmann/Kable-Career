import React from 'react'
import logo from '../components/pictures/cropped-favicon.png'

const WorkingInTeams = () => {
    return (
        <div className='know-yourself container'>
            <h1>Section - 7 Working in Teams</h1>
            <div className='row d-flex justify-content-center bg-warning'>
                <div className='col-9'>
                    <p>Objectives</p>
                    <ol>
                        <li>Foster open and respectful communication</li>
                        <li>Collaborate to achieve common goals</li>
                        <li>Embrace diverse perspectives and skills</li>
                        <li>Share responsibilities and support teammates</li>
                    </ol>
                </div>
                <div className='col-3'>
                    <img src={logo} width='150px' alt='logo' />
                </div>
            </div>

            <div className='row my-2 py-2 bg-success'>
                <div className='col my-auto'>
                    <h5>Videos</h5>
                </div>
                <div className='col d-inline-flex flex-column'>
                    <a href='https://www.youtube.com/watch?v=S7PhGkEQUWw'><button className='btn btn-outline-light mb-1 mx-5'>Hello</button></a>
                    <a href='https://www.youtube.com/watch?v=JmytOJC_C4o'><button className='btn btn-outline-light mb-1 mx-5'>Hello</button></a>
                    <a href='https://www.youtube.com/watch?v=92ht92Do-tk'><button className='btn btn-outline-light mb-1 mx-5'>Hello</button></a>
                </div>
                <div className='col d-inline-flex flex-column'>
                    <button className='btn btn-outline-light mb-1 mx-5'>Hello</button>
                    <button className='btn btn-outline-light mb-1 mx-5'>Hello</button>
                    <button className='btn btn-outline-light mb-1 mx-5'>Hello</button>
                </div>
            </div>
            <div className='row my-2 bg-info py-2'>
                <div className='col my-auto'>
                    <h5>Articles</h5>
                </div>
                <div className='col d-inline-flex flex-column'>
                <a href='https://www.indeed.com/career-advice/career-development/work-as-a-team'><button className='btn btn-outline-light mb-1 mx-5'>Article 1</button></a>
                </div>
                <div className='col d-inline-flex flex-column'>

                </div>
            </div>
            <div className='row my-2 '>

            </div>
        </div>
    )
}

export default WorkingInTeams
