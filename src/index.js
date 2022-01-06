import React from 'react'
import ReactDOM from 'react-dom'
import { Layout } from './components/Layout'
import { Login } from './components/Authentication/Login'
import { Register } from './components/Authentication/Register'
import { NotFound } from './components/Views/NotFound/NotFound'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Profile } from './components/Views/Base'
import { Home } from './components/Views/Home/Home'
import { Network } from './components/Views/Network/Network'
import { Search } from './components/Views/Network/Search/Search'
import { Notification } from './components/Views/Notification/Notification'
import { Relation } from './components/Views/Network/Relation/Relation'

const App = () => {

    const [me, setMe] = React.useState({})

    return (
        <React.StrictMode>
            <BrowserRouter>
                <Routes>
                    {/* Routes public */}
                    <Route path='login' element={<Login setMe={setMe} />} />
                    <Route path='register' element={<Register />} />

                    {/* Routes privées */}
                    <Route path='/' element={<Layout me={me} setMe={setMe} />}>
                        <Route path='/' element={<Home me={me} />} />
                        <Route path='/network' element={<Network me={me} />} >
                            <Route path='/network' element={<Search me={me} />} />
                            <Route path='/network/relations' element={<Relation me={me} />} />
                        </Route>
                        <Route path='/notifications' element={<Notification />} />
                        <Route path='/profile' element={<Profile me={me} />} />
                    </Route>

                    {/* Route 404 */}
                    <Route path=':pageName' element={<NotFound />} />

                </Routes>
            </BrowserRouter>
        </React.StrictMode>
    )
}

ReactDOM.render(<App />, document.getElementById('root'))