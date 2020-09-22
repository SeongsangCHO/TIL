const endpoint = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';


const cities = [];

//blob는 API를 fetch로 요청한 응답을 반환받음
//파싱하는 과정이 필요
//데이터를 json으로 파싱한 결과가 data
fetch(endpoint)
    .then(blob => blob.json())
    .then(data => cities.push(...data));

// 배열에서 city만 추출하기

function findMatchs(wordToMatch, cities){
  return cities.filter(place => {
    //검색한 city, state가 일치하도록 만들어줌
    //첫번째 인자는 들어온 문자열이 포함되는 값만 반환
    const regex = new RegExp(wordToMatch, 'gi');//g = 전체, i = 대,소문자 
    //정규표현식에 맞는 값만 return
    return place.city.match(regex) || place.state.match(regex);
  });
}

//숫자에 comma추가
function numberWithCommas(x){
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

function displayMatchs(){
  const matchArray = findMatchs(this.value, cities);
  const html = matchArray.map(place => {
    const regex = new RegExp(this.value, 'gi');
    const cityName = place.city.replace(regex, `<span class="hl">${this.value}</span>`);
    const stateName = place.city.replace(regex, `<span class="hl">${this.value}</span>`);
    return `
      <li>
        <span class="name">${cityName}, ${stateName}</span>
        <span class="population">${numberWithCommas(place.population)}</span>
      </li>
    `;
  }).join('');
  suggestions.innerHTML = html;
}

const searchInput = document.querySelector('.search');
const suggestions = document.querySelector('.suggestions');

searchInput.addEventListener('change', displayMatchs);
searchInput.addEventListener('keyup', displayMatchs);

