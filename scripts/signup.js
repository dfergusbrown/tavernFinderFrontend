const formEl = document.querySelector('#registerForm')
const submitBtn = document.querySelector('#submitBtn')
const switchSubmitBtn = document.querySelector('#switchSubmitBtn')
const registerFields = document.querySelectorAll('.registerFields')
const titleText = document.querySelector('.title')
const message = document.querySelector('#message')

/* -- EVENT LISTENERS -- */
submitBtn.addEventListener('click', submitUser)
switchSubmitBtn.addEventListener('click', toggleRegisterLogin)

let registering = false
const url = process.env.SERVER_URL

function toggleRegisterLogin(e) {
    e ? e.preventDefault() : null
    registering ? registering = false : registering = true
    if (!registering) { //logging in
        registerFields.forEach(el => {
            el.classList.add('hide')
        })
        switchSubmitBtn.textContent = 'Switch to Register'
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
        if (!registering && (key === 'firstName' ||
            key === 'lastName' ||
            key === 'email')) {
                null
            } else {
                formDataObj[key] = value
            }
    }
    console.log(formDataObj)
    let pathName = registering ? 'register' : 'login'

    try {
        const response = await fetch(`${url}user/${pathName}`, {
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

        if (JSONresult.successMessage || JSONresult.passwordError) {
            message.textContent = JSONresult.successMessage || JSONresult.passwordError
        }
        if (JSONresult.token) {
            localStorage.setItem('jwt', JSONresult.token)
        }
        if (response.ok) {
            registering ? 
                toggleRegisterLogin() :
                setTimeout(window.location.pathname = '/index.html', 3000)
        }

    } catch(error) {
        console.error(error)
    }
}