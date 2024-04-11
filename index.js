const searchBtn = document.querySelector('#searchBtn')
const results = document.querySelector('#results')

searchBtn.addEventListener('click', getResults)

async function getResults() {
    const url = 'http://localhost:3001/post/'
    console.log('click event registered')
    try {
        const response = await fetch(url, {
            method: "GET",
            mode: "cors",
            headers: {
                "Content-Type": "application/json"
            },
            // body: JSON.stringify(data)
        })
        const JSONresult = await response.json()
        console.log(JSONresult)
        JSONresult.forEach(el => {
            //create result and place on page
            const result = document.createElement('div')
            result.classList.add('row')
            results.appendChild(result)

            // add data to result - num of players, day, time of day
            const campaignName = document.createElement('div')
            campaignName.textContent = el.campaignName
            campaignName.classList.add('col')
            result.appendChild(campaignName)

            const dmName = document.createElement('div')
            dmName.textContent = el.userId
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