import React from 'react'
import { NavLink } from 'react-router-dom'
import logo from './pictures/cropped-favicon.png'
import './footer.css'

const Footer = () => {
    return (
        <div className='container footer'>
            <div className='row'>
                <div className='col-3'>
                    <img src={logo} width='75px' alt='kable Academy logo'/>
                </div>
                <div className='col-3'>
                    <NavLink className='footer-links'>ToolKit</NavLink>
                    <NavLink className='footer-links'>Resume Builder</NavLink>
                </div>
                <div className='col-3'>
                <NavLink className='footer-links'>Modules</NavLink>
                    <NavLink className='footer-links'>Professional Branding & Resume</NavLink>
                    <NavLink className='footer-links'>Effective Communication & Networking</NavLink>
                    <NavLink className='footer-links'>Business Etiquette</NavLink>
                    <NavLink className='footer-links'>Acing The Interview</NavLink>
                    <NavLink className='footer-links'>Time Management</NavLink>
                    <NavLink className='footer-links'>Working In Teams</NavLink>
                    <NavLink className='footer-links'>Technical Interview Prep</NavLink>
                    <NavLink className='footer-links'>The Job Search</NavLink>
                    <NavLink className='footer-links'>On the Job Success</NavLink>
                    <NavLink className='footer-links'>Kable Academy Final Steps</NavLink>
                    <NavLink className='footer-links'>Managing Money & Payment</NavLink>
                </div>

            </div>
           
        
        </div>
    )
}

export default Footer
