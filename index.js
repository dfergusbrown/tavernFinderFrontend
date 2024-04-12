/* -- CACHED ELEMENTS -- */
const searchBtn = document.querySelector('#searchBtn')
const results = document.querySelector('#results')
const formEl = document.querySelector('#form')
const numOfResults = document.querySelector('#numOfResults')

/* -- Event Listeners -- */
searchBtn.addEventListener('click', getResults)


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

    const url = 'http://localhost:3001/post/search'
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
        
        numOfResults.textContent = JSONresult.numOfResults
        console.log(JSONresult)
        JSONresult.results.forEach(el => {
            //create result and place on page
            const result = document.createElement('div')
            result.classList.add('row')
            result.classList.add('border-bottom')
            results.appendChild(result)

            // add data to result - num of players, day, time of day
            const campaignName = document.createElement('div')
            campaignName.textContent = el.campaignName
            campaignName.classList.add('col')
            result.appendChild(campaignName)

            const dmName = document.createElement('div')
            dmName.textContent = el.userId.username
            dmName.classList.add('col')
            result.appendChild(dmName)

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

function submitForm() {
    const formData = new FormData(formEl, searchBtn)

    formData.entries().forEach(el => {
        console.log(el)
    })
}