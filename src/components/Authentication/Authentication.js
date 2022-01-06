export class Guard {

    static authenticated = true

    static login = async (username, password) => {
        const request = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({ username, password })
        }

        const res = await fetch('http://localhost:5000/login', request)
        
        if (res.ok) {
            Guard.authenticated = true
            const content = await res.json()
            localStorage.setItem('uid', content.uid)
            return {...content.user}
        }
    }

    static logout = () => {
        const request = {
            method: 'GET',
            headers: { 'uid': localStorage.getItem('uid') },
            credentials: 'include'
        }

        return fetch('http://localhost:5000/logout', request)
        .then(res => {
            Guard.authenticated = false;
            localStorage.clear()
        })
        .catch(err => console.log(err))
    }

    static isAuthenticated = () => {
        //console.log('authenticated', Guard.authenticated)
        return Guard.authenticated
    }
}