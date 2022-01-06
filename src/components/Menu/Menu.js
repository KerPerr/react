import React from 'react'
import { Items } from './Items'
import { Guard } from '../Authentication/Authentication'
import { Link, useLocation, useNavigate } from 'react-router-dom'

import * as Hi from 'react-icons/hi'
import './Menu.css'

export const Menu = () => {

    const location = useLocation()
    const navigate = useNavigate()

    const handleLogout = () => {
        Guard.logout()
            .then(() => navigate('/login', { replace: true }))
            .catch(e => console.log(e))
    }

    return (
        <nav className='nav-menu'>
            <ul className='nav-menu-items'>
                {Items.map((item, index) => {
                    return (
                        <li key={index} className={item.cName} >
                            <Link to={item.path} style={location.pathname.split('/').indexOf(item.path) > -1 || item.path === ('/') && location.pathname === '/' ? { border: 'solid 1px' } : {}}>
                                {item.icon}<span>{item.title}</span>
                                {/* En dessous de 800px j'enleve le title */}
                            </Link>
                        </li>
                    )
                })}
                <li className='nav-text' >
                    <button className="" onClick={handleLogout}>
                        <Hi.HiOutlineLogout /><span>Logout</span>
                    </button>
                </li>
            </ul>
        </nav>
    )
}