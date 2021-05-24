
async function signUp (event) {
    event.preventDefault();
    const username = document.querySelector('#username_signup').value.trim();
    const email = document.querySelector('#email_signup').value.trim();
    const password = document.querySelector('#password_signup').value.trim();

    if(username && email && password){
        const res = await fetch('api/users', {
            method: 'post',
            body: JSON.stringify({
                username,
                email,
                password
            }),
            headers: {'Content-Type': 'application/json'}
        })
        if(res.ok){
            console.log('sign up successful')
        } else {
            alert(res.statusText)
        }
    }
}
async function login (event) {
    event.preventDefault();

    const username = document.querySelector('#username_login').value.trim();
    const password = document.querySelector('#password_login').value.trim();

    if(username && password){
        const res = await fetch('/api/users/login', {
            method: 'post',
            body: JSON.stringify({
                username,
                password
            }),
            headers: {'Content-Type': 'application/json'}
        })
        if(res.ok){
            document.location.replace('/dashboard');
        } else {
            alert(res.statusText)
        }
    }
}

document.querySelector('.login-form').addEventListener('submit', login)
document.querySelector('.signup-form').addEventListener('submit', signUp);