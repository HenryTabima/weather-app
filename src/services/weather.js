'use strict'

const BASE_URL = 'http://api.openweathermap.org/data/2.5/weather'
// The best practice is to get the APP_ID form a non tracked file ()
const APP_ID = '1e1a64ed3720bb82545e1d5db123772b'

export async function getTemperatureByCityName(cityName) {
  const response = await fetch(`${BASE_URL}?APPID=${APP_ID}&q=${cityName}`, { mode: 'cors' })
  const data = await response.json()
  const temp = data.main.temp
  return {
    c: (temp - 273.15).toFixed(2),
    f: ((temp - 273.15) * (9 / 5) + 32).toFixed(2)
  }
}
