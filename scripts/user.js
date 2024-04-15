const usernameTitle = document.querySelector('#usernameTitle')
const postList = document.querySelector('#postList')
const formEl = document.querySelector('#createForm')
const saveSubmitBtn = document.querySelector('#saveSubmitBtn')
const jwt = localStorage.getItem('jwt')

/* -- EVENT LISTENERS -- */
saveSubmitBtn.addEventListener('click', createPost)


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

    const formData = new FormData(formEl)
    const formDataObj = {}
    const playStyle = {}
    const charCreation = {}
    for (const [key, value] of formData) {
        
        if (key === 'offersSeshZero' ||
            key === 'roleplayHvy' ||
            key === 'combatHvy' ||
            key === 'exploreHvy' ||
            key === 'drinking' ||
            key === 'maps&minis') {
                playStyle[key] = value
            } else if (key === 'abilityScores') {
                charCreation[key] = value
            } else {
                formDataObj[key] = value
            }
    }
    formDataObj['playStyle'] = playStyle
    formDataObj['charCreation'] = charCreation
    console.log(formDataObj)

    const url = 'http://localhost:3001/post/'
    try {
        const response = await fetch(url, {
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${jwt}`
            },
            body: JSON.stringify(formDataObj)
        })
        const JSONresult = await response.json()
        

    } catch (error) {
        console.error(error)
    }
}
