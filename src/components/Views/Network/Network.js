import React from "react"
import { Items } from './Items'
import { Link, Outlet, useLocation } from "react-router-dom"

import './Network.css'

export const Network = () => {

    const location = useLocation()

    return (
        <div className='net-view'>
            <div className='left-panel'>
                <p>Gérer mon réseau</p>
                {Items.map((item, index) => {
                    return (
                        <li key={index} className={item.cName} >
                            <Link to={item.path} style={item.path === location.pathname ? { border: 'solid 1px' } : {}}>
                                {item.icon}<span>{item.title}</span>
                                {/* En dessous de 800px j'enleve le title */}
                            </Link>
                        </li>
                    )
                })}
            </div>
            <div className="right-panel">
                <Outlet />
            </div>
        </div>
    )
}