import './main.scss'

import { getTemperatureByCityName } from './services/weather'

getTemperatureByCityName('Cali')
  .then(res => console.log(res))