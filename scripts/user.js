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
            post.classList.add('row', 'my-2')
                const colDiv = document.createElement('div')
                colDiv.classList.add('col-2')
                post.appendChild(colDiv)
                    const editBtn = document.createElement('button')
                    editBtn.classList.add('btn', 'btn-secondary')
                    editBtn.textContent = 'Edit'
                    colDiv.appendChild(editBtn)

                const col2 = document.createElement('div')
                col2.classList.add('col')

                    const postLink = document.createElement('a')
                    postLink.setAttribute('href', `/views/postDetail.html?${el._id}`)
                    postLink.textContent = el.campaignName
                    col2.appendChild(postLink)
                post.appendChild(col2)
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
