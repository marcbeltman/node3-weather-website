

// fetch('http://puzzle.mead.io/puzzle').then((response) => {
//     response.json().then((data) => {
//         console.log(data)
//     })
// })



const weatherform = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-one')
const messageTwo = document.querySelector('#message-two')

messageOne.textContent = ''
messageTwo.textContent = ''

weatherform.addEventListener('submit', (e) =>{
    e.preventDefault()
    const location = search.value
    search.value = null
    console.log(location)
    
    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''
  

    fetch('http://localhost:3000/weather?address='+ location).then((response) => {
    response.json().then((data) => {
        if (data.error){
            messageTwo.textContent = data.error
        }else{
            messageOne.textContent = data.location
            messageTwo.textContent = data.forecast
        }
    })
})




})