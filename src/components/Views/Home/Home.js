import React from 'react'
import * as Ti from 'react-icons/ti'
import * as Bi from 'react-icons/bi'
import './Home.css'

export const Home = (props) => {

    const [news, setNews] = React.useState([])
    const { me } = props

    React.useEffect(() => {
        fetch('http://localhost:5000/posts', {
            method: 'GET',
            headers: { uid: localStorage.getItem('uid') },
            credentials: 'include'
        })
            .then(res => res.json())
            .then(data => setNews(data))
            .catch(err => console.log(err))
    }, [])

    return (
        <div className='home-view'>
            <h1>Bienvenue {me.firstName}</h1>
            <p>Fil d'actualité personel et amis</p>
            <hr />
            <div>
                <div className="card" style={{ position: 'fixed', width: '20%', display: 'flex', justifyContent: 'center' }}>
                    <div className="card-body" style={{}}>
                        <h5 className="card-title">New Post</h5>
                        <div className="expendable-input" type="submit" role="textbox" contentEditable></div>
                        {/* <p className="card-text"><textarea style={{width: '100%'}}></textarea></p> */}
                        <button className="btn btn-primary" style={{ width: '100%' }}><Bi.BiMessageDots /></button>
                    </div>
                </div>
                <div>
                    {news.map((n, index) =>
                        <article key={index} className='question'>
                            <header>
                                <h4>{n.title}</h4>
                            </header>
                            <hr />
                            <main>
                                <p>{n.content}</p>
                            </main>
                            <hr />
                            <footer>
                                <div className="actions">
                                    <button className='position-relative btn btn-success'>
                                        <Ti.TiThumbsUp />
                                        <span className="badge">2,5k</span>
                                    </button>
                                    <button className='position-relative btn btn-secondary'>
                                        <Ti.TiThumbsDown />
                                        <span className="badge">2</span>
                                    </button>
                                </div>
                                <span className='author'>
                                    {n.owner.firstName} {n.owner.lastName}
                                </span>
                            </footer>
                        </article>
                    )}
                </div>
            </div>
        </div>
    )
}