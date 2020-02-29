import queryString from 'querystring'
import { API } from '../configure /apiConfigs';

export async function getRandomMines(params) {
  return API.get(`/getMines?${queryString.stringify(params)}`);
}

export default {
    getRandomMines
}
