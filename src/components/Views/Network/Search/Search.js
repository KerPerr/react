import React from "react"
import * as Md from 'react-icons/md'

export const Search = (props) => {

    const [search, setSearch] = React.useState('')
    const [users, setUsers] = React.useState([])
    const { me } = props

    React.useEffect(() => {
        const request = {
            method: 'GET',
            headers: { 'uid': localStorage.getItem('uid') },
            credentials: 'include'
        }

        fetch(`http://localhost:5000/users`, request)
            .then(res => res.json())
            .then(data => setUsers(data))
            .catch(err => console.log(err))
    }, [])

    const handleSearch = (e) => {
        e.preventDefault()
        console.log(search)
    }

    const handleInvite = async (id) => {
        const request = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'uid': localStorage.getItem('uid')
            },
            credentials: 'include',
            body: JSON.stringify({ id: me._id, uid: id })
        }

        try {
            const res = await fetch('http://localhost:5000/relations', request)
            if (res.ok) {
                const body = await res.json()
                console.log('body', body)
            }
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <>
            <form className="input-group mb-3" style={{ height: '58px' }} onSubmit={handleSearch}>
                <span className="input-group-text" id="basic-addon1" style={{ margin: '0', padding: '.30em', fontSize: '2em', color: '#4a546c' }}><Md.MdPersonSearch /></span>
                <input type="text" className="form-control" placeholder="Recherche" aria-label="Username" aria-describedby="basic-addon1" onChange={e => setSearch(e.target.value)} />
            </form>
            <div className="result">
                {
                    users.map((u, index) =>
                        <div key={index} className="col-lg-6" style={{ textAlign: 'center' }}>
                            <svg className="bd-placeholder-img rounded-circle" width="140" height="140" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: 140x140" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title><rect width="100%" height="100%" fill="#777"></rect><text x="50%" y="50%" fill="#777" dy=".3em">140x140</text></svg>
                            <br />
                            <h2>{u.lastName} {u.firstName}</h2>
                            <p>Some representative placeholder content for the three columns of text below the carousel. This is the first column.</p>
                            <p><button className="btn btn-secondary" onClick={() => handleInvite(u._id)}>Demandé en ami(e)</button></p>
                        </div>
                    )
                }
            </div>
        </>
    )
}