'use strict'
import { getTemperatureByCityName } from './services/weather'

const DOMElements = {}

function init() {
  DOMElements.$input = document.getElementById('city-search-input')
  DOMElements.$button = document.getElementById('city-search-button')
  DOMElements.$loader = document.getElementById('loader')
  DOMElements.$result = document.getElementById('result')
  DOMElements.$radios = document.getElementsByName('units')

  DOMElements.$radios.forEach(radio =>
    radio.addEventListener('change', handleRadioChange)
  )
  DOMElements.$button.addEventListener('click', fetchTemperature)
  DOMElements.$input.addEventListener('keypress', (e) => {
    const key = e.which || e.keyCode
    const ENTER_KEY_CODE = 13
    if (key === ENTER_KEY_CODE) fetchTemperature()
  })
}

function handleRadioChange() {
  const { $radios } = DOMElements
  $radios.forEach(unitRadio => {
    const el = document.getElementById(unitRadio.value)
    if (!el) return
    el.className = unitRadio.checked ? '' : 'is-hidden'
  })
}

function fetchTemperature() {
  const { $input } = DOMElements
  if ($input.value === '') return displayError('Please fill the input with a city name')
  startLoading()
  getTemperatureByCityName($input.value)
    .then((temp) => {
      displayResult(temp)
    })
    .catch(err => displayError(err))
    .finally(stopLoading)
}

function displayError(msg) {
  const { $result } = DOMElements
  $result.innerHTML = `<h2 class="has-text-danger">${msg}</h2>`
}

function displayResult(temp) {
  const { $result, $radios } = DOMElements
  $result.innerHTML = `
    <div id="celcious" class="${$radios[0].checked ? '' : 'is-hidden'}"> Celcius: ${temp.c}° </div>
    <div id="fahrenheit" class="${$radios[1].checked ? '' : 'is-hidden'}"> Fahrenheit: ${temp.f}°</div>
  `
}

function startLoading() {
  const { $button, $loader, $result } = DOMElements
  $button.classList.add('is-loading')
  $loader.classList.remove('is-hidden')
  $result.classList.add('is-hidden')
}

function stopLoading() {
  const { $button, $loader, $result } = DOMElements
  $button.classList.remove('is-loading')
  $loader.classList.add('is-hidden')
  $result.classList.remove('is-hidden')
}

export default { init }
