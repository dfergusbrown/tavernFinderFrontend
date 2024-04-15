const usernameTitle = document.querySelector('#usernameTitle')
const postList = document.querySelector('#postList')
const formEl = document.querySelector('#createForm')
const saveSubmitBtn = document.querySelector('#saveSubmitBtn')
const jwt = localStorage.getItem('jwt')
const formElements = document.querySelectorAll('.formElement')

/* -- EVENT LISTENERS -- */
saveSubmitBtn.addEventListener('click', createPost)

let putOrPost = false
const url = "https://tavern-finder-api-03e4c798f637.herokuapp.com/"


checkIfLoggedIn()
function checkIfLoggedIn() {
    if (!jwt) {
        window.location.pathname = '/views/signup.html'
    }
}

jwt && renderPosts()
async function renderPosts() {
    try {
        const response = await fetch(`${url}user/allposts/`, {
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
                    editBtn.dataset.postId = el._id
                    editBtn.addEventListener('click', renderEditData)
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

function togglePutOrPost() {
    putOrPost ? putOrPost = false : putOrPost = true;
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

    const id = putOrPost ? 'idhere' : null
    const method = putOrPost ? "PUT" : "POST"
    const url = `http://localhost:3001/post/${id}`
    try {
        const response = await fetch(url, {
            method: method,
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${jwt}`
            },
            body: JSON.stringify(formDataObj)
        })
        const JSONresult = await response.json()
        console.log(JSONresult)

    } catch (error) {
        console.error(error)
    }
}

async function renderEditData() {
    const id = this.dataset.postId
    console.log(id)
    try {
        
        const url = `http://localhost:3001/post/${id}`
        const response = await fetch(`${url}`, {
            method: "GET",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
                // "Authorization": `Bearer ${jwt}`
            }
        })
        const JSONresult = await response.json()
        console.log(JSONresult[0])
        const result = JSONresult[0]
        // console.log(formElements)

        for (const [key, value] of result) {
            const formElement = formEl.querySelector(`[name="${key}"]`);
            console.log(formElement)
            if (formElement) {
              formElement.value = typeof value === 'String' ? value : null
            }
          }

    } catch (error) {
        console.error(error)
    }
}

function clearForm() {
    console.log('clear form')
    formElements.forEach(el => {
        el.value = null
    })
}