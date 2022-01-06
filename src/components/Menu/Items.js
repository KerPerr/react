import React from 'react'
import * as Ai from 'react-icons/ai'
import * as Hi from 'react-icons/hi'

export const Items = [
    {
        title: "Home",
        path: '/',
        icon: <Hi.HiHome />,
        cName: 'nav-text'
    },
    {
        title: "Network",
        path: 'network',
        icon: <Hi.HiOutlineUserGroup />,
        cName: 'nav-text'
    },
    {
        title: "Notifications",
        path: 'notifications',
        icon: <Ai.AiOutlineNotification />,
        cName: 'nav-text'
    },
    {
        title: "Profile",
        path: 'profile',
        icon: <Hi.HiOutlineUserCircle />,
        cName: 'nav-text'
    },
    // {
    //     title: "Logout",
    //     path: '/login',
    //     icon: <Hi.HiOutlineLogout />,
    //     cName: 'nav-text'
    // }
]