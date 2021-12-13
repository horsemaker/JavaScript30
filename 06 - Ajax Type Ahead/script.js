const endpoint =
  'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json'

const cities = []
fetch(endpoint)
  .then((blob) => blob.json())
  .then((data) => cities.push(...data))

const searchInput = document.querySelector('.search')
const suggestions = document.querySelector('.suggestions')

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

function findMatches(wordToMatch, cities) {
  const regex = new RegExp(wordToMatch, 'gi')
  return cities.filter(
    (place) => place.city.match(regex) || place.state.match(regex)
  )
}

function displayMatches() {
  if (this.value === '') {
    suggestions.innerHTML = `<li>Filter for a city</li>
    <li>or a state</li>`
    return
  }

  const matchArray = findMatches(this.value, cities)

  if (matchArray.length === 0) {
    suggestions.innerHTML = `<li>No such city or state found</li>`
    return
  }

  const regex = new RegExp(this.value, 'gi')
  const html = matchArray
    .map((place) => {
      const cityName = place.city.replace(
        regex,
        `<span class="hl">${this.value}</span>`
      )
      const stateName = place.state.replace(
        regex,
        `<span class="hl">${this.value}</span>`
      )
      return `
      <li>
        <span class="name">${cityName}, ${stateName}</span>
        <span class="population">${numberWithCommas(place.population)}</span>
      </li>
    `
    })
    .join('')
  suggestions.innerHTML = html
}

searchInput.addEventListener('input', displayMatches)
