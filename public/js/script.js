console.log('client side javascript file is loaded!');

// fetch('http://puzzle.mead.io/puzzle').then((response) => {
//     response.json().then((data) => {
//         console.log(data);
//     });
// });

// fetch('http://localhost:3000/weather?address=!').then((response) => {
//     response.json().then((data) => {
//         if(data.error){
//             console.log(data.error);
//         }else{
//             console.log(data.location);
//             console.log(data.forecast);
//         }
//     });
// });

const weatherForm =  document.querySelector('form');
const search = document.querySelector('input');
const errorMessage = document.querySelector('#errorMessage');
const dataMessage = document.querySelector('#dataMessage');


weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const location = search.value;
    errorMessage.textContent = 'Loading...';
    dataMessage.textContent = '';
    // console.log(location);
    fetch('http://localhost:3000/weather?address='+location).then((response) => {
    response.json().then((data) => {
        if(data.error){
            // console.log(data.error);
            errorMessage.textContent = data.error;
        }else{
            // console.log(data.location);
            // console.log(data.forecast);
            errorMessage.textContent = 'Location: '+data.location;
            dataMessage.textContent = 'Forecast: '+data.forecast;
        }
    });
});
});