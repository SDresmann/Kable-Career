import React from 'react'
import { NavLink } from 'react-router-dom'

const ToolKit = () => {
    const toolKit = [

        { title: "Resume Builder", color: "lightgray", path: '/resume-upload' },

    ];
    return (
        <div className='container'>
            <h1>Tool Kit</h1>
            <div className="grid">
                {toolKit.map((skill, index) => (
                    <div key={index} className="card" style={{ backgroundColor: skill.color }}>
                        <NavLink key={index} to={skill.path}>
                            <div className="overlay"></div>
                            <div className="text">{skill.title}</div>
                        </NavLink>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ToolKit
