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

    // if there are no results
    if (JSONresult.length === 0) {
        const noCommentDiv = document.createElement('div')
        noCommentDiv.classList.add('row', 'justify-content-center')
        noCommentDiv.textContent = '[No Comments]'
        comContainer.appendChild(noCommentDiv)
    }
    
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
            time.classList.add('col', 'text-nowrap')
            const dateObj = new Date(result.timePosted)
            const timeStamp = dateObj.toLocaleString('en-US')
            time.textContent = timeStamp
            commentDiv.appendChild(time)
            //comment
            const commentText = document.createElement('div')
            commentText.classList.add('col-8', 'commentText', 'offset-2')
            commentText.textContent = result.text
            commentDiv.appendChild(commentText)
            commentDiv.classList.add('border', 'p-2', 'm-1')
        comContainer.appendChild(commentDiv)
    })
}