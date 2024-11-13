import React from 'react';
import { NavLink } from 'react-router-dom';


const LifeSkills = () => {
    const lifeSkills = [
        { title: "Professional Branding & Resume", color: "lightgray", path:'/professional-branding-and-resume' },
        { title: "Effective Communication & Networking", color: "lightgreen", path:'/effective-communication-and-networking' },
        { title: "Crafting the Perfect Elevator Pitch", color: "lightgray", path:'/crafiting-the-perfict-elevator-pitch' },
        { title: "Business Etiquette", color: "cyan", path:'/business-etiquette' },
        { title: "Acing the Interview", color: "lightgray", img: "image5.jpg", path: '/acing-the-interview' },
        { title: "Time Management", color: "cyan",  path: '/time-managment'},
        { title: "Working In Teams", color: "lightgray", path: '/working-in-teams' },
        { title: "Technical Interview Prep", color: "lightgreen", path: '/technical-interview-prep' },
        { title: "The Job Search", color: "lightgray", path: '/job-search' },
        { title: "On the Job Success", color: "cyan", path: '/on-the-job-success' },
        { title: "Kable Academy Final Steps ( & After Graduation)", color: "lightgray", path: '/kable-academy-final-steps' },
        { title: "Managing Money & Payments", color: "cyan", path: '/managing-money-and-payments' },
    ];

    return (
        <div className="container">
            <h1>LIFE SKILLS</h1>
            <p>This will be your journey through Kable Academy's Career Services.</p>
            <div className="grid">
                {lifeSkills.map((skill, index) => (
                    <div key={index} className="card" style={{ backgroundColor: skill.color }}>
                        <NavLink key={index} to={skill.path}>
                            <div className="overlay"></div>
                            <div className="text">{skill.title}</div>
                        </NavLink>
                    </div>
                ))}
            </div>


        </div>
    );
};

export default LifeSkills;
