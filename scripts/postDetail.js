const campaignName = document.querySelector('#campaignName')
const dmName = document.querySelector('#dmName')
const playerSlotsField = document.querySelector('#playerSlotsField')
const locationField = document.querySelector('#locationField')
const frequencyField = document.querySelector('#frequencyField')
const freqDaysField = document.querySelector('#freqDaysField')
const expectedLengthField = document.querySelector('#expectedLengthField')
const descriptionField = document.querySelector('#descriptionField')
const commentsLink = document.querySelector('#commentsLink')

const url = process.env.SERVER_URL

fetchData()
async function fetchData() {
    const queryString = window.location.search
    const id = queryString.substring(1)
    console.log(id)

    const response = await fetch(`${url}post/${id}`, {
        method: "GET",
        mode: "cors",
        headers: {
            "Content-Type": "application/json"
        },
    })
    const JSONresult = await response.json()
    const postResult = JSONresult[0]

    campaignName.textContent = postResult.campaignName
    dmName.textContent = postResult.userId.username
    playerSlotsField.textContent = `${postResult.players.length}/${postResult.totalSlots}`
    locationField.textContent = postResult.location
    // update time field here
    frequencyField.textContent = postResult.frequency
    freqDaysField.textContent = postResult.freqDays
    expectedLengthField.textContent = postResult.expectedLength
    descriptionField.textContent = postResult.description

    commentsLink.setAttribute('href', `./comments.html?${id}`)
}