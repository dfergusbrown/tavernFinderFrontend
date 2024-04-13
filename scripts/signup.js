const formEl = document.querySelector('#registerForm')
const submitBtn = document.querySelector('#submitBtn')

/* -- EVENT LISTENERS -- */
submitBtn.addEventListener('click', registerUser)

async function registerUser(e) {
    e.preventDefault()

    const formData = new FormData(formEl, submitBtn)
    const formDataObj = {}
    for (const [key, value] of formData) {
        formDataObj[key] = value
    }
    console.log(formDataObj)

    const url = 'http://localhost:3001/user/register'
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