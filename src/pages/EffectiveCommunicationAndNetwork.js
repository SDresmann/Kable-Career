import React from 'react'
import logo from '../components/pictures/cropped-favicon.png'

const EffectiveCommunicationAndNetworking = () => {
    return (
        <div className='know-yourself container'>
            <h1>Lesson - 2 Effective Communication & Networking </h1>
            <div className='row d-flex justify-content-center bg-warning'>
                <div className='col-9'>
                    <p>Objectives</p>
                    <ol>
                        <li>How to speak to recruters</li>
                        <li>Discribe your personal and professional values</li>
                        <li>Uncover what motivates your achivements and overall happiness</li>
                        <li>Understand the concept of "working," justify it, and looking foward to it.</li>
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
                <a href='https://www.youtube.com/watch?v=SIXrUQgR2cY'><button className='btn btn-outline-light mb-1 mx-5'>Hello</button></a>
                    <button className='btn btn-outline-light mb-1 mx-5'>Hello</button>
                    <button className='btn btn-outline-light mb-1 mx-5'>Hello</button>
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
                    <a href='https://c-xx104.na1.hs-sales-engage.com/Ctc/W2+23284/c-Xx104/JlF2-6qcW8wLKSR6lZ3pkN2lSHX74PcgwN10X7FwDKrtZN7-C__9ldPfMW8qPCZY6ZnHx3W3kl8qw8830sJN4TctlLMRk1jW7qGN9F6tvWvqW701mpn5QhN5QW7YB-5X6W_VFbVCptfT68nwfvVC6cfR6m2SPbM7GVp9xDvTZW6TzxJR5xrSz7W7B0Wr799X6RcN3b2lLSP8jk5VmLzk53LH2H2W2mX1b849GjlsW8xg9Cg40f42JW5T-JtM9gLX4mV1n7VD4J_CfSW3HSlY3261_X-N361WWwh0jK5W1C30sF53-2KRVP-4hn4FZygBVKDBHM261WTFW4sHkv17jk8DQN3C58y4r9-FZW4cyn0D64f3qQf4p-BsH04'><button className='btn btn-outline-light mb-1 mx-5'>Article 1</button></a>
                    <a href='https://medium.com/@tryjobr8/networking-in-tech-how-to-connect-and-land-your-first-job-2bbb4fdbb803'><button className='btn btn-outline-light mb-1 mx-5'>Article 1</button></a>
                </div>
                <div className='col d-inline-flex flex-column'>

                </div>
            </div>
            <div className='row my-2 '>

            </div>
        </div>
    )
}

export default EffectiveCommunicationAndNetworking
