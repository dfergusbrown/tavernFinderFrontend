/* -- CACHED ELEMENTS -- */
const searchBtn = document.querySelector('#searchBtn')
const results = document.querySelector('#results')
const formEl = document.querySelector('#form')
const numOfResults = document.querySelector('#numOfResults')

/* -- Event Listeners -- */
searchBtn.addEventListener('click', getResults)

const url = process.env.SERVER_URL
/* -- FUNCTIONS -- */
async function getResults(e) {
    e.preventDefault()
    results.innerHTML = '' //clear results

    const formData = new FormData(formEl, searchBtn)
    const formDataObj = {}
    for (const [key, value] of formData) {
        formDataObj[key] = value
    }
    console.log(formDataObj)

    try {
        const response = await fetch(`${url}post/search`, {
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formDataObj)
        })
        const JSONresult = await response.json()
        
        numOfResults.textContent = JSONresult.numOfResults
        console.log(JSONresult)
        JSONresult.results.forEach(el => {
            //create result and place on page
            const result = document.createElement('div')
            result.classList.add('row')
            result.classList.add('border-bottom')
            results.appendChild(result)

            // add Campaign Name
            const campaignName = document.createElement('div')
                const detailLink = document.createElement('a')
                detailLink.textContent = el.campaignName
                detailLink.setAttribute("href", `/views/postDetail.html?${el._id}`)
                campaignName.appendChild(detailLink)
            campaignName.classList.add('col')
            result.appendChild(campaignName)

            // add DM name to center column
            const dmName = document.createElement('div')
            dmName.textContent = el.userId.username
            dmName.classList.add('col')
            result.appendChild(dmName)
            
            // add remaining details
            const details = document.createElement('div')
            details.classList.add('col')
                const numPlayers = document.createElement('div')
                numPlayers.textContent = `player slots filled: ${el.players.length}/${el.totalSlots}`
                details.appendChild(numPlayers)

                const frequency = document.createElement('p')
                frequency.textContent = `played ${el.frequency}`
                details.appendChild(frequency)

                const freqDays = document.createElement('p')
                freqDays.textContent = `On ${el.freqDays}`
                details.appendChild(freqDays)
            result.appendChild(details)
        })
    } catch (error) {
        console.error(error)
    }
}
