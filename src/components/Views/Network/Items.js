import React from 'react'
import * as Hi from 'react-icons/hi'
import * as Fa from 'react-icons/fa'

export const Items = [
    {
        title: "Recherche",
        path: '/network',
        icon: <Hi.HiSearch />,
        cName: 'nav-text'
    },
    {
        title: "Relations",
        path: '/network/relations',
        icon: <Fa.FaUserFriends />,
        cName: 'nav-text'
    },/*
    {
        title: "Demandes",
        path: '/network/request',
        icon: <Hi.HiChatAlt2 />,
        cName: 'nav-text'
    }*/
]