export function fetchCountries(name) {

    if(name === '') {
      console.log('Country name is empty!')
    } else {
    return fetch(`https://restcountries.com/v3.1/name/${name}?fields=name,capital,flags,population,languages`)
    
    .then((response) => response.json())
    
    .catch((error) => {
      console.error('Error:', error);
      Notify.failure(error)
    });    
  }}
