const weatherApi = (loca) => {
    const url = `/weather?address=${loca}`
    const firstP = document.querySelector('#firstMessage')
    const secondP = document.querySelector('#secondMessage')

    firstP.innerHTML = 'Loading...'
    secondP.innerHTML = ''

    fetch(url)
        .then((data) => data.json())
        .then(data => {
            if (data.error) {
                firstP.innerHTML = data.error
            } else {
                firstP.innerHTML = data.location
                secondP.innerHTML = data.description
            }
        })
        .catch(error => console.log(error))
}



const weatherForm = document.querySelector('form')
const locationInput = document.querySelector('input')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const place = locationInput.value
    weatherApi(place)
})