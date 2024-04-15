const usernameTitle = document.querySelector('#usernameTitle')
const postList = document.querySelector('#postList')
const jwt = localStorage.getItem('jwt')

/* -- EVENT LISTENERS -- */
checkIfLoggedIn()
function checkIfLoggedIn() {
    if (!jwt) {
        window.location.pathname = '/views/signup.html'
    }
}

jwt && renderPosts()
async function renderPosts() {
    const url = 'http://localhost:3001/user/allposts/'
    try {
        const response = await fetch(`${url}`, {
            method: "GET",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${jwt}`
            }
        })
        const JSONresult = await response.json()
        console.log(JSONresult)
        
        JSONresult.results.forEach(el => {
            const post = document.createElement('div')
            post.classList.add('row')
            post.textContent = el.campaignName
            postList.appendChild(post)
        })
        
    } catch (error) {
        console.error(error)
    }
}

async function createPost(e) {
    e.preventDefault()

    const formData = new FormData(formEl, searchBtn)
    const formDataObj = {}
    for (const [key, value] of formData) {
        formDataObj[key] = value
    }
    console.log(formDataObj)

    const url = 'http://localhost:3001/post/'
    try {
        const response = await fetch(url, {
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formDataObj)
        })
        const JSONresult = await response.json()
        

    } catch (error) {
        console.error(error)
    }
}
