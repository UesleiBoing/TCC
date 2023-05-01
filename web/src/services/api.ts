import axios from 'axios';
import * as dotenv from 'dotenv';

const api = axios.create({
  baseURL: 'http://localhost:3333',
});

export default api;
