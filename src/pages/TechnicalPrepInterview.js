import React from 'react'
import logo from '../components/pictures/cropped-favicon.png'

const TechnicalInterviewPrep = () => {
    return (
        <div className='know-yourself container'>
            <h1>Lesson - 8 Technical Interview Prep</h1>
            <div className='row d-flex justify-content-center bg-warning'>
                <div className='col-9'>
                    <p>Objectives</p>
                    <ol>
                        <li>Review fundamental technical concepts and skills</li>
                        <li>Practice solving coding and problem-solving challenges</li>
                        <li>Prepare concise and clear explanations for past projects</li>
                        <li>Develop strategies for answering behavioral questions effectively</li>
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
                    <a href='https://www.youtube.com/watch?v=1t1_a1BZ04o'><button className='btn btn-outline-light mb-1 mx-5'>Hello</button></a>
                    <a href='https://www.youtube.com/watch?v=zwjm8zmbEbA'><button className='btn btn-outline-light mb-1 mx-5'>Hello</button></a>
                    <a href='https://www.youtube.com/watch?v=vRp0NvdXVuo'><button className='btn btn-outline-light mb-1 mx-5'>Hello</button></a>

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
                <a href='https://www.indeed.com/career-advice/interviewing/technical-interview'><button className='btn btn-outline-light mb-1 mx-5'>Article 1</button></a>
                </div>
                <div className='col d-inline-flex flex-column'>

                </div>
            </div>
            <div className='row my-2 '>

            </div>
        </div>
    )
}

export default TechnicalInterviewPrep
