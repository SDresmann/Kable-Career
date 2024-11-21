import React from 'react'
import logo from '../components/pictures/cropped-favicon.png'

const OnTheJobSuccess = () => {
    return (
        <div className='know-yourself container'>
            <h1>Lesson - 10 On the Job Success</h1>
            <div className='row d-flex justify-content-center bg-warning'>
                <div className='col-9'>
                    <p>Objectives</p>
                    <ol>
                        <li>Understand and meet job expectations</li>
                        <li>Communicate effectively with colleagues and supervisors</li>
                        <li>Continuously develop skills and seek feedback</li>
                        <li>Demonstrate reliability and a positive work ethic</li>
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
                    <a href='https://www.youtube.com/watch?v=WgR6mUSsEig'>
                        <button className='btn btn-outline-light mb-1 mx-5'>Hello</button>
                    </a>
                    <a href='https://www.youtube.com/watch?v=LxQMaGYPU9Q'>
                        <button className='btn btn-outline-light mb-1 mx-5'>Hello</button>
                    </a>
                    <a href='https://www.youtube.com/watch?v=1CuYbSNbEio'>
                        <button className='btn btn-outline-light mb-1 mx-5'>Hello</button>
                    </a>

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
                    <a href='https://www.indeed.com/career-advice/interviewing/define-success'><button className='btn btn-outline-light mb-1 mx-5'>Article 1</button></a>
                </div>
                <div className='col d-inline-flex flex-column'>

                </div>
            </div>
            <div className='row my-2 '>

            </div>
        </div>
    )
}

export default OnTheJobSuccess
