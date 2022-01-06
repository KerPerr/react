import React from 'react'
import { useNavigate } from 'react-router-dom'

export const Relation = (props) => {

    const { me } = props
    const navigate = useNavigate()
    const [friends, setFriends] = React.useState([])
    const [demandes, setDemandes] = React.useState([])

    React.useEffect(() => {
        const request = {
            method: 'GET',
            headers: { 'uid': localStorage.getItem('uid') },
            credentials: 'include'
        }

        fetch(`http://localhost:5000/relations`, request)
            .then(res => res.json())
            .then(data => console.log(data))
            .catch(err => console.log(err))
    }, [])

    React.useEffect(() => {
        if (me._id) {
            const request = {
                method: 'GET',
                headers: { 'uid': localStorage.getItem('uid') },
                credentials: 'include'
            }

            fetch(`http://localhost:5000/users/${me._id}`, request)
                .then(res => res.json())
                .then(data => setFriends(data))
                .catch(err => console.log(err))
        }
    }, [me])

    const handleSubmit = (id, status) => {

        const request = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'uid': localStorage.getItem('uid')
            },
            credentials: 'include',
            body: JSON.stringify({ status })
        }

        fetch(`http://localhost:5000/relations/${id}`, request)
            .then(res => res.json())
            .then(data => {
                const request = demandes.filter(d => d._id != data._id)
                setDemandes(request)
            })
            .catch(err => console.log(err))
    }

    const handleUser = (id) => {
        navigate(`/${id}`)
    }

    return (
        <>
            {demandes.map((d, index) =>
                <div className="card" key={index} style={{ flexDirection: 'row', alignItems: 'center', margin: '1em', padding: '0 1em' }}>
                    <div style={{ display: 'flex', alignItems: 'center', flex: '2 1 auto' }}>
                        <figure className="avatar avatar-xl" style={{ margin: '0.25em 1em' }}>
                            <img src="https://picturepan2.github.io/spectre/img/avatar-1.png" />
                        </figure>
                        <div>
                            <h5 className="card-title">{d.owner.firstName} {d.owner.lastName}</h5>
                            <p className="card-text">Vous demandes en ami(e)</p>
                        </div>
                    </div>
                    <div style={{ display: 'flex', flex: '1', justifyContent: 'space-around' }}>
                        <button className="btn btn-success" onClick={() => handleSubmit(d._id, 'RESOLVE')}>Accepter</button>
                        <button href="#" className="btn btn-secondary" onClick={() => handleSubmit(d._id, 'REJECT')}>Décliner</button>
                    </div>
                </div>
            )}
            <hr />
            <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                {friends.map((u, index) =>
                    <div key={index} className="card m-3" style={{ width: '18rem' }}>
                        <div className="card-body" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                            <h5 className="card-title" onClick={() => handleUser(u._id)}>{u.firstName} {u.lastName}</h5>
                            <figure className="avatar avatar-xl">
                                <img src="https://picturepan2.github.io/spectre/img/avatar-1.png" />
                            </figure>
                        </div>
                        <div className="card-footer">
                            <p></p>
                        </div>
                    </div>
                )}
            </div>
        </>
    )
}