import React from 'react'
import logo from '../components/pictures/cropped-favicon.png'
const CraftingThePerfectElevatorPitch = () => {
    return (
        <div className='know-yourself container'>
            <h1>Lesson - 3 Crafting the Perfect Elevator Pitch</h1>
            <div className='row d-flex justify-content-center bg-warning'>
                <div className='col-9'>
                    <p>Objectives</p>
                    <ol>
                        <li>Learn how to engage in a strong opening</li>
                        <li>Discribe your experties</li>
                        <li>Making the elevator pitch the right length</li>
                        <li>End with a call to action</li>
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
                    <a href='https://www.youtube.com/watch?v=r-iETptU7JY'><button className='btn btn-outline-light mb-1 mx-5'>Hello</button></a>
                    <a href='https://www.youtube.com/watch?v=Lb0Yz_5ZYzI'><button className='btn btn-outline-light mb-1 mx-5'>Hello</button></a>
                    <a href='https://www.youtube.com/watch?v=Qncmc-yx3gI'><button className='btn btn-outline-light mb-1 mx-5'>Hello</button></a>
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
                    <a href='https://www.indeed.com/career-advice/career-development/perfect-elevator-pitch'><button className='btn btn-outline-light mb-1 mx-5'>Article 1</button></a>
                </div>
                <div className='col d-inline-flex flex-column'>

                </div>
                <div className='row my-2 '>
                </div>
            </div>
        </div>
    )
}

export default CraftingThePerfectElevatorPitch
