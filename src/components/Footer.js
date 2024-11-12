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
                    <NavLink className='footer-links'>Eportfolio</NavLink>
                    <NavLink className='footer-links'>Resume Builder</NavLink>
                    <NavLink className='footer-links'>Mock Job Application</NavLink>
                    <NavLink className='footer-links'>Cover Letter</NavLink>
                    <NavLink className='footer-links'>Thank You Letter</NavLink>
                    <NavLink className='footer-links'>Business Plan Builder</NavLink>
                    <NavLink className='footer-links'>Log Out</NavLink>
                </div>
                <div className='col-3'>
                <NavLink className='footer-links'>Modules</NavLink>
                    <NavLink className='footer-links'>Getting to Know Yourself</NavLink>
                    <NavLink className='footer-links'>Managing Changes & Your Attitude</NavLink>
                    <NavLink className='footer-links'>Goal Setting</NavLink>
                    <NavLink className='footer-links'>Learning to Learn & Stress Relief Strategies</NavLink>
                    <NavLink className='footer-links'>Time Management</NavLink>
                    <NavLink className='footer-links'>Study Skills</NavLink>
                    <NavLink className='footer-links'>Becoming on Effective Online Student</NavLink>
                    <NavLink className='footer-links'>Responsible Borrowing & Budgeting</NavLink>
                    <NavLink className='footer-links'>Working in Teams</NavLink>
                </div>
                <div className='col-3 '>
                <NavLink className='footer-links'>Other</NavLink>
                    <NavLink className='footer-links'>Cultural Diversity & Conflict Resolution</NavLink>
                    <NavLink className='footer-links'>Effective Communication & Networking</NavLink>
                    <NavLink className='footer-links'>Professional Branding: Resume & Cover Letter</NavLink>
                    <NavLink className='footer-links'>Best Job Search Strategies</NavLink>
                    <NavLink className='footer-links'>Preparing for the Interview</NavLink>
                    <NavLink className='footer-links'>The Interview Process</NavLink>
                    <NavLink className='footer-links'>Answerig Difficult Questions</NavLink>
                    <NavLink className='footer-links'>On the Job Success</NavLink>
                    <NavLink className='footer-links'>Planning for Your Future</NavLink>
                </div>
            </div>
           
        
        </div>
    )
}

export default Footer
