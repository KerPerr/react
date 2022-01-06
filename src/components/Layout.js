import React from "react"
import { Menu } from "./Menu/Menu"
import { Navigate, Outlet, useNavigate } from "react-router-dom"
import { Guard } from './Authentication/Authentication'

export const Layout = (props) => {

    const navigate = useNavigate()
    const { me, setMe } = props

    React.useEffect(() => {
        fetch('http://localhost:5000/authenticated', {
            method: 'GET',
            headers: { 'uid': localStorage.getItem('uid') },
            credentials: 'include'
        })
        .then(res => res.json())
        .then(data => data ? setMe(data) : navigate('/login'))
        .catch(err => console.log(err))
    }, [])

    return (
        Guard.isAuthenticated() ?
        <div style={{height: '100vh'}}>
            <Menu me={me}/>
            <Outlet />
        </div>
        :
        <Navigate to='/login' />
    )
}