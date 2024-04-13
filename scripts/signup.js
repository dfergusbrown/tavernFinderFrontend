const formEl = document.querySelector('#registerForm')
const submitBtn = document.querySelector('#submitBtn')
const switchSubmitBtn = document.querySelector('#switchSubmitBtn')
const registerFields = document.querySelectorAll('.registerFields')
const titleText = document.querySelector('.title')

/* -- EVENT LISTENERS -- */
submitBtn.addEventListener('click', submitUser)
switchSubmitBtn.addEventListener('click', toggleRegisterLogin)

let registering = false

function toggleRegisterLogin(e) {
    e.preventDefault()
    registering ? registering = false : registering = true
    if (!registering) { //logging in
        registerFields.forEach(el => {
            el.classList.add('hide')
        })
        switchSubmitBtn.textContent = 'Switch to Register User'
        submitBtn.textContent = 'Login'
        titleText.textContent = 'Login'
    } else {
        registerFields.forEach(el => {
            el.classList.remove('hide')
        })
        switchSubmitBtn.textContent = 'Switch to Login'
        submitBtn.textContent = 'Register'
        titleText.textContent = 'Register User'
    }
}

async function submitUser(e) {
    e.preventDefault()

    const formData = new FormData(formEl, submitBtn)
    const formDataObj = {}
    for (const [key, value] of formData) {
        if (key === 'firstName' ||
            key === 'lastName' ||
            key === 'email') {
                return null
            } else {
                formDataObj[key] = value
            }
    }
    console.log(formDataObj)
    let pathName = registering ? 'register' : 'login'

    const url = `http://localhost:3001/user/${pathName}`
    try {
        const response = await fetch(url, {
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formDataObj)
        })
        console.log(response)
        const JSONresult = await response.json()
        console.log(JSONresult)

        if (response.ok) {
            window.location.pathname = '/views/login.html'
        }
    } catch(error) {
        console.error(error)
    }
}