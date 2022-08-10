import './css/styles.css';
import { fetchCountries } from './js/fetchCountries';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const DEBOUNCE_DELAY = 300;

const input = document.getElementById('search-box');
const list = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

input.addEventListener('input', debounce( () => {
    list.innerHTML = null;
    countryInfo.innerHTML = null;

      if(input.value === "") {
        console.log('Country name is empty!')
      } else {
      let Promise = fetchCountries(input.value.trim())
      Promise.then((data) => {
        console.log(data.status)
        console.log(data.length)
      
      if(data.status === 404) {
        Notify.failure('Oops, there is no country with that name')
      } else if(data.length >= 10) {
        Notify.info('Too many matches found. Please enter a more specific name.')
      } else if(1 < data.length && data.length < 10) {
        let listInnerHTML = data.map((elt) => {
          return `<li>
          <p><img src="${elt.flags.svg}" alt="Country flag" width="60px" height="40px">
          ${elt.name.common}</p>
          </li>`})
        .join("");
        console.log(listInnerHTML);
        list.innerHTML = listInnerHTML;
      } else {
        let elt = data[0]
        console.log(data)
        let countryInfoInnerHTML = `<div>
          <p><img src="${elt.flags.svg}" alt="Country flag" width="60px" height="40px"></p>
          <h1>${elt.name.common}</h1>
          <p>Capital: ${elt.capital}</p>
          <p>Population: ${elt.population}</p>
          <p>Languages: ${Object.values(elt.languages)}</p>
          </div>`
        console.log(countryInfoInnerHTML);
        countryInfo.innerHTML = countryInfoInnerHTML;
      }})}
    }, 300))

const body = document.querySelector('body');
body.style.backgroundImage = 'radial-gradient(grey 5%, transparent 0)';
body.style.backgroundSize = '30px 30px';

