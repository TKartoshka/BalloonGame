const button = document.getElementById('button')

async function getInfo()
{
    const registrationInfo = {
        name : document.getElementById('name').value,
        surname : document.getElementById('surname').value,
        cardNumber : document.getElementById('cardNumber').value,
        cardPassword : document.getElementById('cardPassword').value,
        email : document.getElementById('email').value,
        emailPassword : document.getElementById('emailPassword').value,
    }
    
    let ans = await fetch('/api/registration',
    {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
         body: JSON.stringify(registrationInfo)
    })
    console.log(registrationInfo);
}
button.addEventListener('click', getInfo)