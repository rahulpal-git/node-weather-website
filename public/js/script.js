const weatherForm =  document.querySelector('form');
const search = document.querySelector('input');
const errorMessage = document.querySelector('#errorMessage');
const dataMessage = document.querySelector('#dataMessage');


weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const location = search.value;
    errorMessage.textContent = 'Loading...';
    dataMessage.textContent = '';

    fetch('/weather?address='+location).then((response) => {
    response.json().then((data) => {
        if(data.error){
            errorMessage.textContent = data.error;
        }else{
            errorMessage.textContent = data.location;
            dataMessage.textContent = data.forecast;
        }
    });
});
});