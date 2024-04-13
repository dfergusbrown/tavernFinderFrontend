const comContainer = document.querySelector('#commentsBox')

fetchData()
async function fetchData() {
    const queryString = window.location.search
    const id = queryString.substring(1)
    console.log(id)

    const url = 'http://localhost:3001/'
    const response = await fetch(`${url}comments/${id}`, {
        method: "GET",
        mode: "cors",
        headers: {
            "Content-Type": "application/json"
        },
    })
    const JSONresult = await response.json()

    
    JSONresult.forEach(result => {


        const commentDiv = document.createElement('div')
        commentDiv.classList.add('row')
            //user
            const user = document.createElement('div')
            user.classList.add('col')
            user.textContent = result.userId.username
            commentDiv.appendChild(user)
            //time
            const time = document.createElement('div')
            time.classList.add('col')
            const dateObj = new Date(result.timePosted)
            const timeStamp = dateObj.toLocaleString('en-US')
            time.textContent = timeStamp
            commentDiv.appendChild(time)
            //comment
            const commentText = document.createElement('div')
            commentText.classList.add('col-8', 'commentText', 'offset-3')
            commentText.textContent = result.text
            commentDiv.appendChild(commentText)
            commentDiv.classList.add('border', 'p-2', 'm-1')
        comContainer.appendChild(commentDiv)


    })
}