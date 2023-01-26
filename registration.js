const button = document.getElementById('button')

function getInfo()
{
    const registrationInfo = {
        name : document.getElementById('name').value,
        surname : document.getElementById('surname').value,
        cardNumber : document.getElementById('name').value,
        cardPassword : document.getElementById('name').value,
    }

    console.log(registrationInfo);
}
button.addEventListener('click', getInfo())